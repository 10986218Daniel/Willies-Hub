initProductStorage();
updateCartCount();

const productGrid = document.getElementById("product-grid");
const featuredGrid = document.getElementById("featured-grid");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("category-filter");

let products = readProducts();
let favorites = readFavorites();

function renderHomepageProducts() {
  const search = (searchInput?.value || "").trim().toLowerCase();
  const category = filterSelect?.value || "All";

  const filtered = products.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(search);
    const categoryMatch = category === "All" ? true : item.category === category;
    return nameMatch && categoryMatch;
  });

  if (productGrid) {
    productGrid.innerHTML = filtered.length
      ? filtered.map((product) => productCard(product, favorites)).join("")
      : `<p class="empty-state">No products match your search.</p>`;
  }

  if (featuredGrid) {
    featuredGrid.innerHTML = products
      .slice(0, 4)
      .map((product) => productCard(product, favorites))
      .join("");
  }
}

function bindProductActions() {
  document.addEventListener("click", (event) => {
    const addBtn = event.target.closest("[data-add-id]");
    if (addBtn) {
      const result = addToCart(addBtn.dataset.addId);
      toast(result.message, result.ok ? "success" : "error");
      updateCartCount();
      return;
    }

    const favoriteBtn = event.target.closest("[data-favorite-id]");
    if (favoriteBtn) {
      const productId = favoriteBtn.dataset.favoriteId;
      const active = toggleFavorite(productId);
      favorites = readFavorites();
      favoriteBtn.classList.toggle("active", active);
      toast(active ? "Added to favorites." : "Removed from favorites.", "success");
      return;
    }
  });
}

searchInput?.addEventListener("input", renderHomepageProducts);
filterSelect?.addEventListener("change", renderHomepageProducts);

bindProductActions();
renderHomepageProducts();
