const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

router.get("/", subcategoryController.renderSubcategories);

router.get("/add", subcategoryController.showAddSubcategoryForm);

router.post("/add", subcategoryController.createSubcategory);

router.get("/:id", subcategoryController.viewSubcategoryDetails);

router.delete("/:id", subcategoryController.deleteSubcategory);

router.get("/:id/edit", subcategoryController.renderEditForm);

router.post("/:id/edit", subcategoryController.updateSubcategory);

router.get("/items/:id", subcategoryController.viewSubcategoryItems);

module.exports = router;
