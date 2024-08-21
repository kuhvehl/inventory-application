#!/usr/bin/env node
const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (user_name, message) 
VALUES
  ('Frodo', 'Hello, Middle-earth!');
`;

async function main() {
  console.log("seeding...");
  const connectionString =
    process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL;

  const client = new Client({ connectionString });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
