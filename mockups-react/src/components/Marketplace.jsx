import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { me, getAllProducts } from '../api'
import { getAllProductImages } from '../data/productImages.js'
import HeaderBar from './HeaderBar.jsx'
import './Marketplace.css'

export default function Marketplace() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('marketplace')
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [hoveredProductId, setHoveredProductId] = useState(null)
  const [showProfilePage, setShowProfilePage] = useState(false)
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [userError, setUserError] = useState('')
  const [products, setProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [showAddedToast, setShowAddedToast] = useState(false)

  // Helper function to parse price correctly from any format
  const parsePrice = (priceString) => {
    if (!priceString) return 0
    // Remove all non-numeric characters except dots and commas
    // Then remove commas and convert to float
    const cleaned = priceString.toString().replace(/[^\d.,]/g, '').replace(/,/g, '')
    return parseFloat(cleaned) || 0
  }

  // Load cart and wishlist from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setUserError('Not authenticated')
          return
        }
        const profile = await me(token)
        setUser(profile)
      } catch (e) {
        setUserError(e.message || 'Failed to load user')
      } finally {
        setLoadingUser(false)
      }
    }
    fetchUser()
  }, [])

  // Load products from API
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoadingProducts(true)
        setProductsError('')
        
        // Try to load from API first
        try {
          const response = await getAllProducts()
          console.log('Marketplace: Loaded products from API:', response.products)
          const apiProducts = response.products || []
          
          if (apiProducts.length > 0) {
            setProducts(apiProducts)
            return
          }
        } catch (apiError) {
          console.log('API not available, using local product data')
        }
        
        // Fallback to local product images data
        console.log('Using local product images data')
        const localProducts = getAllProductImages().map(product => ({
          ...product,
          stock: Math.floor(Math.random() * 100) + 10, // Random stock
          farmer: 'Local Farmer',
          farmerSI: 350,
          farmerEmail: 'farmer@example.com',
          createdAt: new Date().toISOString()
        }))
        
        setProducts(localProducts)
        console.log('Marketplace: Loaded local products:', localProducts)
        console.log('First product image URL:', localProducts[0]?.image)
        console.log('Total products loaded:', localProducts.length)
        
      } catch (error) {
        console.error('Error loading products:', error)
        setProductsError('Failed to load products')
        setProducts([])
      } finally {
        setLoadingProducts(false)
      }
    }
    loadProducts()
  }, [])


  // Products are now imported from the data file

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/'
  }

  // Add to cart function
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    let updatedCart
    
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }]
    }
    
    setCart(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Show toast notification
    setShowAddedToast(true)
    setTimeout(() => setShowAddedToast(false), 2000)
  }

  // Buy Now function - Add to cart and go directly to checkout
  const handleBuyNow = (product) => {
    const existingItem = cart.find(item => item.id === product.id)
    let updatedCart
    
    if (existingItem) {
      // If already in cart, just navigate to checkout
      updatedCart = cart
    } else {
      // Add to cart with quantity 1
      updatedCart = [...cart, { ...product, quantity: 1 }]
      setCart(updatedCart)
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    }
    
    // Navigate directly to checkout
    navigate('/checkout')
  }

  // Add to wishlist function
  const addToWishlist = (product) => {
    const isAlreadyInWishlist = wishlist.find(item => item.id === product.id)
    let updatedWishlist
    
    if (isAlreadyInWishlist) {
      updatedWishlist = wishlist.filter(item => item.id !== product.id)
    } else {
      updatedWishlist = [...wishlist, product]
    }
    
    setWishlist(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

  const getEcoColor = (eco) => {
    if (eco >= 8) return { backgroundColor: '#dcfce7', color: '#166534', borderColor: '#22c55e' }
    if (eco >= 7) return { backgroundColor: '#fef3c7', color: '#92400e', borderColor: '#f59e0b' }
    return { backgroundColor: '#fee2e2', color: '#dc2626', borderColor: '#ef4444' }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400" fill={i < Math.floor(rating) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ))
  }

  // Filter products locally
  const filteredProducts = (() => {
    let filtered = products

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply price filter
    if (priceFilter !== 'all') {
      if (priceFilter.includes('-')) {
        const [min, max] = priceFilter.split('-').map(Number)
        filtered = filtered.filter(product => {
          const priceValue = parsePrice(product.price)
          return priceValue >= min && priceValue <= max
        })
      } else if (priceFilter === '1000+') {
        filtered = filtered.filter(product => {
          const priceValue = parsePrice(product.price)
          return priceValue >= 1000
        })
      }
    }

    return filtered
  })()

  // FarmerProfile component with steppers
  function FarmerProfile() {
    const [step, setStep] = useState(0)
    const steps = [
      { label: 'Personal Info' },
      { label: 'Farm Details' },
      { label: 'Documents / Verification' }
    ]
    return (
      <div style={{
        maxWidth: '500px',
        margin: '40px auto',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '32px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#2563eb' }}>👨‍🌾 Farmer Profile</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px', gap: '24px' }}>
          {steps.map((s, idx) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: idx === step ? '#2563eb' : '#e5e7eb',
                  color: idx === step ? 'white' : '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  margin: '0 auto 8px'
                }}
              >
                {idx + 1}
              </div>
              <div style={{ fontSize: '14px', color: idx === step ? '#2563eb' : '#6b7280', fontWeight: idx === step ? 'bold' : 'normal' }}>
                {s.label}
              </div>
              {idx < steps.length - 1 && (
                <div style={{
                  width: '40px',
                  height: '2px',
                  background: '#e5e7eb',
                  margin: '16px auto 0'
                }} />
              )}
            </div>
          ))}
        </div>
        <div style={{ minHeight: '120px', marginBottom: '24px' }}>
          {step === 0 && <div>
            <p style={{ color: '#374151' }}>Enter your personal information here.</p>
          </div>}
          {step === 1 && <div>
            <p style={{ color: '#374151' }}>Enter your farm details here.</p>
          </div>}
          {step === 2 && <div>
            <p style={{ color: '#374151' }}>Upload documents for verification.</p>
          </div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
            style={{
              padding: '10px 20px',
              background: step === 0 ? '#e5e7eb' : '#2563eb',
              color: step === 0 ? '#9ca3af' : 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: step === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            Previous
          </button>
          <button
            disabled={step === steps.length - 1}
            onClick={() => setStep(step + 1)}
            style={{
              padding: '10px 20px',
              background: step === steps.length - 1 ? '#e5e7eb' : '#059669',
              color: step === steps.length - 1 ? '#9ca3af' : 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer'
            }}
          >
            Next
          </button>
        </div>
        <button
          onClick={() => setShowProfilePage(false)}
          style={{
            marginTop: '32px',
            background: '#f3f4f6',
            color: '#2563eb',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>
    )
  }

  // ProductCard component with rounded corners and shadow
  function ProductCard({ product, onClick, hovered, onMouseEnter, onMouseLeave }) {
    console.log('ProductCard: Rendering product:', product.name, 'Image:', product.image)
    const priceValue = parsePrice(product.price)
    const discountPct = Math.round(((priceValue * 1.3 - priceValue) / (priceValue * 1.3)) * 100)
    const mrp = Math.round(priceValue * 1.3)
    
    return (
      <div
        className={`marketplace-product-card ${hovered ? 'hovered' : ''}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Badge */}
        <div className="marketplace-product-badge">
          HOT SALE
        </div>
        {/* Image */}
        <div className="marketplace-product-image">
          <img 
            src={product.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
            onError={(e) => {
              console.log('❌ Image failed to load:', product.image)
              console.log('❌ Product name:', product.name)
              e.target.src = 'https://via.placeholder.com/400x300?text=Image+Failed'
            }}
            onLoad={() => {
              console.log('✅ Image loaded successfully:', product.image)
              console.log('✅ Product name:', product.name)
            }}
          />
          {/* Free Delivery Badge at left lower corner */}
          {priceValue > 500 && (
            <div className="marketplace-free-delivery-badge">
              🚚 Free Delivery
            </div>
          )}
        </div>
        {/* Info */}
        <div className="marketplace-product-info">
          <div className="marketplace-product-title">
            {product.name}
          </div>
          <div className="marketplace-product-description">
            {product.description}
          </div>
          {/* EcoScore pill */}
          <div className="marketplace-ecoscore">
            <span 
              className="marketplace-ecoscore-badge"
              style={{
                border: '1px solid ' + (getEcoColor(product.eco).borderColor),
                background: getEcoColor(product.eco).backgroundColor,
                color: getEcoColor(product.eco).color
              }}
            >
              🌱 Eco Score: {product.eco}/10
            </span>
          </div>
          <div className="marketplace-product-features">
            <span className="marketplace-feature-tag">4K Display</span>
            <span className="marketplace-feature-tag">16-Hour Battery</span>
            <span className="marketplace-feature-tag">Thunderbolt 4</span>
          </div>
          <div className="marketplace-product-bottom">
            <div className="marketplace-price-container">
              <span className="marketplace-price-old">
                ₹{mrp.toLocaleString('en-IN')}
              </span>
              <span className="marketplace-price-new">
                ₹{priceValue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
          <div className="marketplace-product-meta">
            <div className="marketplace-rating">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? 'marketplace-star' : 'marketplace-star-empty'}>★</span>
              ))}
              <span className="marketplace-review-count">{product.reviews} Reviews</span>
            </div>
            <span className="marketplace-stock-status">In Stock</span>
          </div>
          
          {/* Action Buttons */}
          <div className="marketplace-product-actions">
            <button
              className="marketplace-buy-now-btn"
              onClick={(e) => {
                e.stopPropagation()
                handleBuyNow(product)
              }}
            >
              ⚡ Buy Now
            </button>
            <button
              className="marketplace-add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation()
                addToCart(product)
              }}
            >
              🛒 Cart
            </button>
            <button
              className="marketplace-wishlist-btn"
              onClick={(e) => {
                e.stopPropagation()
                addToWishlist(product)
              }}
            >
              {wishlist.find(item => item.id === product.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
        {/* More Info Overlay on hover */}
        {hovered && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(207, 207, 234, 0.97)',
            color: '#18181B',
            borderRadius: '5%',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '15px',
            boxShadow: '0 10px 25px rgba(0,0,0,.15)',
            padding: '32px'
          }}>
            <div style={{ fontWeight: 'bold', fontSize: '22px', marginBottom: '12px' }}>{product.name}</div>
            <div style={{ marginBottom: '8px', textAlign: 'center' }}>{product.description}</div>
            <div style={{ marginBottom: '8px' }}>Category: <b>{product.category}</b></div>
            <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
              <span style={{ 
                background: getEcoColor(product.eco).backgroundColor, 
                color: getEcoColor(product.eco).color, 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                🌱 Eco Score: {product.eco}/10
              </span>
            </div>
            <div style={{ marginBottom: '8px' }}>Farmer: <b>{product.farmer}</b></div>
            <div style={{ marginBottom: '8px' }}>Rating: <b>{product.rating}</b> ({product.reviews} reviews)</div>
            <div style={{ marginBottom: '8px' }}>Price: <b>₹{priceValue.toLocaleString('en-IN')}</b></div>
            {priceValue > 500 && (
              <div style={{ marginBottom: '8px', color: '#059669', fontWeight: 'bold' }}>🚚 Free Delivery</div>
            )}
            <div style={{ marginBottom: '8px' }}>This product is organically grown and verified for quality. Delivery available pan India.</div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="marketplace-container">
      {/* Shared Header */}
      <HeaderBar />
      
      {/* Subheading Bar */}
      <div className="marketplace-subheading-bar">
        <div className="marketplace-subheading-content">
          <div className="marketplace-subheading-inner">
            {/* Left side - Back button and breadcrumb */}
            <div className="marketplace-left-section">
              <button
                onClick={() => {
                  const role = localStorage.getItem('userRole') || 'farmer'
                  navigate(`/dashboard/${role}`)
                }}
                className="marketplace-back-button"
              >
                ← Dashboard
              </button>
              
              {/* Breadcrumb */}
              <div className="marketplace-breadcrumb">
                <span>Dashboard</span>
                <span>›</span>
                <span className="marketplace-breadcrumb-current">Marketplace</span>
              </div>
            </div>

            {/* Right side - Cart and Wishlist buttons */}
            <div className="marketplace-right-section">
              <button
                className="marketplace-wishlist-button"
                onClick={() => navigate('/wishlist')}
              >
                <span className="marketplace-wishlist-icon">❤️</span>
                Wishlist ({wishlist.length})
              </button>
              <button
                className="marketplace-cart-button"
                onClick={() => navigate('/cart')}
              >
                <span className="marketplace-cart-icon">🛒</span>
                Cart ({cart.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs removed per request */}

      {/* Main Content */}
      <div className="marketplace-main-content">
        {showProfilePage ? (
          <FarmerProfile />
        ) : (
          <>
            {loadingProducts ? (
              <div className="marketplace-loading">
                <h3>Loading products...</h3>
                <p>Please wait while we fetch the latest products</p>
              </div>
            ) : productsError ? (
              <div className="marketplace-error">
                <h3>❌ Error loading products</h3>
                <p>{productsError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="marketplace-retry-button"
                >
                  🔄 Retry
                </button>
              </div>
            ) : (
              <div className="marketplace-products-grid">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => {
                      console.log('Product card clicked:', product.id, product.name)
                      navigate(`/product/${product.id}`)
                    }}
                    hovered={hoveredProductId === product.id}
                    onMouseEnter={() => setHoveredProductId(product.id)}
                    onMouseLeave={() => setHoveredProductId(null)}
                  />
                ))}
                {filteredProducts.length === 0 && !loadingProducts && (
                  <div className="marketplace-no-products">
                    <h3 className="marketplace-no-products-title">🔍 No products found</h3>
                    <p className="marketplace-no-products-description">Try adjusting your search or filter criteria</p>
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setPriceFilter('all')
                      }}
                      className="marketplace-clear-filters-button"
                    >
                      🔄 Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {showProfileDropdown && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40
          }}
          onClick={() => setShowProfileDropdown(false)}
        />
      )}

      {/* Toast Notification */}
      {showAddedToast && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: '#10b981',
          color: 'white',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontWeight: '600',
          fontSize: '16px',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <span style={{ fontSize: '24px' }}>✅</span>
          <span>Added to Cart!</span>
        </div>
      )}

    </div>
  )
}