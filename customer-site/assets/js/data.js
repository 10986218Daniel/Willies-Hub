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
    description:
      "Relaxed fit premium cotton t-shirt designed for daily comfort and a clean street look.",
    images: [
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true
  },
  {
    id: "p-002",
    name: "Tailored Linen Shirt",
    price: 59.5,
    category: "Men",
    description:
      "Breathable linen blend shirt with modern tailoring, ideal for warm-weather layering.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true
  },
  {
    id: "p-003",
    name: "Minimal Ribbed Dress",
    price: 72.0,
    category: "Women",
    description:
      "Soft stretch rib dress with a flattering silhouette for effortless day-to-night wear.",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true
  },
  {
    id: "p-004",
    name: "Cropped Utility Jacket",
    price: 89.99,
    category: "Women",
    description:
      "Structured cropped jacket with subtle utility details and a premium matte finish.",
    images: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: false
  },
  {
    id: "p-005",
    name: "Airwalk Runner",
    price: 120.0,
    category: "Shoes",
    description:
      "Cushioned lifestyle sneakers with lightweight sole and breathable knit upper.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1000&q=80"
    ],
    inStock: true
  },
  {
    id: "p-006",
    name: "Heritage Leather Belt",
    price: 34.75,
    category: "Accessories",
    description:
      "Full-grain leather belt with brushed metal buckle and timeless minimal design.",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611923134239-b9be5816ea0f?auto=format&fit=crop&w=1000&q=80"
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
