const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Query to get all messages
const getMessages = async () => {
  const res = await pool.query("SELECT * FROM messages ORDER BY added DESC");
  return res.rows;
};

const addMessage = async (username, text) => {
  await pool.query(
    "INSERT INTO messages (username, text) VALUES ($1, $2)",
    [username, text]
  );
};

module.exports = { getMessages, addMessage };