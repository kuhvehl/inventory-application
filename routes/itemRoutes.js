const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const db = require("../db/queries");

// Show form to create a new item
router.get("/create", async (req, res) => {
  const subcategories = await db.getSubcategories();
  res.render("items/createItem", { subcategories });
});

// Handle form submission to create a new item
router.post("/create", itemController.createItem);

// Show form to update an existing item
router.get("/update/:id", async (req, res) => {
  const item = await db.getItemById(req.params.id);
  const subcategories = await db.getSubcategories();
  res.render("items/updateItem", { item, subcategories });
});

// Handle form submission to update an existing item
router.post("/update/:id", itemController.updateItem);

// Route to view a specific item
router.get("/:id", itemController.viewItem);

// Route to get all items
router.get("/", itemController.getAllItems);

// Route to create a new item
router.post("/", itemController.createItem);

// Route to update an item
router.put("/:id", itemController.updateItem);

// Route to delete an item
router.delete("/:id", itemController.deleteItem);

module.exports = router;
