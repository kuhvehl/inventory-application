const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const queries = require("../db/queries"); // Import queries.js

router.get("/createItem", itemController.createItemForm);
router.post("/createItem", itemController.createItem);
router.get("/:id", itemController.viewItemDetails);
router.get("/:id/edit", itemController.editItemForm);
router.post("/:id/edit", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;
