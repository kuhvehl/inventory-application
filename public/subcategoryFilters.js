document.addEventListener("DOMContentLoaded", () => {
  const filters = document.querySelectorAll(".filter-container select");

  filters.forEach((filter) => {
    filter.addEventListener("change", () => {
      const category = document.getElementById("category-filter").value;

      const queryParams = new URLSearchParams({
        category,
      });

      window.location.href = `/subcategories?${queryParams.toString()}`;
    });
  });
});
