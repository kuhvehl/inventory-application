const db = require("../db/queries");

async function getAllCategories(req, res) {
  const categories = await db.getCategories();
  res.render("categories/manageCategories", { categories });
}

async function addCategoryForm(req, res) {
  res.render("categories/addCategory"); // Ensure you have an EJS file named addCategory.ejs
}

async function addCategory(req, res) {
  const { name } = req.body;
  await db.createCategory(name);
  res.redirect("/categories");
}

async function editCategoryForm(req, res) {
  const categoryId = req.params.id;
  const category = await db.getCategoryById(categoryId);
  res.render("categories/editCategory", { category });
}

async function updateCategory(req, res) {
  const categoryId = req.params.id;
  const { name } = req.body;
  await db.updateCategory(categoryId, name);
  res.redirect("/categories");
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
  editCategoryForm,
  updateCategory,
  deleteCategory,
  viewCategoryItems,
  addCategoryForm,
  addCategory,
};
