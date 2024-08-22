const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/:id", itemController.viewItemDetails);

module.exports = router;
