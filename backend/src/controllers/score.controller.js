const scoreModel = require("../models/score.model");

exports.addScore = async (req, res) => {
  try {
    const { userId, score } = req.body;

    if (!userId || score == null)
      return res.status(400).json({ message: "Invalid data" });

    await scoreModel.saveScore(userId, score);
    res.json({ message: "Score saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaderboard = async (req, res) => {
  try {
    const data = await scoreModel.getLeaderboard();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
