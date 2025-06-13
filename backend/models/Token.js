const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  issueTime: { type: Date, default: Date.now },
  tokenNumber: { type: Number, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  priority: { type: String, enum: ["normal", "emergency"], default: "normal" },

  status: { type: String, enum: ["waiting", "consulting", "completed"], default: "waiting" }
});

module.exports = mongoose.model("Token", TokenSchema);
