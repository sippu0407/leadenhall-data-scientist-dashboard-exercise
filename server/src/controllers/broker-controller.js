const { getTopBrokersByCategory } = require('../services/broker-service');

const getTopBrokers = async (req, res) => {
  const { year } = req.params;

  try {
    const topBrokers = await getTopBrokersByCategory(year);

    res.status(200).json(topBrokers);
  } catch (error) {
    console.error('Error getting top brokers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getTopBrokers,
};
