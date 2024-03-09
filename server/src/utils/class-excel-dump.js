const ExcelJS = require('exceljs');
const { Class } = require('../models/class');

const uploadClassExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const worksheet = workbook.worksheets[0];
    const data = worksheet.getSheetValues();

    data.shift();

    const classes = data.map((row, index) => {
      if (row.length < 6 || index==0) {
        console.warn(`Skipping incomplete row at index ${index + 1}`);
        return null; 
      }
    
      const year = row[1];
      const ClassofBusiness = row[2];
      const ClassType = row[3];
      const BusinessPlan = row[4];
      const EarnedPremium = row[5];
      const GWP  = row[6];

  
      if (!year || isNaN(year)) {
        throw new Error(`Invalid numeric value for 'year' at row ${index + 1}`);
      }
    
      const validatedYear = parseInt(year);
      const validatedGWP = parseInt(GWP);
      const validateBusinessPlan = parseInt(BusinessPlan);
      const validateEarnedPremium = parseInt(EarnedPremium);
    
      if (isNaN(validatedGWP) || isNaN(validateEarnedPremium) || isNaN(validateBusinessPlan)) {
        throw new Error(`Invalid numeric value at row ${index + 1}`);
      }
    
      return {
        year: validatedYear,
        classOfBusiness: String(ClassofBusiness),
        classType: String(ClassType),
        GWP: validatedGWP,
        businessPlan: validateBusinessPlan,
        earnedPremium: validateEarnedPremium,
      };
    }).filter(Boolean);

    if (data.length === 0) {
      console.warn('No data to process. Breaking the loop.');
      return;
    }
    
    console.log(classes);
    
    

    await Class.insertMany(classes);

    res.status(200).json({ message: 'Broker data uploaded successfully' });
  } catch (error) {
    console.error('Error uploading broker data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  uploadClassExcel,
};
