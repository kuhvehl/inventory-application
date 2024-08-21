const db = require("../db/queries");

async function getMessages(req, res) {
  try {
    const messages = await db.getAllMessages();
    res.render("index", { messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function addMessage(req, res) {
  const { user_name, message } = req.body;
  try {
    await db.insertMessage(user_name, message);
    res.redirect("/");
  } catch (error) {
    console.error("Error inserting message:", error);
    res.status(500).send("Internal Server Error");
  }
}

function renderForm(req, res) {
  res.render("form");
}

async function getMessageDetails(req, res) {
  const { id } = req.params;
  try {
    const message = await db.getMessageById(id);
    if (message) {
      res.render("message", { message });
    } else {
      res.status(404).send("Message not found");
    }
  } catch (error) {
    console.error("Error fetching message details:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getMessages,
  addMessage,
  renderForm,
  getMessageDetails,
};
