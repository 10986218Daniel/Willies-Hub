initProductStorage();

const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const logoutBtn = document.getElementById("logout-btn");

const productForm = document.getElementById("product-form");
const imageFileInput = document.getElementById("image-file");
const formTitle = document.getElementById("form-title");
const productsBody = document.getElementById("products-body");

let editingId = null;
let uploadImageData = [];

// Simple get started function - no authentication
function getStarted() {
  showDashboard(true);
  renderProducts();
}

function showDashboard(visible) {
  loginView.classList.toggle("hidden", visible);
  dashboardView.classList.toggle("hidden", !visible);
}

function currentProducts() {
  return readProducts();
}

async function renderProducts() {
  const products = await currentProducts();
  productsBody.innerHTML = products.map(productRow).join("");
}

function resetForm() {
  editingId = null;
  uploadImageData = [];
  productForm.reset();
  formTitle.textContent = "Add Product";
}

function fillForm(product) {
  productForm.name.value = product.name;
  productForm.price.value = product.price;
  productForm.category.value = product.category;
  productForm.description.value = product.description;
  productForm.imageUrls.value = product.images.join(", ");
  productForm.inStock.checked = product.inStock;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

imageFileInput?.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files || []);
  uploadImageData = await Promise.all(files.map((file) => readFileAsDataUrl(file)));
});

// loginForm?.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   const password = loginForm.password.value.trim();
//   alert("Entered password: '" + password + "'");
//   if (!loginOwner(password)) {
//     loginFeedback.textContent = "Invalid password.";
//     return;
//   }
//   showDashboard(true);
//   await renderProducts();
// });

logoutBtn?.addEventListener("click", () => {
  logoutOwner();
  showDashboard(false);
});

productForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const manualImages = productForm.imageUrls.value
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean);

  const images = [...manualImages, ...uploadImageData];
  const payload = {
    id: editingId || `p-${Date.now()}`,
    name: productForm.name.value.trim(),
    price: Number(productForm.price.value),
    category: productForm.category.value,
    description: productForm.description.value.trim(),
    images: images.length ? images : ["https://via.placeholder.com/600x750?text=Product+Image"],
    inStock: productForm.inStock.checked
  };

  try {
    if (editingId) {
      await updateProductInSupabase(editingId, payload);
    } else {
      await addProductToSupabase(payload);
    }

    resetForm();
    await renderProducts();
    alert("Product saved successfully!");
  } catch (error) {
    alert("Error: " + error.message);
  }
});

document.addEventListener("click", async (event) => {
  const stockBtn = event.target.closest("[data-stock]");
  if (stockBtn) {
    const id = stockBtn.dataset.stock;
    const products = await currentProducts();
    const product = products.find((p) => p.id === id);
    if (product) {
      try {
        await updateProductInSupabase(id, { inStock: !product.inStock });
        await renderProducts();
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
    return;
  }

  const deleteBtn = event.target.closest("[data-delete]");
  if (deleteBtn) {
    const id = deleteBtn.dataset.delete;
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      await deleteProductFromSupabase(id);
      await renderProducts();
    } catch (error) {
      alert("Error: " + error.message);
    }
    return;
  }

  const editBtn = event.target.closest("[data-edit]");
  if (editBtn) {
    const id = editBtn.dataset.edit;
    const products = await currentProducts();
    const product = products.find((item) => item.id === id);
    if (!product) return;
    editingId = id;
    formTitle.textContent = "Edit Product";
    fillForm(product);
  }
});

document.getElementById("cancel-edit")?.addEventListener("click", resetForm);

// Sync products from Supabase periodically
setInterval(async () => {
  // Silent sync - no need to refresh UI constantly
}, 10000);

// Initialize - show dashboard directly
(async () => {
  showDashboard(true);
  await renderProducts();
})();
