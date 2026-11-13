require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Load all models so they are registered with Mongoose
require('./models/report');
require('./models/sample');
require('./models/bill');
require('./models/inventory');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection – use the exact connection string from .env
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://rexveekhan_db_user:PrimeLab123@cluster0.79yn9zn.mongodb.net/PrimeLab';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Seed‑data route (run once) – inserts dummy docs for all models if they exist
app.post('/api/seed-data', async (req, res) => {
  try {
    if (mongoose.models.Report) await mongoose.models.Report.create({
      patientName: "John Doe",
      testType: "Blood Sugar",
      healthHistory: [{ date: "2026-08-01", resultValue: 105 }, { date: "2026-10-15", resultValue: 98 }],
      qrVerified: true
    });
    if (mongoose.models.Sample) await mongoose.models.Sample.create({
      patientName: "Jane Smith",
      testType: "Dengue Test",
      trackingStatus: "Testing",
      testInputs: { feverDays: 3, rash: true }
    });
    if (mongoose.models.Bill) await mongoose.models.Bill.create({
      patientName: "Alice Brown",
      subtotal: 2000,
      discountApplied: 200,
      finalTotal: 1800,
      paymentStatus: "Paid via SSLCompton"
    });
    if (mongoose.models.Inventory) await mongoose.models.Inventory.create({
      itemName: "Test Kit",
      batchNo: "B12345",
      quantity: 100,
      expiryDate: "2027-12-31"
    });
    res.json({ message: "Dummy data inserted into the PrimeLab database!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Use Sample routes (you can add similar routers for other models later)
const sampleRouter = require('./routes/sample');
app.use('/api/samples', sampleRouter);

// Register additional routers for Report and Bill
const reportRouter = require('./routes/report');
app.use('/api/reports', reportRouter);

const billRouter = require('./routes/bill');
app.use('/api/bills', billRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
