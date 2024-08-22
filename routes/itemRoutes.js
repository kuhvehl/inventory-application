const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

router.get("/:id", itemController.viewItemDetails);
router.get("/:id/edit", itemController.editItemForm);
router.post("/:id/edit", itemController.updateItem);

module.exports = router;
