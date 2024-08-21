#! /usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

// SQL schema setup
const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS subcategories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  subcategory_id INTEGER REFERENCES subcategories(id),
  brand VARCHAR(255),
  region VARCHAR(255)
);
`;

// Sample data insertion
const INSERT_DATA = `
-- Insert sample categories
INSERT INTO categories (name) VALUES
  ('Red Wine'),
  ('White Wine'),
  ('Sparkling Wine');

-- Insert sample subcategories
INSERT INTO subcategories (name, category_id) VALUES
  ('Pinot Noir', (SELECT id FROM categories WHERE name = 'Red Wine')),
  ('Cabernet Sauvignon', (SELECT id FROM categories WHERE name = 'Red Wine')),
  ('Chardonnay', (SELECT id FROM categories WHERE name = 'White Wine')),
  ('Sauvignon Blanc', (SELECT id FROM categories WHERE name = 'White Wine')),
  ('Champagne', (SELECT id FROM categories WHERE name = 'Sparkling Wine'));

-- Insert sample items
INSERT INTO items (name, price, description, subcategory_id, brand, region) VALUES
  ('2018 Pinot Noir', 29.99, 'A smooth and elegant Pinot Noir with notes of cherry and raspberry.', (SELECT id FROM subcategories WHERE name = 'Pinot Noir'), 'Vineyard A', 'Napa Valley'),
  ('2017 Cabernet Sauvignon', 35.50, 'A bold Cabernet Sauvignon with flavors of blackcurrant and oak.', (SELECT id FROM subcategories WHERE name = 'Cabernet Sauvignon'), 'Vineyard B', 'Sonoma County'),
  ('2019 Chardonnay', 24.99, 'A crisp Chardonnay with hints of apple and vanilla.', (SELECT id FROM subcategories WHERE name = 'Chardonnay'), 'Vineyard C', 'Central Coast'),
  ('2020 Sauvignon Blanc', 22.75, 'A refreshing Sauvignon Blanc with zesty citrus flavors.', (SELECT id FROM subcategories WHERE name = 'Sauvignon Blanc'), 'Vineyard D', 'Mendocino County');
`;

async function main() {
  console.log("Creating tables and inserting sample data...");
  const connectionString = process.argv[2] || process.env.DATABASE_URL_LOCAL;

  const client = new Client({ connectionString });
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Tables created successfully.");
    await client.query(INSERT_DATA);
    console.log("Sample data inserted successfully.");
  } catch (error) {
    console.error("Error creating tables or inserting data:", error);
  } finally {
    await client.end();
  }
}

main();
