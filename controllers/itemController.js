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
    const item = await db.getItemById(itemId); // Replace with your actual function to get item details
    const categories = await db.getCategories(); // Replace with your actual function to get categories
    const subcategories = await db.getSubcategories(); // Replace with your actual function to get subcategories

    res.render("items/editItem", { item, categories, subcategories });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function updateItem(req, res) {
  try {
    const itemId = parseInt(req.params.id, 10);
    const { name, price, description, brand, region } = req.body;
    await db.updateItem(itemId, name, price, description, brand, region);
    res.redirect(`/items/${itemId}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  viewItemDetails,
  editItemForm,
  updateItem,
};
