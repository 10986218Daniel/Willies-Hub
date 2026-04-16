initProductStorage();

const loginView = document.getElementById("login-view");
const dashboardView = document.getElementById("dashboard-view");
const loginForm = document.getElementById("login-form");
const loginFeedback = document.getElementById("login-feedback");
const logoutBtn = document.getElementById("logout-btn");
const whatsappNumberInput = document.getElementById("whatsapp-number");
const saveWhatsappBtn = document.getElementById("save-whatsapp");
const whatsappFeedback = document.getElementById("whatsapp-feedback");

const productForm = document.getElementById("product-form");
const imageFileInput = document.getElementById("image-file");
const formTitle = document.getElementById("form-title");
const productsBody = document.getElementById("products-body");

let editingId = null;
let uploadImageData = [];

function loadWhatsappSetting() {
  const saved = localStorage.getItem(STORAGE_KEYS.whatsappNumber) || "";
  if (whatsappNumberInput) whatsappNumberInput.value = saved;
}

function saveWhatsappSetting() {
  const cleaned = (whatsappNumberInput?.value || "").replace(/[^\d]/g, "");
  if (!cleaned) {
    whatsappFeedback.textContent = "Please enter a valid WhatsApp number.";
    return;
  }
  localStorage.setItem(STORAGE_KEYS.whatsappNumber, cleaned);
  whatsappFeedback.textContent = "WhatsApp number saved.";
}

function showDashboard(visible) {
  loginView.classList.toggle("hidden", visible);
  dashboardView.classList.toggle("hidden", !visible);
}

function currentProducts() {
  return readProducts();
}

function renderProducts() {
  const products = currentProducts();
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

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const password = loginForm.password.value.trim();
  if (!loginOwner(password)) {
    loginFeedback.textContent = "Invalid password. Try 'owner123'.";
    return;
  }
  loginFeedback.textContent = "";
  showDashboard(true);
  renderProducts();
});

logoutBtn?.addEventListener("click", () => {
  logoutOwner();
  showDashboard(false);
});

saveWhatsappBtn?.addEventListener("click", saveWhatsappSetting);

productForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const products = currentProducts();

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

  if (editingId) {
    const updated = products.map((item) => (item.id === editingId ? payload : item));
    writeProducts(updated);
  } else {
    writeProducts([payload, ...products]);
  }

  resetForm();
  renderProducts();
});

document.addEventListener("click", (event) => {
  const stockBtn = event.target.closest("[data-stock]");
  if (stockBtn) {
    const id = stockBtn.dataset.stock;
    const updated = currentProducts().map((item) =>
      item.id === id ? { ...item, inStock: !item.inStock } : item
    );
    writeProducts(updated);
    renderProducts();
    return;
  }

  const deleteBtn = event.target.closest("[data-delete]");
  if (deleteBtn) {
    const id = deleteBtn.dataset.delete;
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    writeProducts(currentProducts().filter((item) => item.id !== id));
    renderProducts();
    return;
  }

  const editBtn = event.target.closest("[data-edit]");
  if (editBtn) {
    const id = editBtn.dataset.edit;
    const product = currentProducts().find((item) => item.id === id);
    if (!product) return;
    editingId = id;
    formTitle.textContent = "Edit Product";
    fillForm(product);
  }
});

document.getElementById("cancel-edit")?.addEventListener("click", resetForm);

showDashboard(isOwnerLoggedIn());
loadWhatsappSetting();
if (isOwnerLoggedIn()) renderProducts();
