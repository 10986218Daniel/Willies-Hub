import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your_supabase_url_here'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your_supabase_anon_key_here'
const supabase = createClient(supabaseUrl, supabaseKey)

const STORAGE_KEYS = {
  products: "clothify_products_v1",
  cart: "clothify_cart_v1",
  favorites: "clothify_favorites_v1",
  ownerSession: "clothify_owner_session_v1"
};

function initProductStorage() {
  // Products now stored in Supabase
}

async function readProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (error) {
    console.warn("Supabase error, falling back to localStorage:", error)
    const existing = localStorage.getItem(STORAGE_KEYS.products)
    return existing ? JSON.parse(existing) : []
  }
}

// Supabase-specific functions
async function addProductToSupabase(product) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()

  if (error) throw error
  return data[0]
}

async function updateProductInSupabase(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) throw error
  return data[0]
}

async function deleteProductFromSupabase(id) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) throw error
}