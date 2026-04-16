const STORAGE_KEYS = {
  products: "clothify_products_v1",
  cart: "clothify_cart_v1",
  favorites: "clothify_favorites_v1",
  ownerSession: "clothify_owner_session_v1",
  whatsappNumber: "clothify_whatsapp_number_v1"
};

const DEFAULT_PRODUCTS = [
  {
    id: "p-001",
    name: "Essential Oversized Tee",
    price: 39.99,
    category: "Men",
    description: "Relaxed fit premium cotton t-shirt designed for daily comfort and a clean street look.",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true
  },
  {
    id: "p-003",
    name: "Minimal Ribbed Dress",
    price: 72.0,
    category: "Women",
    description: "Soft stretch rib dress with a flattering silhouette for effortless day-to-night wear.",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true
  },
  {
    id: "p-005",
    name: "Airwalk Runner",
    price: 120.0,
    category: "Shoes",
    description: "Cushioned lifestyle sneakers with lightweight sole and breathable knit upper.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true
  }
];

function initProductStorage() {
  const existing = localStorage.getItem(STORAGE_KEYS.products);
  if (!existing) {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
  }
}

function readProducts() {
  initProductStorage();
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.products) || "[]");
}

function writeProducts(products) {
  localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
}