const mongoose = require('mongoose');

const classStatsSchema = new mongoose.Schema({
    year: Number,
    classOfBusiness: String,
    classType: String,
    businessPlan: Number,
    earnedPremium: Number,
    GWP: Number,
  });
  
  const Class= mongoose.model('Class', classStatsSchema);
  
  module.exports = {
    Class,
  };