const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

// Route to get all subcategories
// router.get("/", subcategoryController.listSubcategories);

router.get("/", subcategoryController.renderSubcategories);

router.get("/add", subcategoryController.showAddSubcategoryForm);

router.post("/add", subcategoryController.createSubcategory);

// Route to delete a subcategory
router.delete("/:id", subcategoryController.deleteSubcategory);

router.get("/:id", subcategoryController.viewSubcategoryDetails);

// Handle form submission to update an existing subcategory
router.post("/update/:id", subcategoryController.updateSubcategory);

// Route to update a subcategory
router.put("/:id", subcategoryController.updateSubcategory);

// Route to view items in a specific subcategory
router.get("/items/:id", subcategoryController.viewSubcategoryItems);

module.exports = router;
