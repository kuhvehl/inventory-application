const { Pool } = require("pg");
require("dotenv").config();

const connectionString =
  process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL;

module.exports = new Pool({ connectionString });
