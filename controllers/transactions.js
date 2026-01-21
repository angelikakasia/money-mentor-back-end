const express = require('express');
const verifyToken = require("../middleware/verify-token.js");
const Transaction = require("../models/transaction.js");
const router = express.Router();


// GET /transactions - list only current user's transactions
router.get("/", verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .sort({ date: -1, createdAt: -1 });

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

module.exports = router;