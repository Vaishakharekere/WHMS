// controllers/medicalRecordController.js
const MedicalRecord = require('../models/MedicalRecord');

exports.createMedicalRecord = async (req, res) => {
  try {
    const newRecord = await MedicalRecord.create(req.body);
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find()
      .populate('patient', 'name')
      .populate('doctor', 'name specialization')
      .sort({ visit_date: -1 });
    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id)
      .populate('patient', 'name')
      .populate('doctor', 'name specialization');
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.status(200).json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMedicalRecord = async (req, res) => {
  try {
    const updated = await MedicalRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Record not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteMedicalRecord = async (req, res) => {
  try {
    const deleted = await MedicalRecord.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Record not found' });
    res.status(200).json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
