const db = require("../db/queries");

// Display all subcategories
async function renderSubcategories(req, res) {
  try {
    const categories = await db.getCategories();
    let subcategories = await db.getSubcategories();

    const selectedCategory = req.query.category || "";
    const selectedSubcategory = req.query.subcategory || "";

    if (selectedCategory) {
      subcategories = await db.getSubcategoriesByCategory(selectedCategory);
    }

    res.render("subcategories/manageSubcategories", {
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
    res.redirect(`/subcategories`);
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

async function viewSubcategoryDetails(req, res) {
  const subcategoryId = req.params.id;

  try {
    // Fetch the subcategory details
    const subcategory = await db.getSubcategoryById(subcategoryId);

    // Fetch all items in the subcategory
    const itemsResult = await db.getItemsBySubcategoryId(subcategoryId);
    const items = itemsResult.rows;

    res.render("subcategories/viewSubcategory", { subcategory, items });
  } catch (error) {
    console.error("Error fetching subcategory details:", error);
    res.status(500).send("Error loading subcategory details");
  }
}

async function showAddSubcategoryForm(req, res) {
  try {
    const categories = await db.getCategories(); // Assuming you have a method to fetch categories
    res.render("subcategories/addSubcategory", { categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("Error loading add subcategory form");
  }
}

async function deleteSubcategory(req, res) {
  const { id } = req.params;
  console.log("fart");

  try {
    // Check if subcategory has any items associated
    const items = await db.getItemsBySubcategoryId(id);
    console.log(items);
    if (items.length > 0) {
      return res
        .status(400)
        .send(
          "Cannot delete subcategory with items. Please delete items first."
        );
    }

    // Proceed to delete the subcategory
    await db.deleteSubcategory(id);
    res.redirect("/subcategories"); // Redirect back to the subcategories list
  } catch (error) {
    console.error("Error deleting subcategory:", error);
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
  updateSubcategory,
  deleteSubcategory,
  viewSubcategoryDetails,
  viewSubcategoryItems,
  showAddSubcategoryForm,
  createSubcategory,
};
