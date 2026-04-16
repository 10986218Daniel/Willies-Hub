function money(value) {
  return `$${value.toFixed(2)}`;
}

function updateCartCount() {
  const countEl = document.querySelector("[data-cart-count]");
  if (!countEl) return;
  const count = readCart().reduce((sum, item) => sum + item.quantity, 0);
  countEl.textContent = count;
}

function toast(message, kind = "success") {
  const host = document.getElementById("toast-host");
  if (!host) return;

  const el = document.createElement("div");
  el.className = `toast toast--${kind}`;
  el.textContent = message;
  host.appendChild(el);

  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 250);
  }, 2200);
}

function productCard(product, favorites = []) {
  const isFav = favorites.includes(product.id);
  return `
    <article class="product-card">
      <a href="./product.html?id=${product.id}" class="product-card__img-wrap">
        <img src="${product.images[0]}" alt="${product.name}" loading="lazy" class="product-card__img" />
      </a>
      <div class="product-card__body">
        <div class="product-card__meta">
          <span class="chip">${product.category}</span>
          <button class="icon-btn favorite-btn ${isFav ? "active" : ""}" data-favorite-id="${product.id}" aria-label="Toggle favorite">
            ❤
          </button>
        </div>
        <h3 class="product-card__title">${product.name}</h3>
        <p class="product-card__price">${money(product.price)}</p>
        <p class="stock ${product.inStock ? "in" : "out"}">${product.inStock ? "In stock" : "Out of stock"}</p>
        <button class="btn btn--dark add-btn" data-add-id="${product.id}" ${product.inStock ? "" : "disabled"}>
          Add to cart
        </button>
      </div>
    </article>
  `;
}

function cartLineItem(item) {
  return `
    <div class="cart-item">
      <img src="${item.images[0]}" alt="${item.name}" loading="lazy" class="cart-item__img" />
      <div class="cart-item__info">
        <h4>${item.name}</h4>
        <p>${money(item.price)} x ${item.quantity}</p>
        <div class="cart-actions">
          <button class="icon-btn" data-minus="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="icon-btn" data-plus="${item.id}">+</button>
          <button class="text-btn" data-remove="${item.id}">Remove</button>
        </div>
      </div>
      <strong>${money(item.lineTotal)}</strong>
    </div>
  `;
}
