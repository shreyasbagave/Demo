import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '../../components/HeaderBar.jsx'

export default function Wishlist() {
  const navigate = useNavigate()
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== productId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

  const addToCart = (product) => {
    // Add to cart
    const savedCart = localStorage.getItem('cart')
    const cart = savedCart ? JSON.parse(savedCart) : []
    
    const existingItemIndex = cart.findIndex(item => item.id === product.id)
    
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`${product.name} added to cart!`)
  }

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <HeaderBar />
      
      <div style={{
        background: '#fff',
        borderBottom: '1px solid #e5e7eb',
        padding: '12px 0',
        position: 'sticky',
        top: '70px',
        zIndex: 40,
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate('/marketplace')}
              style={{
                padding: '8px 14px',
                background: '#f3f4f6',
                color: '#111827',
                border: '1px solid #e5e7eb',
                borderRadius: '10px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              ← Back to Marketplace
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '24px' }}>My Wishlist ❤️</h1>
          
          {wishlistItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>❤️</div>
              <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Your wishlist is empty</h2>
              <button
                onClick={() => navigate('/marketplace')}
                style={{
                  padding: '12px 24px',
                  background: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'}
                    alt={item.name}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=Image+Failed'
                    }}
                  />
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '8px' }}>{item.category}</p>
                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#059669' }}>
                      {item.price}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        padding: '10px 20px',
                        background: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      🛒 Add to Cart
                    </button>
                    
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      style={{
                        padding: '10px 20px',
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Remove
                    </button>
                    
                    <button
                      onClick={() => navigate(`/product/${item.id}`)}
                      style={{
                        padding: '10px 20px',
                        background: '#f3f4f6',
                        color: '#111827',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

