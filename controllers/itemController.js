const db = require("../db/queries");

async function viewItemDetails(req, res) {
  try {
    const itemId = parseInt(req.params.id, 10);
    const item = await db.getItemById(itemId); // Fetch item details by ID
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
    const categories = await db.getCategories();
    const subcategories = await db.getSubcategories();

    res.render("items/editItem", { item, categories, subcategories });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateItem(req, res) {
  try {
    const itemId = parseInt(req.params.id, 10);
    const { name, price, description, brand, region, subcategory_id } =
      req.body;

    await db.updateItem(
      itemId,
      name,
      price,
      description,
      brand,
      region,
      subcategory_id
    );

    res.redirect(`/items/${itemId}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    await db.deleteItem(id);
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting item:", err);
    res.status(500).send("Server Error");
  }
}

// Display the form to create a new item
async function createItemForm(req, res) {
  try {
    console.log("Creating item form"); // Test log
    const categories = await db.getCategories(); // Fetch categories
    const subcategories = await db.getSubcategories(); // Fetch subcategories
    res.render("items/createItem", { categories, subcategories }); // Render the form with data
  } catch (err) {
    console.error("Error loading create item form:", err);
    res.status(500).send("Internal Server Error: " + err.message);
  }
}

// Handle the form submission for creating a new item
async function createItem(req, res) {
  try {
    const {
      name,
      price,
      quantity,
      description,
      brand,
      region,
      category_id,
      subcategory_id,
    } = req.body;

    // Parse the form fields, ensuring that numeric values are correctly parsed
    const parsedPrice = parseFloat(price); // Price should be parsed as a float
    const parsedQuantity = parseInt(quantity, 10);
    const parsedCategoryId = parseInt(category_id, 10);
    const parsedSubcategoryId = parseInt(subcategory_id, 10);

    // Validate that the price is not NaN
    if (
      isNaN(parsedPrice) ||
      isNaN(parsedQuantity) ||
      isNaN(parsedCategoryId) ||
      isNaN(parsedSubcategoryId)
    ) {
      throw new Error("Invalid input for numeric fields.");
    }

    // Insert the item into the database
    await db.createItem({
      name,
      price: parsedPrice,
      quantity: parsedQuantity,
      description,
      brand,
      region,
      category_id: parsedCategoryId,
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
