const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);

// Route to display a specific category and its items
router.get("/:id/items", categoryController.viewCategoryItems);

// Route to render the add category form
router.get("/add", categoryController.addCategoryForm);

// Route to handle the form submission
router.post("/add", categoryController.addCategory);

// Route to render the edit category form
router.get("/:id/edit", categoryController.editCategoryForm);

// Route to handle the form submission for updating the category
router.post("/:id/edit", categoryController.updateCategory);

// Route to delete a category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
