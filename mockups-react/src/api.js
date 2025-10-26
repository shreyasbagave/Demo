// STATIC SITE MODE - All data stored in localStorage
// No backend required for this prototype/mockup deployment

import { getAllProductImages } from './data/productImages.js'

// Initialize localStorage with mock data if not present
const initializeStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      { id: '1', username: 'farmer1', email: 'farmer@test.com', password: 'password', role: 'farmer', agristackId: 'AGR001' },
      { id: '2', username: 'dairy1', email: 'dairy@test.com', password: 'password', role: 'dairy', agristackId: 'AGR002' },
      { id: '3', username: 'msme1', email: 'msme@test.com', password: 'password', role: 'msme', agristackId: 'AGR003' }
    ]))
  }
  
  if (!localStorage.getItem('products')) {
    const products = getAllProductImages()
    localStorage.setItem('products', JSON.stringify(products))
  }
}

// Helper to get current user from token (token is just userId in static mode)
const getCurrentUser = (token) => {
  if (!token) return null
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  return users.find(u => u.id === token)
}

// Helper to get user-specific data
const getUserData = (userId, key) => {
  const data = JSON.parse(localStorage.getItem(`${key}_${userId}`) || '[]')
  return data
}

const setUserData = (userId, key, data) => {
  localStorage.setItem(`${key}_${userId}`, JSON.stringify(data))
}

// Username/Password Authentication
export async function loginWithCredentials({ username, password }) {
  initializeStorage()
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.username === username && u.password === password)
  
  if (!user) {
    throw new Error('Invalid username or password')
  }
  
  return { 
    success: true, 
    token: user.id, // In static mode, token is just the user ID
    user: { ...user, password: undefined }
  }
}

// Agristack ID Authentication
export async function loginWithAgristack({ agristackId }) {
  initializeStorage()
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.agristackId === agristackId)
  
  if (!user) {
    throw new Error('Invalid Agristack ID')
  }
  
  return { 
    success: true, 
    token: user.id,
    user: { ...user, password: undefined }
  }
}

// Magic Link Authentication
export async function loginWithMagicLink({ email, verify = false, magicToken }) {
  initializeStorage()
  
  if (!verify) {
    // First step: send magic link
    return { success: true, message: 'Magic link sent to your email' }
  }
  
  // Second step: verify magic token
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.email === email)
  
  if (!user) {
    throw new Error('Invalid email')
  }
  
  return { 
    success: true, 
    token: user.id,
    user: { ...user, password: undefined }
  }
}

// Aadhaar eKYC Authentication
export async function loginWithAadhaar({ aadhaarNumber, otp }) {
  initializeStorage()
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const user = users.find(u => u.aadhaarNumber === aadhaarNumber)
  
  if (!user) {
    throw new Error('Invalid Aadhaar number')
  }
  
  return { 
    success: true, 
    token: user.id,
    user: { ...user, password: undefined }
  }
}

// Signup function
export async function signup({ username, email, password, role, agristackId, aadhaarNumber, phoneNumber }) {
  initializeStorage()
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  
  // Check if user already exists
  if (users.find(u => u.username === username || u.email === email)) {
    throw new Error('User already exists')
  }
  
  const newUser = {
    id: String(users.length + 1),
    username,
    email,
    password,
    role,
    agristackId,
    aadhaarNumber,
    phoneNumber
  }
  
  users.push(newUser)
  localStorage.setItem('users', JSON.stringify(users))
  
  return { 
    success: true, 
    token: newUser.id,
    user: { ...newUser, password: undefined }
  }
}

// Get current user profile
export async function me(token) {
  initializeStorage()
  const user = getCurrentUser(token)
  
  if (!user) {
    throw new Error('User not found')
  }
  
  return { 
    success: true, 
    user: { ...user, password: undefined }
  }
}

// Wishlist API
export async function getWishlist(token) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  const wishlist = getUserData(user.id, 'wishlist')
  return { success: true, wishlist }
}

export async function toggleWishlist({ token, product }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let wishlist = getUserData(user.id, 'wishlist')
  const existingIndex = wishlist.findIndex(item => item.id === product.id)
  
  if (existingIndex >= 0) {
    wishlist.splice(existingIndex, 1)
  } else {
    wishlist.push(product)
  }
  
  setUserData(user.id, 'wishlist', wishlist)
  return { success: true, wishlist }
}

// Cart API
export async function getCart(token) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  const cart = getUserData(user.id, 'cart')
  return { success: true, cart }
}

export async function addToCart({ token, product }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let cart = getUserData(user.id, 'cart')
  const existingItem = cart.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + (product.quantity || 1)
  } else {
    cart.push({ ...product, quantity: product.quantity || 1 })
  }
  
  setUserData(user.id, 'cart', cart)
  return { success: true, cart }
}

export async function updateCartItem({ token, id, quantity }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let cart = getUserData(user.id, 'cart')
  const item = cart.find(item => item.id === id)
  
  if (item) {
    item.quantity = quantity
  }
  
  setUserData(user.id, 'cart', cart)
  return { success: true, cart }
}

export async function removeFromCart({ token, id }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let cart = getUserData(user.id, 'cart')
  cart = cart.filter(item => item.id !== id)
  
  setUserData(user.id, 'cart', cart)
  return { success: true, cart }
}

// Legacy function for backward compatibility
export async function login({ username, password }) {
  return loginWithCredentials({ username, password })
}

// Submit farm onboarding (multipart)
export async function submitOnboarding({ token, formData }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  // In static mode, just store the onboarding data
  const onboardingData = {
    id: Date.now().toString(),
    userId: user.id,
    submittedAt: new Date().toISOString(),
    status: 'pending'
  }
  
  setUserData(user.id, 'onboarding', [onboardingData])
  return { success: true, onboarding: onboardingData }
}

export async function getMyOnboarding(token) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  const onboarding = getUserData(user.id, 'onboarding')
  return { success: true, onboarding: onboarding[0] || null }
}

// Upload user profile photo
export async function uploadProfilePhoto({ token, file }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  // In static mode, just return a mock URL
  const mockPhotoUrl = URL.createObjectURL(file)
  return { success: true, photoUrl: mockPhotoUrl }
}

// Farms API
export async function createFarm({ token, farm, files }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let farms = getUserData(user.id, 'farms')
  const newFarm = {
    ...farm,
    id: Date.now().toString(),
    userId: user.id,
    createdAt: new Date().toISOString()
  }
  
  farms.push(newFarm)
  setUserData(user.id, 'farms', farms)
  return { success: true, farm: newFarm }
}

export async function listFarms(token) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  const farms = getUserData(user.id, 'farms')
  return { success: true, farms }
}

// Product Management API functions
export const getSupplierProducts = async (token) => {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  const products = getUserData(user.id, 'supplier_products')
  return { success: true, products }
}

export const addProduct = async (token, productData) => {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let products = getUserData(user.id, 'supplier_products')
  const newProduct = {
    ...productData,
    id: Date.now(),
    supplierId: user.id,
    createdAt: new Date().toISOString()
  }
  
  products.push(newProduct)
  setUserData(user.id, 'supplier_products', products)
  
  // Also add to global products list
  const allProducts = JSON.parse(localStorage.getItem('products') || '[]')
  allProducts.push(newProduct)
  localStorage.setItem('products', JSON.stringify(allProducts))
  
  return { success: true, product: newProduct }
}

export const updateProduct = async (token, productId, productData) => {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let products = getUserData(user.id, 'supplier_products')
  const index = products.findIndex(p => p.id === productId)
  
  if (index >= 0) {
    products[index] = { ...products[index], ...productData }
    setUserData(user.id, 'supplier_products', products)
    
    // Update in global products list
    const allProducts = JSON.parse(localStorage.getItem('products') || '[]')
    const globalIndex = allProducts.findIndex(p => p.id === productId)
    if (globalIndex >= 0) {
      allProducts[globalIndex] = products[index]
      localStorage.setItem('products', JSON.stringify(allProducts))
    }
    
    return { success: true, product: products[index] }
  }
  
  throw new Error('Product not found')
}

export const deleteProduct = async (token, productId) => {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let products = getUserData(user.id, 'supplier_products')
  products = products.filter(p => p.id !== productId)
  setUserData(user.id, 'supplier_products', products)
  
  // Remove from global products list
  let allProducts = JSON.parse(localStorage.getItem('products') || '[]')
  allProducts = allProducts.filter(p => p.id !== productId)
  localStorage.setItem('products', JSON.stringify(allProducts))
  
  return { success: true }
}

export const uploadProductImage = async (token, file) => {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  // In static mode, return a mock URL
  const mockImageUrl = URL.createObjectURL(file)
  return { success: true, imageUrl: mockImageUrl }
}

// Get all products for marketplace
export const getAllProducts = async (params = {}) => {
  initializeStorage()
  
  let products = JSON.parse(localStorage.getItem('products') || '[]')
  
  // Filter by category
  if (params.category && params.category !== 'All Categories') {
    products = products.filter(p => p.category === params.category)
  }
  
  // Filter by search
  if (params.search) {
    const query = params.search.toLowerCase()
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    )
  }
  
  console.log('getAllProducts: Static mode, returning', products.length, 'products')
  return { success: true, products, total: products.length }
}

// Additional Order API functions
export async function createOrder({ token, orderData }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  let orders = getUserData(user.id, 'orders')
  const newOrder = {
    ...orderData,
    id: Date.now().toString(),
    userId: user.id,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  
  orders.push(newOrder)
  setUserData(user.id, 'orders', orders)
  
  // Clear cart after order
  setUserData(user.id, 'cart', [])
  
  return { success: true, order: newOrder }
}

export async function getOrderById({ token, orderId }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  const orders = getUserData(user.id, 'orders')
  const order = orders.find(o => o.id === orderId)
  
  if (!order) throw new Error('Order not found')
  
  return { success: true, order }
}

export async function getUserOrders({ token }) {
  initializeStorage()
  const user = getCurrentUser(token)
  if (!user) throw new Error('Not authenticated')
  
  const orders = getUserData(user.id, 'orders')
  return { success: true, orders }
}
