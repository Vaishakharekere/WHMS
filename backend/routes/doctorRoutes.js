// routes/doctorRoutes.js
const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const Doctor = require('../models/Doctor'); // Assuming you have a Doctor model defined
const mongoose = require('mongoose');

router.post("/", async (req, res) => {
  const doc = new Doctor(req.body);
  await doc.save();
  res.send(doc);
});

router.get("/", async (req, res) => {
  const docs = await Doctor.find().populate("departmentId");
  res.send(docs);
});


module.exports = router;
