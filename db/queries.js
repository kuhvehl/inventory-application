const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY timestamp DESC"
  );
  return rows;
}

async function insertMessage(user_name, message) {
  await pool.query(
    "INSERT INTO messages (user_name, message) VALUES ($1, $2)",
    [user_name, message]
  );
}

async function getMessageById(id) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0]; // Return the first row from the result set
}

module.exports = {
  getAllMessages,
  insertMessage,
  getMessageById,
};
