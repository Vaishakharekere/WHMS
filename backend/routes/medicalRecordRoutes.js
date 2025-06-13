// routes/medicalRecordRoutes.js
const express = require('express');
const router = express.Router();
const recordController = require('../controllers/medicalRecordController');
const MedicalRecord = require("../models/MedicalRecord");

router.post("/", async (req, res) => {
  const record = new MedicalRecord(req.body);
  await record.save();
  res.send(record);
});

router.get("/:patientId", async (req, res) => {
  const records = await MedicalRecord.find({ patientId: req.params.patientId });
  res.send(records);
});

module.exports = router;
