function readCart() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.cart) || "[]");
}

function writeCart(cartItems) {
  localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cartItems));
}

function addToCart(productId, quantity = 1) {
  const products = readProducts();
  const product = products.find((item) => item.id === productId);
  if (!product || !product.inStock) return { ok: false, message: "Item unavailable." };

  const cart = readCart();
  const existing = cart.find((item) => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  writeCart(cart);
  return { ok: true, message: `${product.name} added to cart.` };
}

function removeFromCart(productId) {
  const cart = readCart().filter((item) => item.productId !== productId);
  writeCart(cart);
}

function updateCartQuantity(productId, quantity) {
  const cart = readCart();
  const target = cart.find((item) => item.productId === productId);
  if (!target) return;
  target.quantity = Math.max(1, quantity);
  writeCart(cart);
}

function cartDetails() {
  const products = readProducts();
  const details = readCart()
    .map((cartItem) => {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) return null;
      return {
        ...product,
        quantity: cartItem.quantity,
        lineTotal: product.price * cartItem.quantity
      };
    })
    .filter(Boolean);

  const total = details.reduce((sum, item) => sum + item.lineTotal, 0);
  return { items: details, total };
}

function readFavorites() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites) || "[]");
}

function toggleFavorite(productId) {
  const favorites = readFavorites();
  const exists = favorites.includes(productId);
  const next = exists ? favorites.filter((id) => id !== productId) : [...favorites, productId];
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(next));
  return !exists;
}
