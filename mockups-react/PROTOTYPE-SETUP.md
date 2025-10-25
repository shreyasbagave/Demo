# 🎨 AgriStack Prototype Setup

## What is This?

This is a **visual flow prototype** of your AgriStack application - showing the complete user journey **WITHOUT any backend/API dependencies**.

---

## 🚀 Quick Start

### Current Setup (With Backend)
Your app currently uses: `src/main.jsx`

### Prototype Mode (No Backend)  
To run as a pure mockup prototype:

### Option 1: Temporarily Switch to Prototype

1. **Rename files:**
```bash
cd mockups-react/src
mv main.jsx main-original.jsx
mv main-prototype.jsx main.jsx
```

2. **Run the app:**
```bash
npm run dev
```

3. **To switch back:**
```bash
mv main.jsx main-prototype.jsx
mv main-original.jsx main.jsx
```

---

### Option 2: Use Vite Config (Recommended)

Update `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  // Toggle between prototype and full app
  resolve: {
    alias: {
      './main.jsx': process.env.PROTOTYPE 
        ? './main-prototype.jsx' 
        : './main.jsx'
    }
  }
})
```

Then run:
```bash
# Prototype mode
PROTOTYPE=true npm run dev

# Full app mode
npm run dev
```

---

## 📱 Complete Flow Map

### 🔐 Login Flow
```
Login Page (/)
  ↓ Click "Login"
  ↓ (No authentication - direct navigation)
Farmer Dashboard ✅
```

### 👨‍🌾 Farmer Journey
```
Farmer Dashboard (/dashboard/farmer)
  ├→ Click "Marketplace" → Browse products
  ├→ Click "Services" → Services hub
  ├→ Click "+ Add Farm" → Farm onboarding
  └→ Header Icons:
      ├→ Profile → Logout/Settings
      └→ Toggle → Switch to MSME view
```

### 🛒 Shopping Flow
```
Marketplace (/marketplace)
  ↓ Click product card
Product Details (/product/:id)
  ↓ Click "Add to Cart"
Shopping Cart (/cart)
  ↓ Click "Proceed to Checkout"
Checkout (/checkout)
  ↓ Click "Place Order"
Order Success ✅
```

### 🔬 Services Flow
```
Services (/services)
  ↓ Click "Disease Detection"
Disease Detection (/services/disease-detection)
  ↓ Upload image (simulated)
  ↓ View results
Back to Dashboard
```

### 🏭 Supplier Journey
```
MSME Dashboard (/dashboard/msme)
  ├→ View orders
  ├→ Click "Manage Products" → Product management
  └→ Toggle → Switch back to Farmer view
```

---

## 🎯 What's Different in Prototype Mode?

### ❌ Removed:
- API calls (`api.js` functions)
- Authentication guards
- Backend validation
- Network requests
- Token verification
- Error handling for API failures

### ✅ Added:
- Mock localStorage data
- Direct navigation on button clicks
- Fake user data for display
- "PROTOTYPE" badge on all pages
- No-op for backend operations

---

## 📁 File Changes

### New Files:
- `src/App-Prototype.jsx` - Login without API
- `src/main-prototype.jsx` - Router without auth guards
- `PROTOTYPE-SETUP.md` - This file

### Modified Files (for prototype):
None! Your original files stay intact.

---

## 🔄 Switching Between Modes

| Feature | Full App (`main.jsx`) | Prototype (`main-prototype.jsx`) |
|---------|----------------------|----------------------------------|
| Authentication | ✅ Real API calls | ❌ Mock only |
| Auth Guards | ✅ Token required | ❌ Open access |
| User Data | ✅ From backend | ❌ Hardcoded |
| Navigation | ✅ Protected routes | ✅ All accessible |
| Purpose | Production | Demo/Testing |

---

## 🎨 Testing the Prototype

1. **Start at Login** (`http://localhost:3000`)
2. **Click "Login"** (no credentials needed)
3. **Explore Farmer Dashboard**
4. **Click "Marketplace"** → Browse products
5. **Click any product** → See details
6. **Add to Cart** → View cart
7. **Checkout** → Complete flow
8. **Try Services** → Disease detection
9. **Toggle** → Switch to MSME view

---

## 💡 Use Cases

### For Designers:
- See complete user journey
- Test navigation flows
- Validate UX decisions

### For Stakeholders:
- Demo the product vision
- Provide feedback on flow
- Understand features

### For Developers:
- Reference UI implementation
- Understand component structure
- Test without backend

---

## ⚠️ Important Notes

1. **Data Persistence**: None - refresh resets everything
2. **No Validation**: Forms accept any input
3. **Mock Responses**: All "API" calls are instant
4. **Routes**: All accessible without login
5. **State**: Minimal - just for UI demonstration

---

## 🔧 Customization

### Change Default User:
Edit `App-Prototype.jsx` line 17:
```js
localStorage.setItem('user', JSON.stringify({
  username: 'Your Name',  // Change this
  email: 'your@email.com',  // And this
  agristackId: 'AS-CUSTOM-ID',  // And this
  role: 'farmer'  // farmer, dairy, or msme
}))
```

### Change Landing Dashboard:
Edit `App-Prototype.jsx` line 24:
```js
navigate('/dashboard/farmer')  // Change to /dairy or /msme
```

---

## 🚀 Ready!

Your prototype is ready to demonstrate the complete AgriStack flow without any backend dependencies!

**Questions?** Check the main `README.md` or `FLOW.md` files.

