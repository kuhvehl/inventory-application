const express = require("express");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const itemRoutes = require("./routes/itemRoutes");

const path = require("path");
require("dotenv").config();

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/categories", categoryRoutes);
app.use("/subcategories", subcategoryRoutes);
app.use("/items", itemRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
