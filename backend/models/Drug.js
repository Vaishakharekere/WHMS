const mongoose = require("mongoose");

const DrugSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  expiryDate: Date,
  manufacturer: String
});

module.exports = mongoose.model("Drug", DrugSchema);
