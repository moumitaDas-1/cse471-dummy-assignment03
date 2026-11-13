const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');

// Create a new Bill
router.post('/', async (req, res) => {
  try {
    const bill = await Bill.create(req.body);
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Bills
router.get('/', async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a Bill by ID
router.get('/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a Bill
router.put('/:id', async (req, res) => {
  try {
    const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Bill not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Bill
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Bill.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Bill not found' });
    res.json({ message: 'Bill deleted', id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
