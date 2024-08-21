const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");
const db = require("../db/queries");

// Show form to create a new subcategory
router.get("/create", async (req, res) => {
  const categories = await db.getCategories();
  res.render("subcategories/createSubcategory", { categories });
});

// Handle form submission to create a new subcategory
router.post("/create", subcategoryController.createSubcategory);

// Show form to update an existing subcategory
router.get("/update/:id", async (req, res) => {
  const subcategory = await db.getSubcategoryById(req.params.id);
  const categories = await db.getCategories();
  res.render("subcategories/updateSubcategory", { subcategory, categories });
});

// Handle form submission to update an existing subcategory
router.post("/update/:id", subcategoryController.updateSubcategory);

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
