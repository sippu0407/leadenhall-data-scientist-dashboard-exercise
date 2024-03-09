
const {Broker} = require('../models/broker');

const getAllBrokers = async () => {
  try {
    return await Broker.find();
  } catch (error) {
    throw new Error(`Error fetching brokers: ${error.message}`);
  }
};

const getBrokersByYear = async (year) => {
  try {
    return await Broker.find({ year: parseInt(year, 10) });
  } catch (error) {
    throw new Error(`Error fetching brokers by year: ${error.message}`);
  }
};

module.exports = {
  getAllBrokers,
  getBrokersByYear,
};
