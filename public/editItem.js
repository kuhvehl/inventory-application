document.addEventListener("DOMContentLoaded", function () {
  const categories = JSON.parse(
    document.getElementById("categories-data").textContent
  );
  const subcategories = JSON.parse(
    document.getElementById("subcategories-data").textContent
  );

  document
    .querySelector('select[name="category_id"]')
    .addEventListener("change", function () {
      const selectedCategoryId = this.value;
      const subcategorySelect = document.querySelector(
        'select[name="subcategory_id"]'
      );

      // Clear current subcategory options
      subcategorySelect.innerHTML = "";

      // Populate subcategories based on selected category
      subcategories
        .filter((sub) => sub.category_id == selectedCategoryId)
        .forEach((sub) => {
          const option = document.createElement("option");
          option.value = sub.id;
          option.textContent = sub.name;
          subcategorySelect.appendChild(option);
        });
    });
});
