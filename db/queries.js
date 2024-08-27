const pool = require("./pool");

// Index
async function getItems(filters = {}) {
  let query = "SELECT * FROM items";
  const params = [];
  let paramIndex = 1;

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
    query +=
      (params.length ? " AND" : " WHERE") +
      ` UPPER(brand) = UPPER($${paramIndex})`;
    params.push(filters.brand);
    paramIndex++;
  }

  if (filters.region && filters.region !== "all") {
    query +=
      (params.length ? " AND" : " WHERE") +
      ` UPPER(region) = UPPER($${paramIndex})`;
    params.push(filters.region);
    paramIndex++;
  }

  query += ` ORDER BY name ASC`;

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

const getSubcategories = async (filter = {}) => {
  const { category_id } = filter;

  const query = `
    SELECT subcategories.id, subcategories.name, categories.name AS category_name
    FROM subcategories
    INNER JOIN categories ON subcategories.category_id = categories.id
    ${category_id ? `WHERE categories.id = $1` : ""}
  `;

  const values = category_id ? [category_id] : [];

  const result = await pool.query(query, values);
  return result.rows;
};

async function getBrands() {
  const result = await pool.query(
    "SELECT DISTINCT UPPER(brand) as brand FROM items WHERE brand IS NOT NULL ORDER BY brand"
  );
  return result.rows.map((row) => row.brand);
}

async function getRegions() {
  const result = await pool.query(
    "SELECT DISTINCT UPPER(region) as region FROM items WHERE region IS NOT NULL ORDER BY region"
  );
  return result.rows.map((row) => row.region);
}

// Items
async function getItemById(id) {
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [id]);
  if (result.rows.length) {
    return {
      ...result.rows[0],
      price: parseFloat(result.rows[0].price),
    };
  }
  return null;
}

async function updateItem(
  id,
  name,
  price,
  description,
  brand,
  region,
  subcategory_id,
  quantity
) {
  await pool.query(
    "UPDATE items SET name = $1, price = $2, description = $3, brand = $4, region = $5, subcategory_id = $6, quantity = $7 WHERE id = $8",
    [name, price, description, brand, region, subcategory_id, quantity, id]
  );
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id = $1", [id]);
}

async function createItem({
  name,
  price,
  quantity,
  description,
  brand,
  region,
  subcategory_id,
}) {
  console.log("Creating item with values:", {
    name,
    price,
    description,
    subcategory_id,
    quantity,
    brand,
    region,
  });

  const result = await pool.query(
    `INSERT INTO items (name, price, description, subcategory_id, quantity, brand, region) 
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [name, price, description, subcategory_id, quantity, brand, region]
  );

  return result.rows[0];
}

// Subcategories
async function getSubcategoriesByCategory(category_id) {
  const result = await pool.query(
    "SELECT * FROM subcategories WHERE category_id = $1",
    [category_id]
  );
  return result.rows;
}

async function getItemsBySubcategoryId(subcategoryId) {
  const query = `
    SELECT * FROM items
    WHERE subcategory_id = $1
    ORDER BY name ASC
  `;
  const params = [subcategoryId];

  try {
    const result = await pool.query(query, params);
    return result;
  } catch (error) {
    console.error("Error fetching items by subcategory ID:", error);
    throw error;
  }
}

async function getCategoryForSubcategory(subcategoryId) {
  const result = await pool.query(
    `SELECT c.*
     FROM categories c
     INNER JOIN subcategories s ON c.id = s.category_id
     WHERE s.id = $1`,
    [subcategoryId]
  );
  return result.rows[0]; // Assuming there's only one category per subcategory
}

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
  const query = "DELETE FROM subcategories WHERE id = $1";
  await pool.query(query, [id]);
}

module.exports = {
  getItems,
  getCategories,
  getSubcategories,
  getBrands,
  getRegions,
  getItemById,
  updateItem,
  deleteItem,
  createItem,
  getSubcategoriesByCategory,
  getCategoryForSubcategory,
  getCategoryById,
  createSubcategory,
  getSubcategoryById,
  getItemsBySubcategoryId,
  deleteSubcategory,
};
