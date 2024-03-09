
const { Class}= require('../models/class');

const getAllClassStats = async () => {
  try {
    return await Class.find();
  } catch (error) {
    throw new Error(`Error fetching class stats: ${error.message}`);
  }
};

const getClassStatsByYear = async (year) => {
  try {
    return await Class.find({ year: parseInt(year, 10) });
  } catch (error) {
    throw new Error(`Error fetching class stats by year: ${error.message}`);
  }
};

module.exports = {
  getAllClassStats,
  getClassStatsByYear,
};
