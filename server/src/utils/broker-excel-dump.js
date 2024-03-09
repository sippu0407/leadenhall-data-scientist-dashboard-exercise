const ExcelJS = require('exceljs');
const { Broker } = require('../models/broker');

const uploadBrokerExcel = async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);

    const worksheet = workbook.worksheets[0];
    const data = worksheet.getSheetValues();

    data.shift();

    const brokers = data.map((row, index) => {
      if (row.length < 6 || index==0) {
        console.warn(`Skipping incomplete row at index ${index + 1}`);
        return null; 
      }
    
      const year = row[1];
      const brokerName = row[2];
      const GWP = row[3];
      const plannedGWP = row[4];
      const marketType = row[5];
    
      console.log(typeof year, typeof brokerName, typeof GWP, typeof plannedGWP, typeof marketType);
  
      if (!year || isNaN(year)) {
        throw new Error(`Invalid numeric value for 'year' at row ${index + 1}`);
      }
    
      const validatedYear = parseInt(year);
      const validatedGWP = parseFloat(GWP);
      const validatedPlannedGWP = parseFloat(plannedGWP);
    
      if (isNaN(validatedGWP) || isNaN(validatedPlannedGWP)) {
        throw new Error(`Invalid numeric value at row ${index + 1}`);
      }
    
      return {
        year: validatedYear,
        brokerName: String(brokerName),
        GWP: validatedGWP,
        plannedGWP: validatedPlannedGWP,
        marketType: String(marketType),
      };
    }).filter(Boolean);

    if (data.length === 0) {
      console.warn('No data to process. Breaking the loop.');
      return;
    }
    
    console.log(brokers);
    
    

    await Broker.insertMany(brokers);

    res.status(200).json({ message: 'Broker data uploaded successfully' });
  } catch (error) {
    console.error('Error uploading broker data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  uploadBrokerExcel,
};
