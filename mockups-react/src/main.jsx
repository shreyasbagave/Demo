import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppPrototype from './App-Prototype.jsx'
import Marketplace from './components/Marketplace.jsx'
import ProductDetails from './pages/ProductDetails/ProductDetails.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Checkout from './pages/Checkout/Checkout.jsx'
import OrderSuccess from './pages/OrderSuccess/OrderSuccess.jsx'
import FarmOnboarding from './pages/FarmOnboarding/FarmOnboarding.jsx'
import Services from './pages/Services/Services.jsx'
import ServicesDiseaseDetection from './pages/ServicesDiseaseDetection/ServicesDiseaseDetection.jsx'
import FarmerDashboard from './pages/FarmerDashboard/FarmerDashboard.jsx'
import DairyDashboard from './pages/DairyDashboard/DairyDashboard.jsx'
import MSMEDashboard from './pages/MSMEDashboard/MSMEDashboard.jsx'
import SupplierProducts from './pages/SupplierProducts/SupplierProducts.jsx'
import Wishlist from './pages/Wishlist/Wishlist.jsx'
import './index.css'
import './App.css'

// PROTOTYPE MODE: No auth guards, all routes accessible

const rootElement = document.getElementById('root')
createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppPrototype />} />
        <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
        <Route path="/dashboard/dairy" element={<DairyDashboard />} />
        <Route path="/dashboard/msme" element={<MSMEDashboard />} />
        <Route path="/dashboard/supplier" element={<MSMEDashboard />} />
        <Route path="/supplier/products" element={<SupplierProducts />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId?" element={<OrderSuccess />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/disease-detection" element={<ServicesDiseaseDetection />} />
        <Route path="/onboarding/farm" element={<FarmOnboarding />} />
        <Route path="*" element={<AppPrototype />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

