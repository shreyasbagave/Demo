import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCart, me, createOrder } from '../../api'
import HeaderBar from '../../components/HeaderBar.jsx'
import { getAllProductImages } from '../../data/productImages.js'
import './Checkout.css'

export default function Checkout() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  
  // Helper function to parse price correctly from any format
  const parsePrice = (priceString) => {
    if (!priceString) return 0
    // Remove all non-numeric characters except dots and commas
    // Then remove commas and convert to float
    const cleaned = priceString.toString().replace(/[^\d.,]/g, '').replace(/,/g, '')
    return parseFloat(cleaned) || 0
  }
  
  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  })
  
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true)
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Get user data from localStorage
        const userData = localStorage.getItem('user')
        if (userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          
          // Pre-fill shipping info with user data
          setShippingInfo(prev => ({
            ...prev,
            fullName: parsedUser.username || '',
            email: parsedUser.email || '',
          }))
        }
        
        // Load cart from localStorage
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          
          // Update cart items with latest product data from source
          const allProducts = getAllProductImages()
          const updatedCart = parsedCart.map(cartItem => {
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
          
          if (updatedCart.length === 0) {
            navigate('/cart')
          }
        } else {
          navigate('/cart')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [navigate])

  const handleShippingChange = (field, value) => {
    setShippingInfo(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-fill billing if same as shipping
    if (billingSameAsShipping) {
      setBillingInfo(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleBillingChange = (field, value) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parsePrice(item.price)
      return total + (price * item.quantity)
    }, 0)
  }

  const calculateShipping = () => {
    const subtotal = calculateSubtotal()
    return subtotal > 500 ? 0 : 50
  }

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping()
  }

  const validateForm = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'pincode']
    
    for (const field of requiredFields) {
      if (!shippingInfo[field].trim()) {
        alert(`Please fill in the ${field} field`)
        return false
      }
    }
    
    if (!billingSameAsShipping) {
      for (const field of requiredFields) {
        if (!billingInfo[field].trim()) {
          alert(`Please fill in the billing ${field} field`)
          return false
        }
      }
    }
    
    return true
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) return
    
    try {
      setProcessing(true)
      
      const orderData = {
        items: cartItems.map(item => ({
          product: item.id,
          name: item.name,
          quantity: item.quantity,
          price: parsePrice(item.price)
        })),
        shippingInfo,
        billingInfo: billingSameAsShipping ? shippingInfo : billingInfo,
        paymentMethod,
        subtotal: calculateSubtotal(),
        shipping: calculateShipping(),
        total: calculateTotal(),
        orderNumber: 'ORD-' + Date.now()
      }
      
      // Save order to localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.push(orderData)
      localStorage.setItem('orders', JSON.stringify(orders))
      
      // Clear cart
      localStorage.setItem('cart', JSON.stringify([]))
      
      // Navigate to success page
      navigate('/order-success')
      
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="checkout-container">
        <HeaderBar />
        <div className="checkout-loading">
          <div className="loading-spinner"></div>
          <p>Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <HeaderBar />
      
      <div className="checkout-content">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your purchase</p>
        </div>

        <div className="checkout-layout">
          <div className="checkout-form">
            {/* Shipping Information */}
            <div className="form-section">
              <h2>Shipping Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) => handleShippingChange('fullName', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => handleShippingChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => handleShippingChange('phone', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group full-width">
                  <label>Address *</label>
                  <textarea
                    value={shippingInfo.address}
                    onChange={(e) => handleShippingChange('address', e.target.value)}
                    rows="3"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => handleShippingChange('city', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => handleShippingChange('state', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    value={shippingInfo.pincode}
                    onChange={(e) => handleShippingChange('pincode', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Country</label>
                  <input
                    type="text"
                    value={shippingInfo.country}
                    onChange={(e) => handleShippingChange('country', e.target.value)}
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="form-section">
              <h2>Billing Information</h2>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={billingSameAsShipping}
                    onChange={(e) => setBillingSameAsShipping(e.target.checked)}
                  />
                  Same as shipping address
                </label>
              </div>
              
              {!billingSameAsShipping && (
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={billingInfo.fullName}
                      onChange={(e) => handleBillingChange('fullName', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Email *</label>
                    <input
                      type="email"
                      value={billingInfo.email}
                      onChange={(e) => handleBillingChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Phone *</label>
                    <input
                      type="tel"
                      value={billingInfo.phone}
                      onChange={(e) => handleBillingChange('phone', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <label>Address *</label>
                    <textarea
                      value={billingInfo.address}
                      onChange={(e) => handleBillingChange('address', e.target.value)}
                      rows="3"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      value={billingInfo.city}
                      onChange={(e) => handleBillingChange('city', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      value={billingInfo.state}
                      onChange={(e) => handleBillingChange('state', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Pincode *</label>
                    <input
                      type="text"
                      value={billingInfo.pincode}
                      onChange={(e) => handleBillingChange('pincode', e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💳 Credit/Debit Card</span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>📱 UPI Payment</span>
                </label>
                
                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>💰 Cash on Delivery</span>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <div className="item-image">
                      <img 
                        src={item.image || 'https://via.placeholder.com/60x60?text=No+Image'} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60?text=Image+Failed'
                        }}
                      />
                    </div>
                    <div className="item-details">
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="item-price">
                      ₹{(parsePrice(item.price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="summary-totals">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>
                    {calculateShipping() === 0 ? 'Free' : `₹${calculateShipping()}`}
                  </span>
                </div>
                
                <div className="summary-row total-row">
                  <span>Total:</span>
                  <span>₹{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <button 
                className="place-order-btn"
                onClick={handlePlaceOrder}
                disabled={processing}
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}