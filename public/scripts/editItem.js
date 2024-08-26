document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.querySelector('select[name="category_id"]');
  const subcategorySelect = document.querySelector(
    'select[name="subcategory_id"]'
  );
  const currentItem = categorySelect.dataset.item;

  const nameInput = document.querySelector('input[name="name"]');
  const priceInput = document.querySelector('input[name="price"]');
  const quantityInput = document.querySelector('input[name="quantity"]');
  const descriptionTextarea = document.querySelector(
    'textarea[name="description"]'
  );
  const brandInput = document.querySelector('input[name="brand"]');
  const regionInput = document.querySelector('input[name="region"]');

  categorySelect.addEventListener("change", async function () {
    const category = this.value;

    const currentValues = {
      name: nameInput.value,
      price: priceInput.value,
      quantity: quantityInput.value,
      description: descriptionTextarea.value,
      brand: brandInput.value,
      region: regionInput.value,
    };

    const queryParams = new URLSearchParams({
      category,
      ...currentValues,
    });

    window.location.href = `/items/${currentItem}/edit?${queryParams.toString()}`;
  });

  const queryParams = new URLSearchParams(window.location.search);
  if (queryParams.has("name")) {
    nameInput.value = queryParams.get("name");
  }
  if (queryParams.has("price")) {
    priceInput.value = queryParams.get("price");
  }
  if (queryParams.has("quantity")) {
    quantityInput.value = queryParams.get("quantity");
  }
  if (queryParams.has("description")) {
    descriptionTextarea.value = queryParams.get("description");
  }
  if (queryParams.has("brand")) {
    brandInput.value = queryParams.get("brand");
  }
  if (queryParams.has("region")) {
    regionInput.value = queryParams.get("region");
  }
});
