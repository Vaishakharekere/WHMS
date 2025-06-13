const mongoose = require("mongoose");
const DoctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  availability: [String]
});
module.exports = mongoose.model("Doctor", DoctorSchema);