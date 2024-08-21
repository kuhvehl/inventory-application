const db = require("../db/queries");

async function createCategory(req, res) {
  const { name } = req.body;
  try {
    await db.createCategory(name);
    res.redirect("/categories");
  } catch (error) {
    res.status(500).send("Error creating category");
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db.updateCategory(id, name);
    res.redirect("/categories");
  } catch (error) {
    res.status(500).send("Error updating category");
  }
}

async function viewCategory(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.render("categories/viewCategory", { categories });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function viewCategoryItems(req, res) {
  const { id } = req.params;
  try {
    const subcategories = await db.getSubcategoriesByCategoryId(id);
    const items = await db.getItemsBySubcategoryIds(
      subcategories.map((sub) => sub.id)
    );
    res.render("items/viewItem", {
      items,
      subcategoryName: "Subcategory Name",
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function getAllCategories(req, res) {
  try {
    const categories = await db.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function createCategory(req, res) {
  const { name } = req.body;
  try {
    await db.createCategory(name);
    res.status(201).send("Category Created");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function updateCategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db.updateCategory(id, name);
    res.send("Category Updated");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function deleteCategory(req, res) {
  const { id } = req.params;
  try {
    await db.deleteCategory(id);
    res.send("Category Deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  viewCategory,
  viewCategoryItems,
  createCategory,
  updateCategory,
};
