const db = require("../db/queries");

async function createItem(req, res) {
  const { name, price, description, subcategory_id } = req.body;
  try {
    await db.createItem(name, price, description, subcategory_id);
    res.redirect(`/subcategories/${subcategory_id}`);
  } catch (error) {
    res.status(500).send("Error creating item");
  }
}

async function updateItem(req, res) {
  const { id } = req.params;
  const { name, price, description, subcategory_id } = req.body;
  try {
    await db.updateItem(id, name, price, description, subcategory_id);
    res.redirect(`/subcategories/${subcategory_id}`);
  } catch (error) {
    res.status(500).send("Error updating item");
  }
}

async function viewItem(req, res) {
  const { id } = req.params;
  try {
    const item = await db.getItemById(id);
    res.render("items/viewItem", { item });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function getAllItems(req, res) {
  try {
    const items = await db.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function createItem(req, res) {
  const { name, price, description, subcategory_id } = req.body;
  try {
    await db.createItem(name, price, description, subcategory_id);
    res.status(201).send("Item Created");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function updateItem(req, res) {
  const { id } = req.params;
  const { name, price, description, subcategory_id } = req.body;
  try {
    await db.updateItem(id, name, price, description, subcategory_id);
    res.send("Item Updated");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

async function deleteItem(req, res) {
  const { id } = req.params;
  try {
    await db.deleteItem(id);
    res.send("Item Deleted");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deleteItem,
  viewItem,
  createItem,
  updateItem,
};
