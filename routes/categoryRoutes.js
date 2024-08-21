const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Route to view all categories
router.get("/", categoryController.viewCategory);

// Route to create a new category
router.post("/", categoryController.createCategory);

// Route to update a category
router.put("/:id", categoryController.updateCategory);

// Route to delete a category
router.delete("/:id", categoryController.deleteCategory);

// Route to view items in a specific category
router.get("/:id", categoryController.viewCategoryItems);

module.exports = router;
