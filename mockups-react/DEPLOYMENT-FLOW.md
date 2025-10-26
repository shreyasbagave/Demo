# 🎯 Deployment Flow - Dashboard Hub

## Your Application Flow on Render

```
┌────────────────────────────────────────────────────┐
│  Step 1: Entry Point                               │
│  URL: yoursite.onrender.com/                       │
│                                                    │
│  ┌──────────────────────────────────────┐         │
│  │   LOGIN / SIGNUP PAGE                │         │
│  │                                      │         │
│  │   [Login]  [Signup]  ← Toggle       │         │
│  │                                      │         │
│  │   4 Authentication Methods:         │         │
│  │   • Username/Password                │         │
│  │   • Agristack ID                     │         │
│  │   • Magic Link                       │         │
│  │   • Aadhaar eKYC                     │         │
│  │                                      │         │
│  │   [Login Button]                     │         │
│  │                                      │         │
│  │   🎨 No validation required          │         │
│  └──────────────────────────────────────┘         │
└────────────────────────────────────────────────────┘
                      ↓
                Click "Login"
                      ↓
┌────────────────────────────────────────────────────┐
│  Step 2: Dashboard (Central Hub)                   │
│  URL: yoursite.onrender.com/dashboard/farmer       │
│                                                    │
│  ┌──────────────────────────────────────┐         │
│  │   HEADER BAR (On all pages)         │         │
│  │                                      │         │
│  │   🧩 Services    🛒 Marketplace      │         │
│  │   🔄 Toggle      🛍️ Cart  ❤️ Wishlist│         │
│  │   👤 Profile                         │         │
│  └──────────────────────────────────────┘         │
│                                                    │
│  ┌──────────────────────────────────────┐         │
│  │   DASHBOARD CONTENT                  │         │
│  │                                      │         │
│  │   Welcome Card                       │         │
│  │   • User info                        │         │
│  │   • AgriStack ID                     │         │
│  │   • Farm selector                    │         │
│  │                                      │         │
│  │   KPI Cards:                         │         │
│  │   [Moisture] [Irrigation]            │         │
│  │   [Leaf Wetness] [CBAM]              │         │
│  │                                      │         │
│  │   Charts & Analytics                 │         │
│  └──────────────────────────────────────┘         │
└────────────────────────────────────────────────────┘
                      ↓
            Click any navigation
                      ↓
┌────────────────────────────────────────────────────┐
│  All Pages Connected                               │
│                                                    │
│  From Header Bar:                                  │
│  ├─ 🧩 Services → /services                       │
│  ├─ 🛒 Marketplace → /marketplace                 │
│  ├─ 🛍️ Cart → /cart                               │
│  ├─ ❤️ Wishlist → /wishlist                       │
│  ├─ 🔄 Toggle → /dashboard/supplier               │
│  └─ 👤 Profile → /onboarding/farm                 │
│                                                    │
│  From Marketplace:                                 │
│  └─ Product → /product/:id                        │
│       └─ Checkout → /checkout                     │
│           └─ Success → /order-success             │
│                                                    │
│  From Services:                                    │
│  └─ Disease Detection → /services/disease-detection│
└────────────────────────────────────────────────────┘
```

---

## All Paths for Render (Absolute URLs)

### Entry & Dashboard:
✅ `/` → Login/Signup Page  
✅ `/dashboard/farmer` → Farmer Dashboard (Hub)  
✅ `/dashboard/dairy` → Dairy Dashboard  
✅ `/dashboard/msme` → MSME Dashboard  
✅ `/dashboard/supplier` → Supplier Dashboard  

### Shopping & Products:
✅ `/marketplace` → Product Listing  
✅ `/product/:id` → Product Details  
✅ `/cart` → Shopping Cart  
✅ `/checkout` → Checkout Page  
✅ `/order-success/:id` → Order Confirmation  
✅ `/wishlist` → Saved Products  

### Services:
✅ `/services` → Services Hub  
✅ `/services/disease-detection` → AI Diagnosis  

### Management:
✅ `/onboarding/farm` → Farm Registration  
✅ `/supplier/products` → Product Management  

---

## Navigation Matrix

| From Page | To Page | Via |
|-----------|---------|-----|
| **Login** → | Dashboard | Login button |
| **Dashboard** → | Marketplace | Header button |
| **Dashboard** → | Services | Header button |
| **Dashboard** → | Cart | Header icon |
| **Dashboard** → | Wishlist | Header icon |
| **Dashboard** → | Farm Onboarding | Profile menu |
| **Dashboard** → | Supplier View | Toggle switch |
| **Marketplace** → | Product Details | Product card |
| **Product** → | Cart | Add to cart button |
| **Cart** → | Checkout | Checkout button |
| **Checkout** → | Order Success | Complete order |
| **Services** → | Disease Detection | Service card |
| **Any Page** → | Dashboard | Header logo |
| **Any Page** → | Login | Logout button |

---

## Deploy Command

```bash
git add .
git commit -m "Dashboard-centric navigation ready for Render"
git push origin main
```

**Then on Render:**
1. Create new Static Site
2. Connect repository
3. Auto-detects `render.yaml`
4. Deploy!

**Your site will be live at:**
```
https://your-site-name.onrender.com/
```

Start at login → Dashboard becomes your central hub → All pages accessible! 🚀

