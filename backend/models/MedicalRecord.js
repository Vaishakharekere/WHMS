const mongoose = require("mongoose");
const MedicalRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  diagnosis: String,
  treatment: String,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("MedicalRecord", MedicalRecordSchema);