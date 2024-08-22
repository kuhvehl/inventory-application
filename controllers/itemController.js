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

module.exports = {
  viewItemDetails,
  editItemForm,
  updateItem,
  deleteItem,
};
