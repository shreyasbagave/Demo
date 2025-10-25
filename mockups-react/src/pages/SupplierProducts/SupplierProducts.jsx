import React, { useEffect } from 'react'
import HeaderBar from '../../components/HeaderBar.jsx'
import ProductManagement from '../../components/ProductManagement.jsx'
import './SupplierProducts.css'

export default function SupplierProducts() {
  // Ensure the dashboard view is set to supplier when on this page
  useEffect(() => {
    localStorage.setItem('dashboardView', 'supplier')
  }, [])

  return (
    <div className="supplier-products-container">
      <HeaderBar />
      <div className="supplier-products-content">
        <div className="supplier-products-header">
          <div className="supplier-products-title">
            <h1>My Products</h1>
            <p>Manage your product inventory and listings - Available for farmers and suppliers</p>
          </div>
          <div className="supplier-products-actions">
            <button 
              className="back-to-dashboard-btn"
              onClick={() => window.location.href = '/dashboard/supplier'}
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
        
        <ProductManagement />
      </div>
    </div>
  )
}
