const express = require("express");
const router = express.Router();
const Token = require("../models/Token");
const tokenController = require('../controllers/tokenController');

router.post("/", async (req, res) => {
  const token = new Token(req.body);
  await token.save();
  res.send(token);
});

router.get("/", async (req, res) => {
  const tokens = await Token.find().populate("patientId doctorId");
  res.send(tokens);
});

router.put("/:id", async (req, res) => {
  const updated = await Token.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

module.exports = router;
