// routes/departmentRoutes.js
const express = require('express');
const router = express.Router();
const Department = require('../models/Department'); // Adjust path as needed
const departmentController = require('../controllers/departmentController');

router.post("/", async (req, res) => {
  const dept = new Department(req.body);
  await dept.save();
  res.send(dept);
});

router.get("/", async (req, res) => {
  const departments = await Department.find().populate("head");
  res.send(departments);
});

module.exports = router;
