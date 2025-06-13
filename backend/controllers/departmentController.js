// controllers/departmentController.js
const Department = require('../models/Department');

exports.createDepartment = async (req, res) => {
  try {
    const newDept = await Department.create(req.body);
    res.status(201).json(newDept);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllDepartments = async (req, res) => {
  try {
    const depts = await Department.find().sort({ name: 1 });
    res.status(200).json(depts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    if (!dept) return res.status(404).json({ error: 'Department not found' });
    res.status(200).json(dept);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Department not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Department not found' });
    res.status(200).json({ message: 'Department deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
