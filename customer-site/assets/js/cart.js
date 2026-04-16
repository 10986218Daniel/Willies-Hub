initProductStorage();
updateCartCount();

const cartList = document.getElementById("cart-list");
const cartTotal = document.getElementById("cart-total");
const whatsappBtn = document.getElementById("whatsapp-order");
const DEFAULT_WHATSAPP_NUMBER = "2348000000000";

function getWhatsappNumber() {
  const saved = localStorage.getItem(STORAGE_KEYS.whatsappNumber);
  return saved && saved.trim() ? saved.trim() : DEFAULT_WHATSAPP_NUMBER;
}

function renderCart() {
  if (!cartList || !cartTotal) return;
  const { items, total } = cartDetails();
  cartList.innerHTML = items.length
    ? items.map((item) => cartLineItem(item)).join("")
    : "<p class='empty-state'>Your cart is empty.</p>";
  cartTotal.textContent = money(total);
  updateCartCount();
}

function whatsappMessage() {
  const { items, total } = cartDetails();
  if (!items.length) return "Hello, I want to place an order but my cart is currently empty.";

  const lines = items.map((item, index) => `${index + 1}. ${item.name} x${item.quantity} - ${money(item.lineTotal)}`);
  return `Hello Clothify, I would like to order:\n${lines.join("\n")}\n\nTotal: ${money(total)}`;
}

document.addEventListener("click", (event) => {
  const minus = event.target.closest("[data-minus]");
  if (minus) {
    const id = minus.dataset.minus;
    const current = readCart().find((item) => item.productId === id);
    if (!current) return;
    if (current.quantity <= 1) {
      removeFromCart(id);
    } else {
      updateCartQuantity(id, current.quantity - 1);
    }
    renderCart();
    return;
  }

  const plus = event.target.closest("[data-plus]");
  if (plus) {
    const id = plus.dataset.plus;
    const current = readCart().find((item) => item.productId === id);
    if (!current) return;
    updateCartQuantity(id, current.quantity + 1);
    renderCart();
    return;
  }

  const remove = event.target.closest("[data-remove]");
  if (remove) {
    removeFromCart(remove.dataset.remove);
    toast("Item removed from cart.", "success");
    renderCart();
  }
});

whatsappBtn?.addEventListener("click", () => {
  const text = encodeURIComponent(whatsappMessage());
  const url = `https://wa.me/${getWhatsappNumber()}?text=${text}`;
  window.open(url, "_blank");
});

renderCart();
