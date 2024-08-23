document.addEventListener("DOMContentLoaded", () => {
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

  function populateSubcategories(categoryId) {
    // Clear current subcategory options
    subcategorySelect.innerHTML = "";

    // Populate subcategories based on selected category
    subcategories
      .filter((sub) => sub.category_id == categoryId)
      .forEach((sub) => {
        const option = document.createElement("option");
        option.value = sub.id;
        option.textContent = sub.name;
        subcategorySelect.appendChild(option);
      });

    // Set the selected subcategory if it exists
    const currentSubcategoryId = subcategorySelect.dataset.currentSubcategoryId;
    if (currentSubcategoryId) {
      subcategorySelect.value = currentSubcategoryId;
    }
  }

  // Handle category change event
  categorySelect.addEventListener("change", function () {
    populateSubcategories(this.value);
  });

  // Set the initial state of subcategories based on the selected category
  const selectedCategoryId = categorySelect.value;
  populateSubcategories(selectedCategoryId);
});
