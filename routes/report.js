const express = require('express');
const router = express.Router();
const Report = require('../models/report');

// Create a new Report
router.post('/', async (req, res) => {
  try {
    const report = await Report.create(req.body);
    res.status(201).json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all Reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a Report by ID
router.get('/:id', async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ error: 'Report not found' });
    res.json(report);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a Report
router.put('/:id', async (req, res) => {
  try {
    const updated = await Report.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Report not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a Report
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Report.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Report not found' });
    res.json({ message: 'Report deleted', id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
