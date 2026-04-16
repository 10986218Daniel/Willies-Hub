import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const supabaseUrl = 'https://xmrbxljlhweoeefskdky.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcmJ4bGpsaHdlb2VlZnNrZGt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzAwNjEsImV4cCI6MjA5MTkwNjA2MX0.zIYeaaixeizu9IOC0aHMnkKY7Sr2xE29JrDw_X5lci4'
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