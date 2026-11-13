const express = require('express');
const router = express.Router();
const Sample = require('../models/sample'); // We'll create this model file separately

// Create a new Sample
router.post('/', async (req, res) => {
  try {
    const sample = await Sample.create(req.body);
    res.status(201).json(sample);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Samples (only those with patientName defined)
router.get('/', async (req, res) => {
  try {
    const samples = await Sample.find({ patientName: { $exists: true } });
    res.json(samples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a Sample by ID
router.get('/:id', async (req, res) => {
  try {
    const sample = await Sample.findById(req.params.id);
    if (!sample) return res.status(404).json({ error: 'Sample not found' });
    res.json(sample);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a Sample
router.put('/:id', async (req, res) => {
  try {
    const updated = await Sample.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Sample not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Sample
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Sample.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Sample not found' });
    res.json({ message: 'Sample deleted', id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
