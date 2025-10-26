# 📊 Page Flow - All Pages Connected

## 🔐 Entry Point: Login Page

**URL:** `/` (Homepage)

### Login Page Features:
- Simple username/password form
- "Login to Marketplace" button
- No validation required (prototype mode)
- Click login → Navigate to Marketplace

---

## 🛒 Main Hub: Marketplace

**URL:** `/marketplace`

After login, you land on the Marketplace, which is the main hub with navigation to all pages.

### From Marketplace, you can access:

#### Via Header Bar:
- **🧩 Services** → `/services`
- **🛒 Marketplace** → Stay here
- **🌾 Farmer Dashboard** → `/dashboard/farmer`
- **📦 Supplier Dashboard** → `/dashboard/msme`
- **👤 Profile Dropdown** → User settings

#### Via Product Cards:
- **Click any product** → `/product/:id` (Product Details)

#### Via Shopping Actions:
- **Cart Icon** → `/cart`
- **❤️ Wishlist Icon** → `/wishlist`

---

## 🗺️ Complete Page Map

### 1️⃣ **Login** `/`
```
[Login Form]
    ↓
Click "Login"
    ↓
Marketplace
```

### 2️⃣ **Marketplace** `/marketplace`
```
[Product Grid]
├─ Header: Services → /services
├─ Header: Dashboard → /dashboard/farmer or /dashboard/msme
├─ Header: Cart → /cart
├─ Header: Wishlist → /wishlist
└─ Product Card → /product/:id
```

### 3️⃣ **Product Details** `/product/:id`
```
[Single Product View]
├─ "Add to Cart" → Adds to cart
├─ "Add to Wishlist" → Adds to wishlist
├─ "Back to Marketplace" → /marketplace
└─ "View Cart" → /cart
```

### 4️⃣ **Shopping Cart** `/cart`
```
[Cart Items List]
├─ "Continue Shopping" → /marketplace
├─ "Proceed to Checkout" → /checkout
├─ Remove items
└─ Update quantities
```

### 5️⃣ **Checkout** `/checkout`
```
[Checkout Form]
├─ Address & Payment info
├─ "Complete Order" → /order-success/:id
└─ "Back to Cart" → /cart
```

### 6️⃣ **Order Success** `/order-success/:id`
```
[Order Confirmation]
├─ Order details
├─ "Back to Marketplace" → /marketplace
└─ "View Orders" → Dashboard
```

### 7️⃣ **Wishlist** `/wishlist`
```
[Saved Products]
├─ View wishlist items
├─ "Add to Cart" → Moves to cart
├─ Remove from wishlist
└─ "Browse Marketplace" → /marketplace
```

### 8️⃣ **Services** `/services`
```
[Services Overview]
├─ "Disease Detection" → /services/disease-detection
├─ Other services cards
└─ "Back to Dashboard" → /dashboard/farmer
```

### 9️⃣ **Disease Detection** `/services/disease-detection`
```
[AI Diagnosis Tool]
├─ Upload crop image
├─ Get diagnosis
└─ "Back to Services" → /services
```

### 🔟 **Farmer Dashboard** `/dashboard/farmer`
```
[Farmer Portal]
├─ Farm overview
├─ Orders
├─ Analytics
├─ "Farm Onboarding" → /onboarding/farm
├─ "Services" → /services
└─ "Marketplace" → /marketplace
```

### 1️⃣1️⃣ **Dairy Dashboard** `/dashboard/dairy`
```
[Dairy Farmer Portal]
├─ Milk production tracking
├─ Orders
├─ Analytics
└─ Navigation similar to Farmer Dashboard
```

### 1️⃣2️⃣ **MSME/Supplier Dashboard** `/dashboard/msme`
```
[Supplier Portal]
├─ Inventory management
├─ Orders received
├─ "Manage Products" → /supplier/products
└─ Analytics
```

### 1️⃣3️⃣ **Supplier Products** `/supplier/products`
```
[Product Management]
├─ Add new product
├─ Edit products
├─ Delete products
├─ View inventory
└─ "Back to Dashboard" → /dashboard/msme
```

### 1️⃣4️⃣ **Farm Onboarding** `/onboarding/farm`
```
[Registration Form]
├─ Farm details
├─ Land records upload
├─ Location
├─ "Submit" → Dashboard
└─ "Cancel" → /dashboard/farmer
```

---

## 🔄 Navigation Flow Diagram

```
┌─────────────┐
│   Login     │ (/)
│  Page (/)   │
└──────┬──────┘
       │ Click "Login"
       ↓
┌─────────────────────────────────────────────┐
│         MARKETPLACE (/marketplace)          │
│  ┌────────────────────────────────────┐    │
│  │ Header Bar (Always Visible)        │    │
│  │ - Services                          │    │
│  │ - Dashboard Toggle                  │    │
│  │ - Cart                              │    │
│  │ - Wishlist                          │    │
│  │ - Profile                           │    │
│  └────────────────────────────────────┘    │
│                                             │
│  [Product Grid]                             │
│   ↓ Click Product                           │
└─────────────────────────────────────────────┘
       │
       ├──→ Product Details (/product/:id)
       │         ↓
       │    Add to Cart / Wishlist
       │         ↓
       ├──→ Cart (/cart)
       │         ↓
       │    Checkout (/checkout)
       │         ↓
       │    Order Success (/order-success)
       │
       ├──→ Services (/services)
       │         ↓
       │    Disease Detection (/services/disease-detection)
       │
       ├──→ Farmer Dashboard (/dashboard/farmer)
       │         ↓
       │    Farm Onboarding (/onboarding/farm)
       │
       ├──→ Dairy Dashboard (/dashboard/dairy)
       │
       ├──→ MSME Dashboard (/dashboard/msme)
       │         ↓
       │    Supplier Products (/supplier/products)
       │
       └──→ Wishlist (/wishlist)
```

---

## 🎯 Key Navigation Patterns

### Universal Header Navigation
All main pages include a **Header Bar** with:
- 🧩 **Services** button
- 🛒 **Marketplace** button  
- 🔄 **Dashboard Toggle** (Farmer ⟷ Supplier)
- 🛍️ **Cart icon** (with item count)
- ❤️ **Wishlist icon** (with item count)
- 👤 **Profile dropdown** (Logout option)

### Back Buttons
Most pages have explicit "Back" or "Return" buttons:
- Product Details → Back to Marketplace
- Checkout → Back to Cart
- Order Success → Back to Marketplace
- Services pages → Back to Dashboard

### Breadcrumb Navigation
Some pages show breadcrumbs for context:
- Dashboard > Farm Onboarding
- Marketplace > Product Details
- Services > Disease Detection

---

## 🚀 User Journey Examples

### Shopping Journey
```
Login → Marketplace → Product → Add to Cart → 
Cart → Checkout → Order Success → Marketplace
```

### Service Usage Journey
```
Login → Marketplace → Services → Disease Detection → 
Upload Image → Get Results → Back to Services
```

### Supplier Journey
```
Login → Toggle to Supplier → Dashboard → 
Manage Products → Add/Edit Product → Dashboard
```

### Farmer Journey
```
Login → Dashboard → Farm Onboarding → 
Submit Details → Dashboard → Marketplace
```

---

## 📱 All Available Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Login | Entry point |
| `/marketplace` | Marketplace | Product browsing |
| `/product/:id` | Product Details | Single product view |
| `/cart` | Cart | Shopping cart |
| `/checkout` | Checkout | Payment & address |
| `/order-success/:id?` | Order Success | Confirmation |
| `/wishlist` | Wishlist | Saved products |
| `/services` | Services | Service overview |
| `/services/disease-detection` | Disease Detection | AI diagnosis |
| `/dashboard/farmer` | Farmer Dashboard | Farmer portal |
| `/dashboard/dairy` | Dairy Dashboard | Dairy portal |
| `/dashboard/msme` | MSME Dashboard | Supplier portal |
| `/dashboard/supplier` | Supplier Dashboard | Same as MSME |
| `/supplier/products` | Product Management | Inventory |
| `/onboarding/farm` | Farm Onboarding | Registration |

---

## 💡 How Pages Are Connected

### 1. **Direct Navigation Links**
   - Header bar buttons
   - Back buttons
   - Footer links

### 2. **User Actions**
   - Click product → Product Details
   - Add to cart → Cart icon updates
   - Complete checkout → Order Success

### 3. **Dashboard Toggles**
   - Farmer ⟷ Supplier view switching
   - Role-based navigation

### 4. **Breadcrumbs & Context**
   - Show current location
   - Allow backtracking

---

## ✅ Testing Navigation

To test all connections:

1. **Start at Login** (`/`)
2. **Click "Login"** → Lands on Marketplace
3. **Use Header Bar** → Visit Services, Dashboards
4. **Click Products** → See Product Details
5. **Add to Cart** → Visit Cart
6. **Proceed to Checkout** → Complete Order
7. **Check Wishlist** → Add/remove items
8. **Toggle Dashboard** → Switch between views
9. **Visit all 15 pages** → Verify navigation

---

**All pages are interconnected through the header bar, action buttons, and logical user flows!** 🎉

