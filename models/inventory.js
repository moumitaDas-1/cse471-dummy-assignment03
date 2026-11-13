const mongoose = require('mongoose');

const Inventory = mongoose.model('Inventory', new mongoose.Schema({
  itemName: String,
  batchNo: String,
  quantity: Number,
  expiryDate: String
}));

module.exports = Inventory;
