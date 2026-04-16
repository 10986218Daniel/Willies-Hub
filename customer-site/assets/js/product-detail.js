initProductStorage();
updateCartCount();

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = readProducts().find((item) => item.id === productId);

const container = document.getElementById("product-detail");

function renderProductDetail() {
  if (!container) return;
  if (!product) {
    container.innerHTML = "<p class='empty-state'>Product not found.</p>";
    return;
  }

  const favorites = readFavorites();
  const isFavorite = favorites.includes(product.id);

  container.innerHTML = `
    <section class="detail-gallery">
      <img id="main-image" src="${product.images[0]}" alt="${product.name}" loading="lazy" class="detail-main-image" />
      <div class="detail-thumbs">
        ${product.images
          .map(
            (image) =>
              `<button class="thumb-btn" data-thumb="${image}"><img src="${image}" alt="${product.name}" loading="lazy" /></button>`
          )
          .join("")}
      </div>
    </section>
    <section class="detail-content">
      <p class="chip">${product.category}</p>
      <h1>${product.name}</h1>
      <p class="detail-price">${money(product.price)}</p>
      <p class="stock ${product.inStock ? "in" : "out"}">${product.inStock ? "In stock" : "Out of stock"}</p>
      <p class="detail-description">${product.description}</p>
      <div class="detail-actions">
        <button class="btn btn--dark" id="detail-add-btn" ${product.inStock ? "" : "disabled"}>Add to cart</button>
        <button class="btn btn--ghost ${isFavorite ? "active-heart" : ""}" id="detail-fav-btn">❤ Favorite</button>
      </div>
    </section>
  `;
}

document.addEventListener("click", (event) => {
  const thumb = event.target.closest("[data-thumb]");
  if (thumb) {
    const mainImage = document.getElementById("main-image");
    if (mainImage) mainImage.src = thumb.dataset.thumb;
  }

  if (event.target.id === "detail-add-btn") {
    const result = addToCart(product.id);
    toast(result.message, result.ok ? "success" : "error");
    updateCartCount();
  }

  if (event.target.id === "detail-fav-btn") {
    const active = toggleFavorite(product.id);
    event.target.classList.toggle("active-heart", active);
    toast(active ? "Saved to favorites." : "Removed from favorites.", "success");
  }
});

renderProductDetail();
