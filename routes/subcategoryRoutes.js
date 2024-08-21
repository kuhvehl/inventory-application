const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

// Route to get all subcategories
router.get("/", subcategoryController.getAllSubcategories);

// Route to create a new subcategory
router.post("/", subcategoryController.createSubcategory);

// Route to update a subcategory
router.put("/:id", subcategoryController.updateSubcategory);

// Route to delete a subcategory
router.delete("/:id", subcategoryController.deleteSubcategory);

// Route to view all subcategories under a specific category
router.get("/:id", subcategoryController.viewSubcategories);

// Route to view items in a specific subcategory
router.get("/items/:id", subcategoryController.viewSubcategoryItems);

module.exports = router;
