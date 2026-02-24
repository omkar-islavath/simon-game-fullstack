const pool = require("../config/db");

exports.saveScore = async (userId, score) => {
  await pool.query("INSERT INTO scores (user_id, score) VALUES ($1, $2)", [
    userId,
    score,
  ]);
};

exports.getLeaderboard = async () => {
  const result = await pool.query(`
    SELECT u.email, MAX(s.score) AS score
    FROM scores s
    JOIN users u ON u.id = s.user_id
    GROUP BY u.email
    ORDER BY score DESC
    LIMIT 10
  `);

  return result.rows;
};
