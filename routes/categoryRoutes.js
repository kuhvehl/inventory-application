const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getAllCategories);

router.get("/add", categoryController.addCategoryForm);

router.post("/add", categoryController.addCategory);

router.get("/:id/edit", categoryController.editCategoryForm);

router.post("/:id/edit", categoryController.updateCategory);

// Route to view category details
router.get("/:id", categoryController.viewCategoryDetails);

// Route to delete a category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
