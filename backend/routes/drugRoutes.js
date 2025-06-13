const express = require("express");
const router = express.Router();
const Drug = require("../models/Drug");

router.post("/", async (req, res) => {
  const drug = new Drug(req.body);
  await drug.save();
  res.send(drug);
});

router.get("/", async (req, res) => {
  const drugs = await Drug.find();
  res.send(drugs);
});

router.put("/:id", async (req, res) => {
  const updated = await Drug.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

module.exports = router;
