const pool = require("./pool");

// Index

// async function getItems() {
//   const result = await pool.query("SELECT * FROM items");
//   return result.rows.map((item) => ({
//     ...item,
//     price: parseFloat(item.price),
//   }));
// }

async function getItems(filters = {}) {
  let query = "SELECT * FROM items";
  const params = [];
  let paramIndex = 1;

  // Apply filters to the query if they exist
  if (filters.category && filters.category !== "all") {
    query += ` WHERE subcategory_id IN (SELECT id FROM subcategories WHERE category_id = $${paramIndex})`;
    params.push(filters.category);
    paramIndex++;
  }

  if (filters.subcategory && filters.subcategory !== "all") {
    query +=
      (params.length ? " AND" : " WHERE") + ` subcategory_id = $${paramIndex}`;
    params.push(filters.subcategory);
    paramIndex++;
  }

  if (filters.brand && filters.brand !== "all") {
    query += (params.length ? " AND" : " WHERE") + ` brand = $${paramIndex}`;
    params.push(filters.brand);
    paramIndex++;
  }

  if (filters.region && filters.region !== "all") {
    query += (params.length ? " AND" : " WHERE") + ` region = $${paramIndex}`;
    params.push(filters.region);
    paramIndex++;
  }

  const result = await pool.query(query, params);
  return result.rows.map((item) => ({
    ...item,
    price: parseFloat(item.price),
  }));
}

async function getCategories() {
  const result = await pool.query("SELECT * FROM categories");
  return result.rows;
}

async function getSubcategories() {
  const result = await pool.query("SELECT * FROM subcategories");
  return result.rows;
}

async function getBrands() {
  const result = await pool.query("SELECT DISTINCT brand FROM items");
  return result.rows.map((row) => row.brand);
}

async function getRegions() {
  const result = await pool.query("SELECT DISTINCT region FROM items");
  return result.rows.map((row) => row.region);
}

// Subcategories

// Categories

async function getCategoryById(id) {
  const result = await pool.query("SELECT * FROM categories WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

async function createCategory(name) {
  const result = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name]
  );
  return result.rows[0];
}

async function updateCategory(id, name) {
  const result = await pool.query(
    "UPDATE categories SET name = $1 WHERE id = $2 RETURNING *",
    [name, id]
  );
  return result.rows[0];
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

async function getSubcategoryById(id) {
  const result = await pool.query("SELECT * FROM subcategories WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
}

async function createSubcategory(name, category_id) {
  const result = await pool.query(
    "INSERT INTO subcategories (name, category_id) VALUES ($1, $2) RETURNING *",
    [name, category_id]
  );
  return result.rows[0];
}

async function updateSubcategory(id, name, category_id) {
  const result = await pool.query(
    "UPDATE subcategories SET name = $1, category_id = $2 WHERE id = $3 RETURNING *",
    [name, category_id, id]
  );
  return result.rows[0];
}

async function deleteSubcategory(id) {
  await pool.query("DELETE FROM subcategories WHERE id = $1", [id]);
}

// Items

async function getItemById(id) {
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  return result.rows[0];
}

async function createItem(name, price, description, subcategory_id) {
  const result = await pool.query(
    "INSERT INTO items (name, price, description, subcategory_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, price, description, subcategory_id]
  );
  return result.rows[0];
}

async function updateItem(id, name, price, description, subcategory_id) {
  const result = await pool.query(
    "UPDATE items SET name = $1, price = $2, description = $3, subcategory_id = $4 WHERE id = $5 RETURNING *",
    [name, price, description, subcategory_id, id]
  );
  return result.rows[0];
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

module.exports = {
  getItems,
  getCategories,
  getSubcategories,
  getBrands,
  getRegions,
};
