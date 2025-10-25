import UserProfile from '../../components/UserProfile.jsx'
import HeaderBar from '../../components/HeaderBar.jsx'
import React, { useEffect } from 'react'
import './MSMEDashboard.css'

export default function MSMEDashboard() {
  // Ensure the dashboard view is set to supplier when on this page
  useEffect(() => {
    localStorage.setItem('dashboardView', 'supplier')
  }, [])
  return (
    <div className="msme-dashboard-container">
      <HeaderBar />
      <div className="msme-dashboard-content">
        {/* Welcome Card */}
        <div className="supplier-welcome-card">
          <div className="supplier-welcome-header">
            <div className="supplier-welcome-info">
              <div className="supplier-welcome-label">Welcome</div>
              <div className="supplier-welcome-name">{(JSON.parse(localStorage.getItem('user')||'{}').username)||'Supplier'}</div>
              <div className="supplier-welcome-id">AgriStack ID: {JSON.parse(localStorage.getItem('user')||'{}').agristackId || '—'}</div>
            </div>
            <div className="supplier-status-indicator">
              <div className="supplier-status-label">Business Status</div>
              <div className="supplier-status-badge active">Active</div>
            </div>
          </div>
          <div className="supplier-controls">
            <div className="supplier-business-info">
              <div className="supplier-business-label">Business Type</div>
              <div className="supplier-business-name">Agricultural Supplies & Equipment</div>
              <div className="supplier-business-details">Registered MSME • GST Compliant</div>
            </div>
            <button className="supplier-add-product-button">+ Add Product</button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="supplier-kpi-grid">
          {[{
            title: 'Total Products', value: '24', delta: '+3', color: '#10b981'
          },{
            title: 'Orders Today', value: '12', delta: '+2', color: '#0ea5e9'
          },{
            title: 'Revenue (₹)', value: '45,600', delta: '+8.5%', color: '#f59e0b'
          },{
            title: 'Customer Rating', value: '4.8', delta: '+0.2', color: '#22c55e'
          }].map(card => (
            <div key={card.title} className="supplier-kpi-card">
              <div className="supplier-kpi-title">{card.title}</div>
              <div className="supplier-kpi-value">{card.value}</div>
              <div className={`supplier-kpi-delta ${card.delta.startsWith('+') ? 'supplier-kpi-delta-positive' : 'supplier-kpi-delta-negative'}`}>{card.delta}</div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="supplier-orders-container">
          <div className="supplier-orders-title">Recent Orders</div>
          <div className="supplier-orders-list">
            {[
              { id: 'ORD-001', customer: 'Rajesh Kumar', product: 'Fertilizer Mix', amount: '₹2,400', status: 'Processing' },
              { id: 'ORD-002', customer: 'Priya Sharma', product: 'Seeds Pack', amount: '₹1,800', status: 'Shipped' },
              { id: 'ORD-003', customer: 'Amit Patel', product: 'Irrigation Kit', amount: '₹5,200', status: 'Delivered' }
            ].map(order => (
              <div key={order.id} className="supplier-order-item">
                <div className="supplier-order-info">
                  <div className="supplier-order-id">{order.id}</div>
                  <div className="supplier-order-customer">{order.customer}</div>
                  <div className="supplier-order-product">{order.product}</div>
                </div>
                <div className="supplier-order-amount">{order.amount}</div>
                <div className={`supplier-order-status ${order.status.toLowerCase()}`}>{order.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="supplier-actions-container">
          <div className="supplier-actions-title">Quick Actions</div>
          <div className="supplier-actions-grid">
            <button 
              className="supplier-action-btn"
              onClick={() => window.location.href = '/supplier/products'}
            >
              <span className="supplier-action-icon">📦</span>
              My Products
            </button>
            <button className="supplier-action-btn">
              <span className="supplier-action-icon">📊</span>
              View Analytics
            </button>
            <button className="supplier-action-btn">
              <span className="supplier-action-icon">💰</span>
              Payment History
            </button>
            <button className="supplier-action-btn">
              <span className="supplier-action-icon">📞</span>
              Customer Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
