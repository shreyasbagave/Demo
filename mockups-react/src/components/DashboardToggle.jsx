import React from 'react'
import './DashboardToggle.css'

export default function DashboardToggle({ currentView, onToggle }) {
  const isSupplierMode = currentView === 'supplier'
  
  return (
    <div className="dashboard-toggle-container">
      <div className="dashboard-toggle-wrapper">
        <div className="toggle-switch" onClick={() => onToggle(isSupplierMode ? 'farmer' : 'supplier')}>
          <div className={`toggle-track ${isSupplierMode ? 'active' : ''}`}>
            <div className={`toggle-thumb ${isSupplierMode ? 'active' : ''}`}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
