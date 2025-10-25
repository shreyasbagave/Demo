import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrderById, me } from '../../api'
import HeaderBar from '../../components/HeaderBar.jsx'
import './OrderSuccess.css'

export default function OrderSuccess() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch user data
        const token = localStorage.getItem('token')
        if (!token) {
          console.log('No token found, redirecting to login')
          navigate('/')
          return
        }
        const userResponse = await me(token)
        setUser(userResponse.user)
        
        // Fetch order data
        const orderResponse = await getOrderById({ token, orderId })
        setOrder(orderResponse.order)
        
      } catch (error) {
        console.error('Error fetching data:', error)
        navigate('/marketplace')
      } finally {
        setLoading(false)
      }
    }
    
    if (orderId) {
      fetchData()
    } else {
      navigate('/marketplace')
    }
  }, [orderId, navigate])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b'
      case 'confirmed': return '#059669'
      case 'shipped': return '#3b82f6'
      case 'delivered': return '#059669'
      case 'cancelled': return '#dc2626'
      default: return '#6b7280'
    }
  }

  if (loading) {
    return (
      <div className="order-success-container">
        <HeaderBar />
        <div className="order-success-loading">
          <div className="loading-spinner"></div>
          <p>Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="order-success-container">
        <HeaderBar />
        <div className="order-not-found">
          <h2>Order not found</h2>
          <p>The order you're looking for doesn't exist.</p>
          <button onClick={() => navigate('/marketplace')}>
            Go to Marketplace
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="order-success-container">
      <HeaderBar />
      
      <div className="order-success-content">
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <div className="order-details">
          <div className="order-info-card">
            <h2>Order Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Order ID:</label>
                <span className="order-id">#{order._id.slice(-8).toUpperCase()}</span>
              </div>
              
              <div className="info-item">
                <label>Order Date:</label>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              
              <div className="info-item">
                <label>Status:</label>
                <span 
                  className="order-status"
                  style={{ color: getOrderStatusColor(order.status) }}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="info-item">
                <label>Payment Method:</label>
                <span>{order.paymentMethod.toUpperCase()}</span>
              </div>
              
              <div className="info-item">
                <label>Total Amount:</label>
                <span className="total-amount">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="shipping-info-card">
            <h2>Shipping Information</h2>
            <div className="shipping-details">
              <div className="shipping-address">
                <strong>{order.shippingInfo.fullName}</strong>
                <p>{order.shippingInfo.address}</p>
                <p>{order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}</p>
                <p>{order.shippingInfo.country}</p>
                <p>📞 {order.shippingInfo.phone}</p>
                <p>📧 {order.shippingInfo.email}</p>
              </div>
            </div>
          </div>

          <div className="order-items-card">
            <h2>Order Items</h2>
            <div className="items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-image">
                    <img 
                      src={item.product.image || 'https://via.placeholder.com/80x80?text=No+Image'} 
                      alt={item.product.name}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=Image+Failed'
                      }}
                    />
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.product.name}</h3>
                    <p className="item-category">{item.product.category}</p>
                    <p className="item-quantity">Quantity: {item.quantity}</p>
                  </div>
                  
                  <div className="item-price">
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    <small>₹{item.price.toFixed(2)} each</small>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-summary">
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{order.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping:</span>
                <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping.toFixed(2)}`}</span>
              </div>
              
              <div className="summary-row total-row">
                <span>Total:</span>
                <span>₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="success-actions">
          <button 
            className="track-order-btn"
            onClick={() => navigate('/orders')}
          >
            Track Your Orders
          </button>
          
          <button 
            className="continue-shopping-btn"
            onClick={() => navigate('/marketplace')}
          >
            Continue Shopping
          </button>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-list">
            <div className="step">
              <div className="step-icon">📧</div>
              <div className="step-content">
                <h4>Order Confirmation</h4>
                <p>You'll receive an email confirmation shortly</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">📦</div>
              <div className="step-content">
                <h4>Processing</h4>
                <p>We'll prepare your order for shipment</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">🚚</div>
              <div className="step-content">
                <h4>Shipping</h4>
                <p>Your order will be shipped within 2-3 business days</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-icon">🏠</div>
              <div className="step-content">
                <h4>Delivery</h4>
                <p>Expected delivery in 5-7 business days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
