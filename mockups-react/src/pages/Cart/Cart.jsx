import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../components/HeaderBar.jsx'
import { getAllProductImages } from '../../data/productImages.js'
import './Cart.css'

export default function Cart() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [savedForLater, setSavedForLater] = useState([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [recommendedProducts, setRecommendedProducts] = useState([])

  // Available coupons
  const availableCoupons = [
    { code: 'SAVE10', discount: 10, type: 'percentage', minAmount: 500 },
    { code: 'SAVE50', discount: 50, type: 'flat', minAmount: 300 },
    { code: 'FREESHIP', discount: 0, type: 'shipping', minAmount: 0 },
    { code: 'ORGANIC20', discount: 20, type: 'percentage', minAmount: 1000 }
  ]

  // Helper function to parse price correctly from any format
  const parsePrice = (priceString) => {
    if (!priceString) return 0
    // Remove all non-numeric characters except dots and commas
    // Then remove commas and convert to float
    const cleaned = priceString.toString().replace(/[^\d.,]/g, '').replace(/,/g, '')
    return parseFloat(cleaned) || 0
  }

  useEffect(() => {
    loadCart()
    loadSavedForLater()
    loadRecommendedProducts()
  }, [])

  const loadCart = () => {
    try {
      setLoading(true)
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const cartData = JSON.parse(savedCart)
        
        // Update cart items with latest product data from source
        const allProducts = getAllProductImages()
        const updatedCart = cartData.map(cartItem => {
          const latestProduct = allProducts.find(p => String(p.id) === String(cartItem.id))
          if (latestProduct) {
            // Update with latest price and details but keep quantity
            return {
              ...latestProduct,
              quantity: cartItem.quantity
            }
          }
          return cartItem
        })
        
        setCartItems(updatedCart)
        // Save updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart))
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadSavedForLater = () => {
    try {
      const saved = localStorage.getItem('savedForLater')
      if (saved) {
        setSavedForLater(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading saved items:', error)
    }
  }

  const loadRecommendedProducts = () => {
    // Get 3 random products as recommendations
    const allProducts = getAllProductImages()
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
    setRecommendedProducts(shuffled.slice(0, 3))
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const handleSaveForLater = (item) => {
    // Remove from cart
    const updatedCart = cartItems.filter(i => i.id !== item.id)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    // Add to saved for later
    const updatedSaved = [...savedForLater, item]
    setSavedForLater(updatedSaved)
    localStorage.setItem('savedForLater', JSON.stringify(updatedSaved))
    
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const handleMoveToCart = (item) => {
    // Remove from saved for later
    const updatedSaved = savedForLater.filter(i => i.id !== item.id)
    setSavedForLater(updatedSaved)
    localStorage.setItem('savedForLater', JSON.stringify(updatedSaved))
    
    // Add to cart
    const updatedCart = [...cartItems, item]
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const handleMoveToWishlist = (item) => {
    // Remove from cart
    handleRemoveItem(item.id)
    
    // Add to wishlist
    const savedWishlist = localStorage.getItem('wishlist')
    const wishlist = savedWishlist ? JSON.parse(savedWishlist) : []
    wishlist.push(item)
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }

  const handleClearCart = () => {
    if (!confirm('Are you sure you want to clear your cart?')) return
    
    setCartItems([])
    localStorage.setItem('cart', JSON.stringify([]))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase())
    
    if (!coupon) {
      alert('Invalid coupon code')
      return
    }
    
    const subtotal = calculateSubtotal()
    if (subtotal < coupon.minAmount) {
      alert(`Minimum order amount of ₹${coupon.minAmount} required for this coupon`)
      return
    }
    
    setAppliedCoupon(coupon)
    alert(`Coupon ${coupon.code} applied successfully!`)
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parsePrice(item.price)
      return total + (price * item.quantity)
    }, 0)
  }

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0
    
    const subtotal = calculateSubtotal()
    if (appliedCoupon.type === 'percentage') {
      return (subtotal * appliedCoupon.discount) / 100
    } else if (appliedCoupon.type === 'flat') {
      return appliedCoupon.discount
    }
    return 0
  }

  const calculateShipping = () => {
    if (appliedCoupon && appliedCoupon.type === 'shipping') return 0
    const subtotal = calculateSubtotal()
    return subtotal > 500 ? 0 : 50
  }

  const calculateTax = () => {
    const subtotal = calculateSubtotal()
    const discount = calculateDiscount()
    return ((subtotal - discount) * 0.05) // 5% tax
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const discount = calculateDiscount()
    const shipping = calculateShipping()
    const tax = calculateTax()
    return subtotal - discount + shipping + tax
  }

  const getEstimatedDelivery = () => {
    const today = new Date()
    const deliveryDate = new Date(today.setDate(today.getDate() + 5))
    return deliveryDate.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const addRecommendedToCart = (product) => {
    const savedCart = localStorage.getItem('cart')
    const cart = savedCart ? JSON.parse(savedCart) : []
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id)
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    setCartItems(cart)
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }

  if (loading) {
    return (
      <div className="cart-container">
        <HeaderBar />
        <div className="cart-loading">
          <div className="spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <HeaderBar />
      
      {/* Breadcrumb */}
      <div className="cart-breadcrumb">
        <div className="cart-content-width">
          <button onClick={() => navigate('/marketplace')} className="back-btn">
            ← Back to Shopping
          </button>
          <div className="breadcrumb-links">
            <span onClick={() => navigate('/marketplace')}>Marketplace</span>
            <span>›</span>
            <span className="active">Shopping Cart</span>
          </div>
        </div>
      </div>

      <div className="cart-content-width">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <button onClick={() => navigate('/marketplace')} className="shop-now-btn">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Left Column - Cart Items */}
            <div className="cart-items-section">
              <div className="cart-header">
                <h1>Shopping Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</h1>
                {cartItems.length > 0 && (
                  <button onClick={handleClearCart} className="clear-cart-btn">
                    Clear Cart
                  </button>
                )}
              </div>

              {cartItems.map((item) => {
                const itemPrice = parsePrice(item.price)
                const itemTotal = itemPrice * item.quantity

                return (
                  <div key={item.id} className="cart-item">
                    <img 
                      src={item.image || 'https://via.placeholder.com/120x120?text=No+Image'} 
                      alt={item.name}
                      className="cart-item-image"
                      onClick={() => navigate(`/product/${item.id}`)}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/120x120?text=Failed'
                      }}
                    />
                    
                    <div className="cart-item-details">
                      <h3 
                        className="cart-item-name"
                        onClick={() => navigate(`/product/${item.id}`)}
                      >
                        {item.name}
                      </h3>
                      <p className="cart-item-category">{item.category}</p>
                      <div className="cart-item-stock">
                        <span className="stock-badge">✓ In Stock</span>
                        <span className="delivery-info">🚚 Delivery by {getEstimatedDelivery()}</span>
                      </div>
                      <div className="cart-item-price">
                        <span className="price">₹{itemPrice.toLocaleString('en-IN')}</span>
                        <span className="item-total">Subtotal: ₹{itemTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <div className="cart-item-actions">
                      <div className="quantity-controls">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="qty-btn"
                        >
                          -
                        </button>
                        <span className="qty-display">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="qty-btn"
                        >
                          +
                        </button>
                      </div>

                      <div className="action-buttons">
                        <button 
                          onClick={() => handleSaveForLater(item)}
                          className="action-btn save-btn"
                        >
                          💾 Save for Later
                        </button>
                        <button 
                          onClick={() => handleMoveToWishlist(item)}
                          className="action-btn wishlist-btn"
                        >
                          ❤️ Move to Wishlist
                        </button>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="action-btn remove-btn"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right Column - Order Summary */}
            <div className="order-summary-section">
              <div className="order-summary-card">
                <h2>Order Summary</h2>

                {/* Coupon Section */}
                <div className="coupon-section">
                  <h3>Apply Coupon</h3>
                  {!appliedCoupon ? (
                    <div className="coupon-input-group">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code"
                        className="coupon-input"
                      />
                      <button onClick={handleApplyCoupon} className="apply-btn">
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="applied-coupon">
                      <span className="coupon-badge">
                        🎉 {appliedCoupon.code} Applied
                      </span>
                      <button onClick={handleRemoveCoupon} className="remove-coupon-btn">
                        ×
                      </button>
                    </div>
                  )}
                  <div className="available-coupons">
                    <p>Available Coupons:</p>
                    {availableCoupons.map(coupon => (
                      <div 
                        key={coupon.code} 
                        className="coupon-badge-small"
                        onClick={() => {
                          setCouponCode(coupon.code)
                          handleApplyCoupon()
                        }}
                      >
                        {coupon.code}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal().toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  {appliedCoupon && (
                    <div className="price-row discount">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span className="discount-amount">-₹{calculateDiscount().toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  
                  <div className="price-row">
                    <span>Shipping</span>
                    <span className={calculateShipping() === 0 ? 'free-shipping' : ''}>
                      {calculateShipping() === 0 ? 'FREE' : `₹${calculateShipping()}`}
                    </span>
                  </div>
                  
                  <div className="price-row">
                    <span>Tax (5%)</span>
                    <span>₹{calculateTax().toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                  
                  <div className="price-row total">
                    <span>Total</span>
                    <span>₹{calculateTotal().toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                {calculateSubtotal() < 500 && (
                  <div className="free-shipping-alert">
                    Add ₹{(500 - calculateSubtotal()).toFixed(2)} more for FREE shipping! 🚚
                  </div>
                )}

                <button 
                  onClick={() => navigate('/checkout')}
                  className="checkout-btn"
                >
                  Proceed to Checkout
                </button>

                <div className="security-badges">
                  <span>🔒 Secure Checkout</span>
                  <span>✓ 100% Safe & Secure</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved for Later Section */}
        {savedForLater.length > 0 && (
          <div className="saved-for-later-section">
            <h2>Saved for Later ({savedForLater.length})</h2>
            <div className="saved-items-grid">
              {savedForLater.map(item => (
                <div key={item.id} className="saved-item">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    onClick={() => navigate(`/product/${item.id}`)}
                  />
                  <div className="saved-item-info">
                    <h4 onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h4>
                    <p className="saved-item-price">{item.price}</p>
                    <div className="saved-item-actions">
                      <button 
                        onClick={() => handleMoveToCart(item)}
                        className="move-to-cart-btn"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => {
                          const updated = savedForLater.filter(i => i.id !== item.id)
                          setSavedForLater(updated)
                          localStorage.setItem('savedForLater', JSON.stringify(updated))
                        }}
                        className="delete-saved-btn"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommended Products Section */}
        {cartItems.length > 0 && (
          <div className="recommended-section">
            <h2>You May Also Like</h2>
            <div className="recommended-products-grid">
              {recommendedProducts.map(product => {
                const price = parsePrice(product.price)
                return (
                  <div key={product.id} className="recommended-product">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    <div className="recommended-product-info">
                      <h4 onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h4>
                      <p className="recommended-product-price">₹{price.toLocaleString('en-IN')}</p>
                      <div className="recommended-rating">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                        <span>({product.reviews})</span>
                      </div>
                      <button 
                        onClick={() => addRecommendedToCart(product)}
                        className="add-recommended-btn"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
