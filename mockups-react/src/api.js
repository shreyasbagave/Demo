// API configuration
const API_BASE_URL = 'http://localhost:4000/api'

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  console.log('apiCall - URL:', url)
  console.log('apiCall - Config:', config)
  console.log('apiCall - Body:', config.body)

  try {
    const response = await fetch(url, config)
    const data = await response.json()
    
    if (!response.ok) {
      // Provide more detailed error information
      const errorMessage = data.error || `HTTP ${response.status}: ${response.statusText}`
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        error: data.error,
        data: data,
        url: url,
        config: config
      })
      throw new Error(errorMessage)
    }
    
    return data
  } catch (error) {
    console.error('API call error:', error)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to server. Please check your internet connection.')
    }
    throw error
  }
}

// Username/Password Authentication
export async function loginWithCredentials({ username, password }) {
  return await apiCall('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}

// Agristack ID Authentication
export async function loginWithAgristack({ agristackId }) {
  return await apiCall('/login/agristack', {
    method: 'POST',
    body: JSON.stringify({ agristackId })
  })
}

// Magic Link Authentication
export async function loginWithMagicLink({ email, verify = false, magicToken }) {
  return await apiCall('/login/magiclink', {
    method: 'POST',
    body: JSON.stringify({ email, verify, magicToken })
  })
}

// Aadhaar eKYC Authentication
export async function loginWithAadhaar({ aadhaarNumber, otp }) {
  return await apiCall('/login/aadhaar', {
    method: 'POST',
    body: JSON.stringify({ aadhaarNumber, otp })
  })
}

// Signup function
export async function signup({ username, email, password, role, agristackId, aadhaarNumber, phoneNumber }) {
  return await apiCall('/signup', {
    method: 'POST',
    body: JSON.stringify({ username, email, password, role, agristackId, aadhaarNumber, phoneNumber })
  })
}

// Get current user profile
export async function me(token) {
  return await apiCall('/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// Wishlist API
export async function getWishlist(token) {
  return await apiCall('/wishlist', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

export async function toggleWishlist({ token, product }) {
  return await apiCall('/wishlist/toggle', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(product)
  })
}

// Cart API
export async function getCart(token) {
  return await apiCall('/cart', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

export async function addToCart({ token, product }) {
  return await apiCall('/cart/add', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(product)
  })
}

export async function updateCartItem({ token, id, quantity }) {
  return await apiCall('/cart/update', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ id, quantity })
  })
}

export async function removeFromCart({ token, id }) {
  return await apiCall('/cart/remove', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ id })
  })
}

// Legacy function for backward compatibility
export async function login({ username, password }) {
  return loginWithCredentials({ username, password })
}

// Submit farm onboarding (multipart)
export async function submitOnboarding({ token, formData }) {
  const url = `${API_BASE_URL}/onboarding`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
      // Note: fetch sets multipart boundary automatically; don't set Content-Type
    },
    body: formData
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to submit onboarding')
  return data
}

export async function getMyOnboarding(token) {
  return await apiCall('/onboarding/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// Upload user profile photo
export async function uploadProfilePhoto({ token, file }) {
  const url = `${API_BASE_URL}/profile/photo`
  const form = new FormData()
  form.append('photo', file)
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: form
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to upload photo')
  return data
}

// Farms API
export async function createFarm({ token, farm, files }) {
  // If files present, send multipart; else JSON
  if (files && (files.landRecord || (files.geotagPhotos && files.geotagPhotos.length))) {
    const form = new FormData()
    Object.entries(farm || {}).forEach(([k, v]) => form.append(k, v ?? ''))
    if (files.landRecord) form.append('landRecord', files.landRecord)
    ;(files.geotagPhotos || []).forEach(f => form.append('geotagPhotos', f))
    const res = await fetch(`${API_BASE_URL}/farms`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: form
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Failed to create farm')
    return data
  }
  return await apiCall('/farms', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(farm)
  })
}

export async function listFarms(token) {
  return await apiCall('/farms', {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

// Product Management API functions
export const getSupplierProducts = async (token) => {
  return apiCall('/products/supplier', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const addProduct = async (token, productData) => {
  return apiCall('/products', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
}

export const updateProduct = async (token, productId, productData) => {
  return apiCall(`/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  })
}

export const deleteProduct = async (token, productId) => {
  return apiCall(`/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const uploadProductImage = async (token, file) => {
  const formData = new FormData()
  formData.append('image', file)
  
  return apiCall('/products/upload-image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  })
}

// Get all products for marketplace
export const getAllProducts = async (params = {}) => {
  const queryParams = new URLSearchParams()
  if (params.category) queryParams.append('category', params.category)
  if (params.search) queryParams.append('search', params.search)
  if (params.page) queryParams.append('page', params.page)
  if (params.limit) queryParams.append('limit', params.limit)
  
  const queryString = queryParams.toString()
  const endpoint = queryString ? `/products?${queryString}` : '/products'
  
  console.log('getAllProducts: Calling API endpoint:', endpoint)
  const result = await apiCall(endpoint, {
    method: 'GET'
  })
  
  console.log('getAllProducts: API Response:', result)
  if (result.products) {
    console.log('getAllProducts: Number of products:', result.products.length)
    console.log('getAllProducts: First product:', result.products[0])
    console.log('getAllProducts: Product IDs:', result.products.map(p => ({ id: p.id, type: typeof p.id, name: p.name })))
  }
  
  return result
}

// Additional Order API functions
export async function createOrder({ token, orderData }) {
  return await apiCall('/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  })
}

export async function getOrderById({ token, orderId }) {
  return await apiCall(`/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export async function getUserOrders({ token }) {
  return await apiCall('/orders', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
