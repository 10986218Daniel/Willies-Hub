# Clothify E-Commerce

A modern clothing shop with customer and owner sites, built with vanilla JavaScript and deployed on Vercel with Supabase backend.

## Features

- **Customer Site**: Browse products, add to cart, manage favorites, WhatsApp ordering
- **Owner Site**: Product management dashboard with password protection
- **Real-time Sync**: Products added by owner appear instantly on customer site
- **Responsive Design**: Modern UI that works on all devices

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML, CSS
- **Backend**: Supabase (Database as a Service)
- **Deployment**: Vercel
- **Styling**: Custom CSS with modern design

## Setup & Deployment

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run:

```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default products
INSERT INTO products (id, name, price, category, description, images, in_stock) VALUES
('p-001', 'Essential Oversized Tee', 39.99, 'Men', 'Relaxed fit premium cotton t-shirt designed for daily comfort and a clean street look.', '{"https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80"}', true),
('p-002', 'Tailored Linen Shirt', 59.50, 'Men', 'Breathable linen blend shirt with modern tailoring, ideal for warm-weather layering.', '{"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80"}', true),
('p-003', 'Minimal Ribbed Dress', 72.00, 'Women', 'Soft stretch rib dress with a flattering silhouette for effortless day-to-night wear.', '{"https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1464863979621-258859e62245?auto=format&fit=crop&w=1000&q=80"}', true),
('p-004', 'Heritage Wool Cardigan', 89.00, 'Women', 'Classic hand-knit cardigan in sustainable merino wool with vintage appeal.', '{"https://images.unsplash.com/photo-1551604882-5b1d26a2c934?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1556821552-5f9755082d27?auto=format&fit=crop&w=1000&q=80"}', true),
('p-005', 'Minimalist White Sneaker', 95.00, 'Shoes', 'Clean leather sneaker with premium comfort insole for all-day wear.', '{"https://images.unsplash.com/photo-1519763185298-1b50fda3fc14?auto=format&fit=crop&w=1000&q=80"}', true),
('p-006', 'Structured Bucket Bag', 78.50, 'Accessories', 'Versatile canvas and leather bucket bag with adjustable shoulder strap.', '{"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1555040776-cdc8a52ec0f5?auto=format&fit=crop&w=1000&q=80"}', true),
('p-007', 'Leather Minimalist Wallet', 45.00, 'Accessories', 'Ultra-slim full-grain leather wallet with RFID protection.', '{"https://images.unsplash.com/photo-1548654156-cb42107f0a25?auto=format&fit=crop&w=1000&q=80"}', true),
('p-008', 'Premium Canvas Belt', 55.00, 'Accessories', 'Full-grain leather belt with brushed metal buckle and timeless minimal design.', '{"https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80","https://images.unsplash.com/photo-1611923134239-b9be5816ea0f?auto=format&fit=crop&w=1000&q=80"}', true);
```

3. Go to Settings > API and copy your Project URL and anon/public key

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Vercel Login

```bash
npx vercel login
```

### 5. Deploy to Vercel

#### Customer Site
```bash
cd customer-site
vercel --prod
```

#### Owner Site
```bash
cd owner-site
vercel --prod
```

Or deploy both from root:
```bash
vercel --prod  # For customer site
cd owner-site && vercel --prod  # For owner site
```

## Local Development

```bash
npm run dev  # Runs both sites locally
```

## Owner Access

- URL: Your deployed owner site URL
- Password: `owner123`

## Architecture

- **Frontend**: Static HTML/CSS/JS deployed on Vercel
- **Backend**: Supabase handles all data operations
- **Real-time**: Products sync automatically between sites
- **Storage**: localStorage for cart/favorites, Supabase for products

- No customer login.
- No online payment.
- WhatsApp button sends cart summary (items and total).
- Product images support:
  - URL input
  - local image file upload (stored as base64 in localStorage)
