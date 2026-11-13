const mongoose = require('mongoose');

const Bill = mongoose.model('Bill', new mongoose.Schema({
  patientName: String,
  subtotal: Number,
  discountApplied: Number,
  finalTotal: Number,
  paymentStatus: String
}));

module.exports = Bill;
