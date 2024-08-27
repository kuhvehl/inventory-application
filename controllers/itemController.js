const db = require("../db/queries");

async function viewItemDetails(req, res) {
  try {
    const itemId = parseInt(req.params.id, 10);
    const item = await db.getItemById(itemId);
    if (item) {
      res.render("items/itemDetails", { item });
    } else {
      res.status(404).send("Item not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function editItemForm(req, res) {
  try {
    const itemId = req.params.id;
    const item = await db.getItemById(itemId);
    const itemCategory = await db.getCategoryForSubcategory(
      item.subcategory_id
    );

    const selectedCategory =
      (await db.getCategoryById(req.query.category)) || itemCategory;

    const categories = await db.getCategories();
    const subcategories = await db.getSubcategoriesByCategory(
      selectedCategory.id
    );

    const formValues = {
      name: req.query.name || item.name,
      price: req.query.price || item.price,
      quantity: req.query.quantity || item.quantity,
      description: req.query.description || item.description,
      brand: req.query.brand || item.brand,
      region: req.query.region || item.region,
    };

    res.render("items/editItem", {
      item,
      itemCategory,
      selectedCategory,
      categories,
      subcategories,
      formValues,
    });
  } catch (error) {
    console.error("Error fetching item or categories:", error);
    res.status(500).send("Error loading edit item form");
  }
}

async function updateItem(req, res) {
  try {
    const itemId = parseInt(req.params.id, 10);
    const {
      name,
      price,
      description,
      brand,
      region,
      subcategory_id,
      quantity,
    } = req.body;

    await db.updateItem(
      itemId,
      name,
      price,
      description,
      brand,
      region,
      subcategory_id,
      quantity
    );

    res.redirect(`/items/${itemId}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    const { redirectTo, subcategoryId } = req.query;

    await db.deleteItem(id);

    // Check if redirectTo is set to 'subcategory'
    if (redirectTo === "subcategory" && subcategoryId) {
      res.redirect(`/subcategories/${subcategoryId}`);
    } else {
      // Default redirect if no specific redirection is provided
      res.redirect("/");
    }
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).send("Server Error");
  }
}

async function createItemForm(req, res) {
  try {
    let selectedCategoryIndex = req.query.category ? req.query.category : 1;
    let selectedCategory = await db.getCategoryById(selectedCategoryIndex);
    let selectedSubcategory = req.query.subcategory
      ? req.params.subcategory
      : 1;

    let categories = await db.getCategories();
    const subcategories = await db.getSubcategoriesByCategory(
      selectedCategory.id
    );

    const formValues = {
      name: req.query.name || "",
      price: req.query.price || "",
      quantity: req.query.quantity || "",
      description: req.query.description || "",
      brand: req.query.brand || "",
      region: req.query.region || "",
    };

    res.render("items/createItem", {
      selectedCategory,
      selectedSubcategory,
      categories,
      subcategories,
      formValues,
    });
  } catch (error) {
    console.error("Error fetching item or categories:", error);
    res.status(500).send("Error loading edit item form");
  }
}

async function createItem(req, res) {
  try {
    const {
      name,
      price,
      quantity,
      description,
      brand,
      region,
      subcategory_id,
    } = req.body;

    const parsedPrice = parseFloat(price);
    const parsedQuantity = parseInt(quantity, 10);
    const parsedSubcategoryId = parseInt(subcategory_id, 10);

    if (
      isNaN(parsedPrice) ||
      isNaN(parsedQuantity) ||
      isNaN(parsedSubcategoryId)
    ) {
      throw new Error("Invalid input for numeric fields.");
    }

    await db.createItem({
      name,
      price: parsedPrice,
      quantity: parsedQuantity,
      description,
      brand,
      region,
      subcategory_id: parsedSubcategoryId,
    });

    res.redirect("/");
  } catch (err) {
    console.error("Error creating item:", err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  viewItemDetails,
  editItemForm,
  updateItem,
  deleteItem,
  createItemForm,
  createItem,
};
