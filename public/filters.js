document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter-container select");

  filters.forEach((filter) => {
    filter.addEventListener("change", () => {
      const category = document.getElementById("category-filter").value;
      const subcategory = document.getElementById("subcategory-filter").value;
      const brand = document.getElementById("brand-filter").value;
      const region = document.getElementById("region-filter").value;

      const queryParams = new URLSearchParams({
        category,
        subcategory,
        brand,
        region,
      });

      window.location.href = `/?${queryParams.toString()}`;
    });
  });
});
