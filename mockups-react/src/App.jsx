import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'

export default function AppPrototype() {
  const navigate = useNavigate()
  const [isSignup, setIsSignup] = useState(false)
  const [activeTab, setActiveTab] = useState('credentials')
  
  // PROTOTYPE: Simplified - no validation, direct navigation
  const handleLogin = (e) => {
    e.preventDefault()
    // Mock login - store fake data for prototype
    localStorage.setItem('token', 'prototype-token-123')
    localStorage.setItem('userRole', 'farmer')
    localStorage.setItem('user', JSON.stringify({
      username: 'Demo Farmer',
      email: 'farmer@demo.com',
      agristackId: 'AS-12345-DEMO',
      role: 'farmer'
    }))
    
    // Navigate to farmer dashboard
    navigate('/dashboard/farmer')
  }
  
  const handleSignup = (e) => {
    e.preventDefault()
    // Same as login for prototype
    handleLogin(e)
  }

  const resetForm = () => {
    // No-op for prototype
  }

  const toggleMode = () => {
    setIsSignup(!isSignup)
    resetForm()
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    resetForm()
  }

  return (
    <div className="app-container">
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#fef3c7',
        border: '2px solid #f59e0b',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#92400e',
        zIndex: 1000
      }}>
        📐 PROTOTYPE - Visual Flow Only
      </div>
      
      <div className="login-card">
        <h1 className="login-title">
          {isSignup ? 'AgriStack Signup' : 'AgriStack Login'}
        </h1>
        
        {/* Toggle between Login and Signup */}
        <div className="mode-toggle">
          <button 
            className={`toggle-btn ${!isSignup ? 'active' : ''}`}
            onClick={() => !isSignup || toggleMode()}
          >
            Login
          </button>
          <button 
            className={`toggle-btn ${isSignup ? 'active' : ''}`}
            onClick={() => isSignup || toggleMode()}
          >
            Signup
          </button>
        </div>

        {/* Authentication Method Tabs (only for login) */}
        {!isSignup && (
          <div className="tab-container">
            <button 
              className={`tab ${activeTab === 'credentials' ? 'active' : ''}`}
              onClick={() => handleTabChange('credentials')}
            >
              Username/Password
            </button>
            <button 
              className={`tab ${activeTab === 'agristack' ? 'active' : ''}`}
              onClick={() => handleTabChange('agristack')}
            >
              Agristack ID
            </button>
            <button 
              className={`tab ${activeTab === 'magiclink' ? 'active' : ''}`}
              onClick={() => handleTabChange('magiclink')}
            >
              Magic Link
            </button>
            <button 
              className={`tab ${activeTab === 'aadhaar' ? 'active' : ''}`}
              onClick={() => handleTabChange('aadhaar')}
            >
              Aadhaar eKYC
            </button>
          </div>
        )}

        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          {/* Role Selection (only for signup) */}
          {isSignup && (
            <div className="form-group">
              <label className="label" htmlFor="role">Role</label>
              <select id="role" className="input">
                <option value="" disabled>Select role</option>
                <option value="farmer">Farmer</option>
                <option value="dairy">Dairy Farmer</option>
                <option value="msme">MSME</option>
              </select>
            </div>
          )}

          {/* Username/Password Login */}
          {(!isSignup && activeTab === 'credentials') && (
            <>
              <div className="form-group">
                <label className="label" htmlFor="username">Username/Email</label>
                <input
                  id="username"
                  className="input"
                  type="text"
                  placeholder="Enter any value (prototype)"
                  defaultValue="demo@agristack.com"
                />
              </div>
              <div className="form-group">
                <label className="label" htmlFor="password">Password</label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  placeholder="Enter any value (prototype)"
                  defaultValue="demo123"
                />
              </div>
            </>
          )}

          {/* Agristack ID Login */}
          {(!isSignup && activeTab === 'agristack') && (
            <div className="form-group">
              <label className="label" htmlFor="agristackId">Agristack ID</label>
              <input
                id="agristackId"
                className="input"
                type="text"
                placeholder="Enter your Agristack ID"
              />
              <p className="helper-text">🎨 Prototype: Enter any value</p>
            </div>
          )}

          {/* Magic Link Login */}
          {(!isSignup && activeTab === 'magiclink') && (
            <div className="form-group">
              <label className="label" htmlFor="email">Email Address</label>
              <input
                id="email"
                className="input"
                type="email"
                placeholder="Enter your email address"
              />
              <p className="helper-text">🎨 Prototype: Enter any value</p>
            </div>
          )}

          {/* Aadhaar eKYC Login */}
          {(!isSignup && activeTab === 'aadhaar') && (
            <div className="form-group">
              <label className="label" htmlFor="aadhaarNumber">Aadhaar Number</label>
              <input
                id="aadhaarNumber"
                className="input"
                type="text"
                placeholder="Enter 12-digit Aadhaar number"
                maxLength="12"
              />
              <p className="helper-text">🎨 Prototype: Enter any value</p>
            </div>
          )}

          {/* Signup Form Fields */}
          {isSignup && (
            <>
              <div className="form-group">
                <label className="label" htmlFor="username">Username</label>
                <input
                  id="username"
                  className="input"
                  type="text"
                  placeholder="Enter username"
                />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="email">Email Address</label>
                <input
                  id="email"
                  className="input"
                  type="email"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="password">Password</label>
                <input
                  id="password"
                  className="input"
                  type="password"
                  placeholder="Enter password"
                />
              </div>

              <div className="form-group">
                <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  className="input"
                  type="password"
                  placeholder="Confirm password"
                />
              </div>
            </>
          )}

          <div style={{
            background: '#dbeafe',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '14px', color: '#1e40af', fontWeight: '600' }}>
              🎨 PROTOTYPE MODE
            </p>
            <p style={{ fontSize: '12px', color: '#1e40af', marginTop: '4px' }}>
              Click "{isSignup ? 'Sign Up' : 'Login'}" to see the dashboard flow - No authentication required
            </p>
          </div>

          <div className="actions">
            <button 
              className="button primary" 
              type="submit"
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </button>
          </div>
        </form>

        <p className="helper">
          {isSignup 
            ? '🎨 Prototype: Click Sign Up to explore the platform' 
            : '🎨 Prototype: Click Login to explore the platform'
          }
        </p>
      </div>
    </div>
  )
}

