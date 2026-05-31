import baseProducts from '../data/products.json'

const STORAGE_KEY = 'managedProducts'

function getAll() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) return JSON.parse(stored)
  const copy = baseProducts.map(p => ({ ...p }))
  localStorage.setItem(STORAGE_KEY, JSON.stringify(copy))
  return copy
}

function saveAll(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export function getManagedProducts() {
  return getAll()
}

export function getManagedProductById(id) {
  return getAll().find(p => p.id === Number(id)) || null
}

export function addManagedProduct(product) {
  const products = getAll()
  const maxId = products.reduce((m, p) => Math.max(m, p.id), 0)
  const newProduct = { ...product, id: maxId + 1 }
  products.push(newProduct)
  saveAll(products)
  return newProduct
}

export function updateManagedProduct(id, data) {
  const products = getAll()
  const idx = products.findIndex(p => p.id === Number(id))
  if (idx === -1) return null
  products[idx] = { ...products[idx], ...data, id: Number(id) }
  saveAll(products)
  return products[idx]
}

export function deleteManagedProduct(id) {
  const products = getAll().filter(p => p.id !== Number(id))
  saveAll(products)
}
