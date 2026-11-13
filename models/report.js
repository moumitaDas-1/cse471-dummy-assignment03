const mongoose = require('mongoose');

const Report = mongoose.model('Report', new mongoose.Schema({
  patientName: String,
  testType: String,
  healthHistory: [{ date: String, resultValue: Number }],
  qrVerified: Boolean
}));

module.exports = Report;
