const mongoose = require("mongoose");
const AppointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  date: Date,
  time: String,
  status: String
});
module.exports = mongoose.model("Appointment", AppointmentSchema);