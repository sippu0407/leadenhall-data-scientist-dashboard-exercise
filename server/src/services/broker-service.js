const { getAllBrokers, getBrokersByYear } = require('../repositories/broker-repository');

const calculatePercentageDifference = (actualGWP, plannedGWP) => {
  return ((actualGWP - plannedGWP) / plannedGWP) * 100;
};

const getTopBrokersByCategory = async (year) => {
  
  const brokers = await getBrokersByYear(year);

  const categorizedBrokers = brokers.reduce((result, broker) => {
    const { brokerName, GWP, plannedGWP, marketType } = broker;

    const percentageDifference = calculatePercentageDifference(GWP, plannedGWP);

    if (!result[marketType]) {
      result[marketType] = [];
    }

    result[marketType].push({
      brokerName,
      GWP,
      plannedGWP,
      percentageDifference,
    });

    return result;
  }, {});

  const top10Brokers = {};
  for (const category in categorizedBrokers) {
    const categoryBrokers = categorizedBrokers[category];

    categoryBrokers.sort((a, b) => b.GWP - a.GWP); 
    top10Brokers[category] = categoryBrokers.slice(0, 10);
  }

  return top10Brokers;
};

module.exports = {
  getTopBrokersByCategory,
};

