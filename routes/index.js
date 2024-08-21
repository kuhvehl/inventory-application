const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

router.get("/", messageController.getMessages);
router.get("/form", messageController.renderForm);
router.post("/form", messageController.addMessage);
router.get("/message/:id", messageController.getMessageDetails);

module.exports = router;
