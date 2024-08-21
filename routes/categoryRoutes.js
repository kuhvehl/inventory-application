const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Route to get all categories
router.get("/", categoryController.getAllCategories);

// Route to create a new category
router.post("/", categoryController.createCategory);

// Route to update a category
router.put("/:id", categoryController.updateCategory);

// Route to delete a category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
