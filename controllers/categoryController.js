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

async function viewCategoryDetails(req, res) {
  const categoryId = req.params.id;
  const category = await db.getCategoryById(categoryId);
  const subcategories = await db.getSubcategoriesByCategory(categoryId);
  res.render("categories/viewCategoryDetails", { category, subcategories });
}

async function deleteCategory(req, res) {
  const categoryId = req.params.id;
  const subcategories = await db.getSubcategoriesByCategory(categoryId);

  if (subcategories.length === 0) {
    await db.deleteCategory(categoryId);
    res.redirect("/categories");
  } else {
    res.redirect(`/categories/${categoryId}`);
  }
}

module.exports = {
  getAllCategories,
  editCategoryForm,
  updateCategory,
  deleteCategory,
  viewCategoryDetails,
  addCategoryForm,
  addCategory,
};
