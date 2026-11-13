const mongoose = require('mongoose');

const Sample = mongoose.model('Sample', new mongoose.Schema({
  patientName: String,
  testType: String,
  trackingStatus: String,
  testInputs: Object
}));

module.exports = Sample;
