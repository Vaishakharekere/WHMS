const express = require("express");
const router = express.Router();
const OTSchedule = require("../models/OTSchedule");

// Create new OT schedule
router.post("/", async (req, res) => {
  try {
    const newSchedule = new OTSchedule(req.body);
    const savedSchedule = await newSchedule.save();
    res.status(201).json(savedSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all OT schedules
router.get("/", async (req, res) => {
  try {
    const schedules = await OTSchedule.find()
      .populate("patientId", "name")
      .populate("doctorId", "name specialization")
      .sort({ scheduledStart: 1 });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get OT schedule by ID
router.get("/:id", async (req, res) => {
  try {
    const schedule = await OTSchedule.findById(req.params.id)
      .populate("patientId", "name")
      .populate("doctorId", "name specialization");
    if (!schedule) return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update OT schedule by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedSchedule = await OTSchedule.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSchedule) return res.status(404).json({ message: "Schedule not found" });
    res.json(updatedSchedule);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete OT schedule by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSchedule = await OTSchedule.findByIdAndDelete(req.params.id);
    if (!deletedSchedule) return res.status(404).json({ message: "Schedule not found" });
    res.json({ message: "Schedule deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
