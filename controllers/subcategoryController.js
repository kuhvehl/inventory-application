const db = require("../db/queries");

// Display all subcategories
async function renderSubcategories(req, res) {
  try {
    const categories = await db.getCategories();
    const subcategories = await db.getSubcategories();

    const selectedCategory = req.query.category || "";
    const selectedSubcategory = req.query.subcategory || "";

    res.render("/subcategories/manageSubcategories", {
      categories,
      subcategories,
      selectedCategory,
      selectedSubcategory,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function createSubcategory(req, res) {
  const { name, category_id } = req.body;
  try {
    await db.createSubcategory(name, category_id);
    res.redirect(`/categories/${category_id}`);
  } catch (error) {
    res.status(500).send("Error creating subcategory");
  }
}

async function updateSubcategory(req, res) {
  const { id } = req.params;
  const { name, category_id } = req.body;
  try {
    await db.updateSubcategory(id, name, category_id);
    res.redirect(`/categories/${category_id}`);
  } catch (error) {
    res.status(500).send("Error updating subcategory");
  }
}

async function viewSubcategories(req, res) {
  const { id } = req.params; // Category ID
  try {
    const category = await db.getCategoryById(id);
    const subcategories = await db.getSubcategoriesByCategoryId(id);
    res.render("subcategories/viewSubcategory", {
      subcategories,
      categoryName: category.name,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function createSubcategory(req, res) {
  const { name, category_id } = req.body;
  try {
    await db.createSubcategory(name, category_id);
    res.status(201).send("Subcategory Created");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function updateSubcategory(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await db.updateSubcategory(id, name);
    res.send("Subcategory Updated");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function deleteSubcategory(req, res) {
  const { id } = req.params;
  try {
    await db.deleteSubcategory(id);
    res.send("Subcategory Deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function viewSubcategoryItems(req, res) {
  const { id } = req.params; // Subcategory ID
  try {
    const subcategory = await db.getSubcategoryById(id);
    const items = await db.getItemsBySubcategoryId(id);
    res.render("items/viewItem", { items, subcategoryName: subcategory.name });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  renderSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  viewSubcategories,
  viewSubcategoryItems,
  createSubcategory,
  updateSubcategory,
};
