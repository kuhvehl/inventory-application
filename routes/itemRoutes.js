const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// Route to get all items
router.get("/", itemController.getAllItems);

// Route to create a new item
router.post("/", itemController.createItem);

// Route to update an item
router.put("/:id", itemController.updateItem);

// Route to delete an item
router.delete("/:id", itemController.deleteItem);

module.exports = router;
