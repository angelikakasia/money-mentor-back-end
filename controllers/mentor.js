const express = require("express");
const verifyToken =require("../middleware/verify-token");
const Transaction = require("../models/transaction");
const { getLevelFromPoints } = require("../utils/levels");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
// the ai decision
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// GUYS please go to https://aistudio.google.com/app/api-keys to generate your api-key
//after that go to .env and add GEMINI_API_KEY=your_real_key

router.get("/", verifyToken, async (req, res) => {
    try{
        const user = req.user;
        const recentTransactions = await Transaction.find({ userId: user._id})
    .populate("categoryId")
    .sort({ createdAt:-1 })
    .limit(5);
        
const {level, name} = getLevelFromPoints(user.points);
// const model = genAI.getGenerativeModel({ model: "gemini-pro"});
//  console.log(model)
const prompt =`
You are a friendly financial motivator and mentor.

User level: ${name}
Points: ${user.points}

Recent activity:
${recentTransactions
  .map((t) => `- ${t.type} $${t.amount} (${t.categoryId?.name})`)
  .join("\n")}

Give ONE short motivational message.
Be encouraging.
Mention the category if relevant.
Give financial advice.
Keep it under 2 sentences.
`;

    // const result = await model.generateContent(prompt);

    res.json({
      level,
      levelName: name,
      points: user.points,
    //   mentorMessage: result.response.text(),
      recentTransactions,
    });
  } catch (err) {
    res.status(500).json({ err: "Failed to load mentor insight" });
  }
});

module.exports = router;