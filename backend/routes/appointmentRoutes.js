// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment'); // adjust path as needed
const appointmentController = require('../controllers/appointmentController');

router.post("/", async (req, res) => {
  const appt = new Appointment(req.body);
  await appt.save();
  res.send(appt);
});

router.get("/", async (req, res) => {
  const appts = await Appointment.find().populate("patientId doctorId departmentId");
  res.send(appts);
});

module.exports = router;
