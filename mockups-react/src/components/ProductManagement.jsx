import React, { useState, useEffect } from 'react'
import { getSupplierProducts, addProduct, updateProduct, deleteProduct, uploadProductImage } from '../api'
import './ProductManagement.css'

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    eco: 0
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [roleError, setRoleError] = useState(null)

  // Check user role on component load
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setRoleError('Please log in to access this page')
          return
        }
        
        const userResponse = await fetch('http://localhost:4000/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const userData = await userResponse.json()
        
        // Allow both 'msme' and 'farmer' roles to manage products
        if (userData.role !== 'msme' && userData.role !== 'farmer') {
          setRoleError('Only farmers and suppliers can manage products.')
        } else {
          setUserRole(userData.role)
        }
      } catch (error) {
        console.error('Error checking user role:', error)
        setRoleError('Error verifying user permissions')
      }
    }
    
    checkUserRole()
  }, [])

  // Load products from API only
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const apiProducts = await getSupplierProducts(token)
          setProducts(apiProducts.products || [])
        } else {
          setProducts([])
        }
      } catch (error) {
        console.error('Error loading products:', error)
        setProducts([])
      }
    }
    loadProducts()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file) => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await uploadProductImage(token, file)
        return response.imageUrl
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      setUploading(true)
      const token = localStorage.getItem('token')
      
      // Check if user is authenticated and has supplier role
      if (!token) {
        alert('Please log in to create products')
        return
      }
      
      // Get user info to check role
      try {
        const userResponse = await fetch('http://localhost:4000/api/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const userData = await userResponse.json()
        
        // Allow both 'msme' and 'farmer' roles to create products
        if (userData.role !== 'msme' && userData.role !== 'farmer') {
          alert('Only farmers and suppliers can create products.')
          return
        }
      } catch (roleError) {
        console.error('Error checking user role:', roleError)
        alert('Error verifying user permissions. Please try again.')
        return
      }
      
      // Prepare product data
      let productData = { 
        ...formData,
        stock: parseInt(formData.stock) || 0,
        eco: parseInt(formData.eco) || 0
      }
      
      // Handle image upload if file is selected
      if (selectedFile) {
        const imageUrl = await uploadImage(selectedFile)
        if (imageUrl) {
          productData.image = imageUrl
        } else {
          // Fallback to preview URL if upload fails
          productData.image = imagePreview
        }
      } else if (!productData.image) {
        // Provide a default image if none is provided
        productData.image = 'https://via.placeholder.com/400x300?text=No+Image'
      }
      
      if (editingProduct) {
        // Update existing product
        if (token) {
          await updateProduct(token, editingProduct.id, productData)
        }
        // Reload products from API after update
        const apiProducts = await getSupplierProducts(token)
        setProducts(apiProducts.products || [])
        setEditingProduct(null)
      } else {
        // Add new product
        const newProduct = {
          id: Date.now(),
          ...productData,
          rating: 0,
          reviews: 0,
          createdAt: new Date().toISOString()
        }
        
        if (token) {
          console.log('Sending product data:', productData)
          const apiProduct = await addProduct(token, productData)
          console.log('API response:', apiProduct)
          newProduct.id = apiProduct.product?.id || newProduct.id
        }
        
        // Reload products from API after creation
        const apiProducts = await getSupplierProducts(token)
        setProducts(apiProducts.products || [])
      }
      
      setShowAddModal(false)
      resetForm()
    } catch (error) {
      console.error('Error saving product:', error)
      alert(`Error saving product: ${error.message}. Please try again.`)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      eco: product.eco
    })
    setImagePreview(product.image)
    setSelectedFile(null)
    setShowAddModal(true)
  }

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const token = localStorage.getItem('token')
        
        if (token) {
          await deleteProduct(token, productId)
        }
        
        // Reload products from API after deletion
        const apiProducts = await getSupplierProducts(token)
        setProducts(apiProducts.products || [])
      } catch (error) {
        console.error('Error deleting product:', error)
        alert('Error deleting product. Please try again.')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: '',
      eco: 0
    })
    setSelectedFile(null)
    setImagePreview(null)
  }

  const closeModal = () => {
    setShowAddModal(false)
    setEditingProduct(null)
    resetForm()
  }

  // Show role error if user doesn't have permission
  if (roleError) {
    return (
      <div className="product-management-container">
        <div className="role-error-container">
          <div className="role-error-message">
            <h3>Access Denied</h3>
            <p>{roleError}</p>
            <button 
              className="login-redirect-btn"
              onClick={() => window.location.href = '/'}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Show loading if checking role
  if (!userRole && !roleError) {
    return (
      <div className="product-management-container">
        <div className="loading-container">
          <p>Verifying permissions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="product-management-container">
      <div className="product-management-header">
        <div className="product-management-title">
          <h2>My Products</h2>
          <p>Manage your product inventory and listings - Available for farmers and suppliers</p>
        </div>
        <button 
          className="add-product-btn"
          onClick={() => setShowAddModal(true)}
        >
          <span>+</span> Add Product
        </button>
      </div>

      <div className="product-stats">
        <div className="stat-card">
          <div className="stat-number">{products.length}</div>
          <div className="stat-label">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{products.filter(p => p.stock > 0).length}</div>
          <div className="stat-label">In Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{products.filter(p => p.stock === 0).length}</div>
          <div className="stat-label">Out of Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">
            {products.length > 0 ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) : '0.0'}
          </div>
          <div className="stat-label">Avg Rating</div>
        </div>
      </div>

      <div className="products-grid">
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No Products Yet</h3>
            <p>Start by adding your first product to the marketplace</p>
            <button 
              className="add-first-product-btn"
              onClick={() => setShowAddModal(true)}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-details">
                  <div className="product-price">{product.price}</div>
                  <div className="product-category">{product.category}</div>
                </div>
                <div className="product-metrics">
                  <div className="eco-score">
                    <span className="eco-label">Eco Score:</span>
                    <span className="eco-value">{product.eco}/10</span>
                  </div>
                  <div className="product-rating">
                    <span className="rating-stars">⭐</span>
                    <span className="rating-value">{product.rating}</span>
                    <span className="rating-reviews">({product.reviews})</span>
                  </div>
                </div>
                <div className="product-stock">
                  <span className="stock-label">Stock:</span>
                  <span className="stock-value">{product.stock} units</span>
                </div>
              </div>
              <div className="product-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Rs. 100/kg"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Seeds">Seeds</option>
                    <option value="Fertilizers">Fertilizers</option>
                    <option value="Pesticides">Pesticides</option>
                    <option value="Tools">Tools</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Grains">Grains</option>
                    <option value="Spices">Spices</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="stock">Stock Quantity</label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eco">Eco Score (0-10)</label>
                  <input
                    type="number"
                    id="eco"
                    name="eco"
                    value={formData.eco}
                    onChange={handleInputChange}
                    min="0"
                    max="10"
                    step="0.1"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="image">Product Image</label>
                <div className="image-upload-container">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <label htmlFor="image" className="file-input-label">
                    <span className="upload-icon">📷</span>
                    <span className="upload-text">
                      {selectedFile ? 'Change Image' : 'Choose Image'}
                    </span>
                  </label>
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                      <button 
                        type="button" 
                        className="remove-image-btn"
                        onClick={() => {
                          setSelectedFile(null)
                          setImagePreview(null)
                          setFormData(prev => ({ ...prev, image: '' }))
                        }}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="imageUrl">Or Image URL</label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={uploading}>
                  {uploading ? 'Uploading...' : (editingProduct ? 'Update Product' : 'Add Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
