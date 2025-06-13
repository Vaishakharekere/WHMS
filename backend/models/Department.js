const mongoose = require("mongoose");
const DepartmentSchema = new mongoose.Schema({
  name: String,
  floor: Number,
  head: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }
});
module.exports = mongoose.model("Department", DepartmentSchema);