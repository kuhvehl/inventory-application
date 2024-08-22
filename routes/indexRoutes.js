// routes/indexRoutes.js
const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

// Route for the root URL
router.get("/", indexController.renderHomePage);

module.exports = router;
