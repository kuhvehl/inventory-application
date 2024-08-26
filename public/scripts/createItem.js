document.addEventListener("DOMContentLoaded", filterSubs);

function filterSubs() {
  const categories = JSON.parse(
    document.getElementById("categories-data").textContent
  );
  const subcategories = JSON.parse(
    document.getElementById("subcategories-data").textContent
  );

  const categorySelect = document.querySelector('select[name="category_id"]');
  const subcategorySelect = document.querySelector(
    'select[name="subcategory_id"]'
  );

  // Populate subcategory options based on selected category
  categorySelect.addEventListener("change", function () {
    const selectedCategoryId = this.value;

    // Clear current subcategory options
    subcategorySelect.innerHTML =
      '<option value="">Select a subcategory</option>';

    // Populate subcategories based on selected category
    if (selectedCategoryId) {
      subcategories
        .filter((sub) => sub.category_id == selectedCategoryId)
        .forEach((sub) => {
          const option = document.createElement("option");
          option.value = sub.id;
          option.textContent = sub.name;
          subcategorySelect.appendChild(option);
        });
    }
  });
}
