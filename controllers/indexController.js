const db = require("../db/queries");

// async function renderHomePage(req, res) {
//   try {
//     const items = await db.getItems(); // Ensure you have this function in your db/queries.js
//     res.render("index", { items });
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }

async function renderHomePage(req, res) {
  try {
    const categories = await db.getCategories();
    const subcategories = await db.getSubcategories();
    const brands = await db.getBrands();
    const regions = await db.getRegions();

    const selectedCategory = req.query.category || "";
    const selectedSubcategory = req.query.subcategory || "";
    const selectedBrand = req.query.brand || "";
    const selectedRegion = req.query.region || "";

    const items = await db.getItems(req.query);

    res.render("index", {
      categories,
      subcategories,
      brands,
      regions,
      items,
      selectedCategory,
      selectedSubcategory,
      selectedBrand,
      selectedRegion,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  renderHomePage,
};
