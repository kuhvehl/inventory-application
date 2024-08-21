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

module.exports = router;
