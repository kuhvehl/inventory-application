const db = require("../db/queries");

async function getAllSubcategories(req, res) {
  try {
    const subcategories = await db.getAllSubcategories();
    res.json(subcategories);
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

module.exports = {
  getAllSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
};
