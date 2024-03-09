const mongoose = require('mongoose');

const brokerSchema = new mongoose.Schema({
  year: {type:Number},
  brokerName: {type:String},
  GWP: {type:Number},
  plannedGWP: {type:Number},
  marketType: {type:String},
});

const Broker = mongoose.model('Broker', brokerSchema);

module.exports = {
  Broker,
};
