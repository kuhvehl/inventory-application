const db = require("../db/queries");

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
};
