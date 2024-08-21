const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Show form to create a new category
router.get("/create", (req, res) => res.render("categories/createCategory"));

// Handle form submission to create a new category
router.post("/create", categoryController.createCategory);

// Show form to update an existing category
router.get("/update/:id", async (req, res) => {
  const category = await db.getCategoryById(req.params.id);
  res.render("categories/updateCategory", { category });
});

// Handle form submission to update an existing category
router.post("/update/:id", categoryController.updateCategory);

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
