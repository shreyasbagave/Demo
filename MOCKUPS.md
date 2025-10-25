# AgriStack Platform - Page Mockups

## Table of Contents
1. [Login/Signup Page](#1-loginsignup-page)
2. [Farmer Dashboard](#2-farmer-dashboard)
3. [Dairy Dashboard](#3-dairy-dashboard)
4. [MSME/Supplier Dashboard](#4-msmesupplier-dashboard)
5. [Marketplace](#5-marketplace)
6. [Product Details](#6-product-details)
7. [Cart](#7-cart)
8. [Checkout](#8-checkout)
9. [Order Success](#9-order-success)
10. [Services Hub](#10-services-hub)
11. [Disease Detection](#11-disease-detection)
12. [Farm Onboarding](#12-farm-onboarding)
13. [Supplier Products](#13-supplier-products)
14. [Wishlist](#14-wishlist)

---

## 1. Login/Signup Page

### Overview
Entry point for the application with multiple authentication methods integrated with AgriStack ecosystem.

### Layout Description

#### **Header Section**
- Centered title: "AgriStack Login" or "AgriStack Signup"
- Clean, modern typography with agricultural green accent (#059669)

#### **Mode Toggle (Login/Signup)**
```
┌─────────────────────────────────────┐
│  [ Login ]     [ Signup ]           │
└─────────────────────────────────────┘
```
- Two-button toggle at the top
- Active button highlighted in blue (#2563eb)
- Smooth transition between modes

#### **Authentication Tabs (Login Mode Only)**
```
┌─────────────────────────────────────────────────────────────┐
│ [Username/Password] [Agristack ID] [Magic Link] [Aadhaar]  │
└─────────────────────────────────────────────────────────────┘
```
- 4 authentication methods
- Tab navigation with underline indicator
- Active tab in blue, inactive in gray

#### **Form Area**

**Login - Credentials Tab:**
- Username/Email input field
- Password input field with eye icon (show/hide)
- "Login" button (green, full width)

**Login - Agristack ID Tab:**
- Agristack ID input
- Helper text: "Use your registered Agristack ID for authentication"
- "Login" button

**Login - Magic Link Tab:**
- Email input
- "Send Magic Link" button
- Success message (when sent): "Magic link sent to your email! Check your inbox..."
- "Verify Login" button appears after link sent

**Login - Aadhaar eKYC Tab:**
- 12-digit Aadhaar number input (formatted: XXXX XXXX XXXX)
- "Send OTP" button
- After OTP sent: 6-digit OTP input field
- "Verify OTP" button

**Signup Mode:**
- Role dropdown (Farmer, Dairy Farmer, MSME)
- Username input
- Email input
- Password input
- Confirm Password input
- Optional: Agristack ID
- Optional: Aadhaar Number
- Optional: Phone Number
- "Sign Up" button

#### **Visual Design**
- Background: Subtle gradient (light green to white)
- Card: White with rounded corners (16px radius)
- Shadow: Soft drop shadow (0 2px 8px rgba(0,0,0,0.08))
- Max width: 500px, centered
- Padding: 32px
- Form spacing: 16px between fields

#### **Color Scheme**
- Primary: #2563eb (Blue)
- Success: #059669 (Green)
- Error: #dc2626 (Red)
- Text: #1f2937 (Dark Gray)
- Background: #f8fafc (Light Gray)

---

## 2. Farmer Dashboard

### Overview
Main control center for farmers to manage their farms and monitor agricultural metrics.

### Layout Description

#### **Header Bar**
- Full-width navigation bar
- Left: AgriStack logo + "Farmer Dashboard"
- Right: Profile dropdown, notifications, cart icon
- Background: White with bottom border

#### **Welcome Card**
```
┌─────────────────────────────────────────────────────────────┐
│  Welcome                                    Current Farm     │
│  [Farmer Name]                              [Progress Ring]  │
│  AgriStack ID: AS-12345                                      │
│                                                               │
│  Current Farm: [Dropdown Selector ▼]   [+ Add Farm]         │
│  Block A — Gat 127/2B • Mohol, Solapur • Bhagwa • 3 x 4 m  │
└─────────────────────────────────────────────────────────────┘
```
- Large card with gradient background (green tint)
- Farmer name and ID prominently displayed
- Farm selector dropdown with location details
- Add Farm button (outlined, green)

#### **KPI Cards Grid (4 columns)**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Moisture Avg │ │ Irrigation   │ │ Leaf Wetness │ │ CBAM Ready.  │
│   17.4%      │ │   1,240 L    │ │    Dry       │ │    84%       │
│   +3.0 ↗     │ │   +120.0 ↗   │ │   -1.2 ↘     │ │   +12.0 ↗    │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```
- Responsive grid (4 cards on desktop, 2 on tablet, 1 on mobile)
- Each card shows:
  - Metric title
  - Large value
  - Delta with trend indicator (+ green, - red)
- Color-coded borders (green for good metrics)
- Hover effect: slight elevation

#### **Chart Section**
```
┌─────────────────────────────────────────────────────────────┐
│  Soil Moisture — last 24h                                    │
│                                                               │
│  [Line Chart Visualization]                                  │
│  📊 Shows moisture levels over time                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```
- Full-width chart container
- Title: "Soil Moisture — last 24h"
- Placeholder for chart (can integrate Chart.js or D3)
- Background: White card with shadow

#### **Quick Actions (Bottom)**
- Navigation buttons:
  - 🛒 Marketplace
  - 📊 Services
  - 📈 Analytics
  - ⚙️ Settings

---

## 3. Dairy Dashboard

### Overview
Dashboard for dairy farmers with milk production tracking and quality metrics.

### Layout Description

#### **Header Bar** (Same as Farmer Dashboard)

#### **Welcome Card**
```
┌─────────────────────────────────────────────────────────────┐
│  Welcome                                    Dairy Status     │
│  [Dairy Farmer Name]                        ● Active         │
│  AgriStack ID: AS-67890                                      │
│                                                               │
│  Current Facility: [Dropdown]              [+ Add Facility]  │
│  Dairy Unit A • Pune, Maharashtra • 50 Cattle               │
└─────────────────────────────────────────────────────────────┘
```

#### **KPI Cards Grid**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Milk Today   │ │ Quality Avg  │ │ Temperature  │ │ Cattle Count │
│   450 L      │ │   98.5%      │ │   4.2°C      │ │    50        │
│   +25.0 ↗    │ │   +1.2 ↗     │ │   -0.3 ↘     │ │   +2 ↗       │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

#### **Milk Production Chart**
- Line chart showing daily production over last 30 days
- Bar chart for quality metrics

#### **Cattle Health Section**
```
┌─────────────────────────────────────────────────────────────┐
│  Cattle Health Status                                        │
│                                                               │
│  🟢 Healthy: 45                                              │
│  🟡 Under Observation: 3                                     │
│  🔴 Requires Attention: 2                                    │
│                                                               │
│  [View Details →]                                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. MSME/Supplier Dashboard

### Overview
Business dashboard for suppliers/MSMEs to manage products, orders, and analytics.

### Layout Description

#### **Header Bar** (Same as other dashboards)

#### **Welcome Card**
```
┌─────────────────────────────────────────────────────────────┐
│  Welcome                                    Business Status  │
│  [Supplier Name]                            ● Active         │
│  AgriStack ID: AS-45678                                      │
│                                                               │
│  Business Type: Agricultural Supplies & Equipment            │
│  Registered MSME • GST Compliant                             │
│                                              [+ Add Product]  │
└─────────────────────────────────────────────────────────────┘
```

#### **KPI Cards Grid**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ Total Prod.  │ │ Orders Today │ │ Revenue (₹)  │ │ Rating       │
│    24        │ │    12        │ │   45,600     │ │   4.8 ⭐      │
│   +3 ↗       │ │   +2 ↗       │ │   +8.5% ↗    │ │   +0.2 ↗     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

#### **Recent Orders Table**
```
┌──────────────────────────────────────────────────────────────────┐
│  Recent Orders                                                    │
│  ┌──────────┬────────────┬───────────────┬─────────┬──────────┐ │
│  │ Order ID │ Customer   │ Product       │ Amount  │ Status   │ │
│  ├──────────┼────────────┼───────────────┼─────────┼──────────┤ │
│  │ ORD-001  │ Rajesh K.  │ Fertilizer    │ ₹2,400  │ Process  │ │
│  │ ORD-002  │ Priya S.   │ Seeds Pack    │ ₹1,800  │ Shipped  │ │
│  │ ORD-003  │ Amit P.    │ Irrigation    │ ₹5,200  │ Deliver  │ │
│  └──────────┴────────────┴───────────────┴─────────┴──────────┘ │
└──────────────────────────────────────────────────────────────────┘
```
- Status badges color-coded:
  - Processing: Blue
  - Shipped: Orange
  - Delivered: Green

#### **Quick Actions Grid**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   📦         │ │   📊         │ │   💰         │ │   📞         │
│ My Products  │ │  Analytics   │ │  Payments    │ │  Support     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```
- 4 action cards with icons
- Click to navigate to respective sections

---

## 5. Marketplace

### Overview
Product browsing interface with advanced filtering and eco-scoring.

### Layout Description

#### **Header Bar** (Global navigation)

#### **Subheading Bar**
```
┌─────────────────────────────────────────────────────────────┐
│  ← Dashboard  /  Dashboard › Marketplace                     │
└─────────────────────────────────────────────────────────────┘
```
- Breadcrumb navigation
- Back to dashboard button

#### **Filter Bar**
```
┌─────────────────────────────────────────────────────────────┐
│  🔍 [Search products...]                                     │
│  Price: [All ▼]  Category: [All ▼]  Eco Score: [All ▼]     │
└─────────────────────────────────────────────────────────────┘
```
- Search bar (full width)
- Filter dropdowns for Price, Category, Eco Score
- Active filters shown as removable badges

#### **Product Grid (3-4 columns)**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ [HOT SALE]   │ │ [HOT SALE]   │ │ [NEW]        │ │ [HOT SALE]   │
│ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
│ │  Image   │ │ │ │  Image   │ │ │ │  Image   │ │ │ │  Image   │ │
│ └──────────┘ │ │ └──────────┘ │ │ └──────────┘ │ │ └──────────┘ │
│ 🚚 Free Del. │ │              │ │ 🚚 Free Del. │ │              │
│              │ │              │ │              │ │              │
│ Product Name │ │ Product Name │ │ Product Name │ │ Product Name │
│ Description  │ │ Description  │ │ Description  │ │ Description  │
│ 🌱 Eco: 85   │ │ 🌱 Eco: 72   │ │ 🌱 Eco: 90   │ │ 🌱 Eco: 68   │
│              │ │              │ │              │ │              │
│ ₹1,299       │ │ ₹899         │ │ ₹1,599       │ │ ₹699         │
│ ₹999         │ │ ₹699         │ │ ₹1,299       │ │ ₹549         │
│ ⭐⭐⭐⭐⭐ 45  │ │ ⭐⭐⭐⭐☆ 32  │ │ ⭐⭐⭐⭐⭐ 67  │ │ ⭐⭐⭐⭐☆ 28  │
│ In Stock     │ │ In Stock     │ │ In Stock     │ │ In Stock     │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

**Product Card Details:**
- Badge: "HOT SALE" or "NEW" (top right corner)
- Product image (400x300px, rounded corners)
- Free delivery badge (if price > ₹500)
- Product name (bold, 18px)
- Short description (gray, 14px)
- Eco Score badge (color-coded):
  - 80-100: Green background
  - 70-79: Yellow background
  - <70: Red background
- Feature tags: "4K Display", "16-Hour Battery", etc.
- Pricing:
  - Old price (strikethrough)
  - New price (bold, larger)
- Star rating + review count
- Stock status

**Hover Effect:**
- Card elevates with larger shadow
- Overlay appears with detailed info:
  - Full product details
  - Category
  - Farmer info
  - Extended description

#### **Pagination**
```
┌─────────────────────────────────────────────────────────────┐
│              ← Previous   [1] 2 3 4 5   Next →               │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Product Details

### Overview
Detailed product page with images, specifications, and purchase options.

### Layout Description

#### **Header Bar** (Global navigation)

#### **Breadcrumb**
```
Home › Marketplace › [Category] › [Product Name]
```

#### **Main Layout (2-column)**

**Left Column - Product Gallery:**
```
┌─────────────────────────────────┐
│                                 │
│     [Main Product Image]        │
│         (600x600px)             │
│                                 │
├─────────────────────────────────┤
│ [Thumb] [Thumb] [Thumb] [Thumb] │
└─────────────────────────────────┘
```
- Large main image with zoom on hover
- Thumbnail gallery below (4-6 images)
- Image carousel functionality

**Right Column - Product Info:**
```
┌─────────────────────────────────────────┐
│  [Product Name]                         │
│  ⭐⭐⭐⭐⭐ 4.8 (145 reviews)             │
│                                         │
│  🌱 Eco Score: 85/100 [Green Badge]    │
│                                         │
│  ₹1,299  ₹999                          │
│  (23% off)                              │
│                                         │
│  🚚 Free Delivery on orders above ₹500 │
│  📦 In Stock                            │
│                                         │
│  Quantity: [- ] 1 [+]                   │
│                                         │
│  [Add to Cart (Full Width Button)]     │
│  [Buy Now]  [Add to Wishlist ❤]        │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Product Details:                       │
│  • Feature 1                            │
│  • Feature 2                            │
│  • Feature 3                            │
│                                         │
│  Farmer: [Farmer Name]                 │
│  Location: [Location]                  │
│  Sustainability Index: 350              │
└─────────────────────────────────────────┘
```

#### **Tabs Section (Full Width Below)**
```
┌─────────────────────────────────────────────────────────────┐
│  [Description] [Specifications] [Reviews] [Seller Info]     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Tab Content Here]                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Description Tab:**
- Full product description
- Usage instructions
- Certifications

**Specifications Tab:**
- Table format with key-value pairs
- Technical details

**Reviews Tab:**
```
┌──────────────────────────────────────┐
│  Rating Breakdown                    │
│  ⭐⭐⭐⭐⭐ █████████████ 85%         │
│  ⭐⭐⭐⭐☆ ███ 10%                    │
│  ⭐⭐⭐☆☆ ██ 5%                      │
│                                      │
│  ─────────────────────────────────   │
│                                      │
│  User Reviews:                       │
│  ┌────────────────────────────────┐ │
│  │ ⭐⭐⭐⭐⭐ John D.               │ │
│  │ Great product! Worth the price │ │
│  │ Purchased 2 weeks ago          │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

**Seller Info Tab:**
- Seller profile
- Contact information
- Other products by seller

#### **Related Products Section**
```
┌─────────────────────────────────────────────────────────────┐
│  You May Also Like                                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Product  │ │ Product  │ │ Product  │ │ Product  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Cart

### Overview
Shopping cart with quantity management and price summary.

### Layout Description

#### **Header Bar** (Global navigation with cart item count)

#### **Page Title**
```
┌─────────────────────────────────────────────────────────────┐
│  Shopping Cart                                    3 items    │
└─────────────────────────────────────────────────────────────┘
```

#### **Cart Layout (2-column)**

**Left Column - Cart Items (70% width):**
```
┌─────────────────────────────────────────────────────────────┐
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [Image] Product Name                     ₹999  [Remove]│ │
│  │ (100px) Category                                       │ │
│  │         Farmer: [Name]                                 │ │
│  │         Qty: [- ] 2 [+]              Total: ₹1,998    │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [Image] Product Name                     ₹1,299 [Remove]│ │
│  │ (100px) Category                                       │ │
│  │         Farmer: [Name]                                 │ │
│  │         Qty: [- ] 1 [+]              Total: ₹1,299    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Right Column - Order Summary (30% width):**
```
┌─────────────────────────────────────┐
│  Order Summary                      │
│  ─────────────────────────────────  │
│  Subtotal (3 items):    ₹3,297     │
│  Shipping:              Free        │
│  Tax:                   ₹330        │
│  ─────────────────────────────────  │
│  Total:                 ₹3,627     │
│                                     │
│  [Proceed to Checkout]              │
│  (Full width, green button)         │
│                                     │
│  [Continue Shopping]                │
│  (Full width, outlined button)      │
│                                     │
│  ─────────────────────────────────  │
│  Have a coupon?                     │
│  [Enter code]  [Apply]              │
└─────────────────────────────────────┘
```

**Empty Cart State:**
```
┌─────────────────────────────────────────────────────────────┐
│                        🛒                                    │
│                                                              │
│              Your cart is empty                              │
│                                                              │
│         [Continue Shopping (Button)]                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 8. Checkout

### Overview
Multi-step checkout process with shipping, billing, and payment.

### Layout Description

#### **Header Bar** (Simplified, no cart icon)

#### **Progress Stepper**
```
┌─────────────────────────────────────────────────────────────┐
│  (1)─────────(2)─────────(3)─────────(4)                    │
│  Shipping    Billing    Payment    Review                   │
└─────────────────────────────────────────────────────────────┘
```
- 4-step progress indicator
- Active step highlighted in blue
- Completed steps in green with checkmark

#### **Main Layout (2-column)**

**Left Column - Form (70% width):**

**Step 1: Shipping Information**
```
┌─────────────────────────────────────────────────────────────┐
│  Shipping Information                                        │
│  ┌─────────────────────┐ ┌─────────────────────┐           │
│  │ Full Name*          │ │ Email*              │           │
│  └─────────────────────┘ └─────────────────────┘           │
│  ┌─────────────────────┐                                    │
│  │ Phone*              │                                    │
│  └─────────────────────┘                                    │
│  ┌───────────────────────────────────────────────────────┐ │
│  │ Address*                                              │ │
│  │ (textarea, 3 rows)                                    │ │
│  └───────────────────────────────────────────────────────┘ │
│  ┌─────────────────────┐ ┌─────────────────────┐           │
│  │ City*               │ │ State*              │           │
│  └─────────────────────┘ └─────────────────────┘           │
│  ┌─────────────────────┐ ┌─────────────────────┐           │
│  │ Pincode*            │ │ Country             │           │
│  └─────────────────────┘ └─────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

**Step 2: Billing Information**
```
┌─────────────────────────────────────────────────────────────┐
│  Billing Information                                         │
│  ☑ Same as shipping address                                 │
│  (If unchecked, show same form as shipping)                 │
└─────────────────────────────────────────────────────────────┘
```

**Step 3: Payment Method**
```
┌─────────────────────────────────────────────────────────────┐
│  Payment Method                                              │
│  ⦿ 💳 Credit/Debit Card                                     │
│  ○ 📱 UPI Payment                                            │
│  ○ 💰 Cash on Delivery                                       │
│                                                              │
│  [Card form if selected]                                     │
│  Card Number: [____-____-____-____]                          │
│  Expiry: [MM/YY]  CVV: [___]                                │
│  Cardholder Name: [________________]                         │
└─────────────────────────────────────────────────────────────┘
```

**Right Column - Order Summary (30% width):**
```
┌─────────────────────────────────────┐
│  Order Summary                      │
│  ─────────────────────────────────  │
│  ┌───────────────────────────────┐ │
│  │ [Img] Product 1         ₹999  │ │
│  │ (60px) Qty: 2                 │ │
│  └───────────────────────────────┘ │
│  ┌───────────────────────────────┐ │
│  │ [Img] Product 2       ₹1,299  │ │
│  │ (60px) Qty: 1                 │ │
│  └───────────────────────────────┘ │
│  ─────────────────────────────────  │
│  Subtotal:              ₹3,297     │
│  Shipping:              Free        │
│  Tax:                   ₹330        │
│  ─────────────────────────────────  │
│  Total:                 ₹3,627     │
│                                     │
│  [Place Order]                      │
│  (Full width, green button)         │
│                                     │
│  🔒 Secure Payment                  │
└─────────────────────────────────────┘
```

**Navigation Buttons:**
```
[← Back]              [Continue →]
```

---

## 9. Order Success

### Overview
Confirmation page after successful order placement.

### Layout Description

#### **Header Bar** (Simplified)

#### **Success Message (Centered)**
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                        ✓                                     │
│                   (Large checkmark icon in green circle)     │
│                                                              │
│              Order Placed Successfully!                      │
│                                                              │
│         Thank you for your purchase                          │
│                                                              │
│         Order ID: #ORD-2024-12345                           │
│         Date: October 25, 2024                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### **Order Details Card**
```
┌─────────────────────────────────────────────────────────────┐
│  Order Details                                               │
│  ─────────────────────────────────────────────────────────  │
│  Shipping To:                                                │
│  [Customer Name]                                             │
│  [Address]                                                   │
│  [City, State Pincode]                                       │
│  Phone: [Phone]                                              │
│                                                              │
│  Payment Method: Credit Card (****1234)                      │
│  Amount Paid: ₹3,627                                         │
│                                                              │
│  Estimated Delivery: October 30, 2024                        │
└─────────────────────────────────────────────────────────────┘
```

#### **Order Items**
```
┌─────────────────────────────────────────────────────────────┐
│  Items Ordered                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [Image] Product Name × 2              ₹1,998           │ │
│  │ (80px)                                                 │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ [Image] Product Name × 1              ₹1,299           │ │
│  │ (80px)                                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### **Action Buttons**
```
┌─────────────────────────────────────────────────────────────┐
│  [Track Order]          [Continue Shopping]                  │
│  (Green button)         (Outlined button)                    │
│                                                              │
│  [Download Invoice (PDF)]                                    │
└─────────────────────────────────────────────────────────────┘
```

#### **Next Steps Section**
```
┌─────────────────────────────────────────────────────────────┐
│  What's Next?                                                │
│                                                              │
│  ✉ Order confirmation sent to [email]                      │
│  📱 Track your order anytime from your dashboard             │
│  🚚 We'll notify you when your order ships                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 10. Services Hub

### Overview
Central hub for agricultural services including advisory and disease detection.

### Layout Description

#### **Header Bar**

#### **Back Button**
```
← Back
```

#### **Hero Section**
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│                       Services                               │
│            Choose a service to continue                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

#### **Service Cards Grid (2 columns)**
```
┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│         🌾                      │ │         🔬                      │
│                                 │ │                                 │
│      Smart Advisory             │ │    Disease Detection            │
│                                 │ │                                 │
│  Personalized recommendations   │ │  Detect crop diseases using     │
│  for crop health and yield      │ │  images and receive treatment   │
│                                 │ │  tips                           │
│                                 │ │                                 │
│  [Get Started →]                │ │  [Get Started →]                │
└─────────────────────────────────┘ └─────────────────────────────────┘
```

**Card Design:**
- Large icon at top (emoji or SVG)
- Service title (bold, 24px)
- Description (gray, 16px)
- "Get Started" button (blue, rounded)
- Hover effect: Card elevates with shadow
- Click: Navigate to respective service

**Additional Services (Future):**
```
┌─────────────────────────────────┐ ┌─────────────────────────────────┐
│      💧 Irrigation Planning     │ │      📊 Yield Prediction        │
└─────────────────────────────────┘ └─────────────────────────────────┘
```

---

## 11. Disease Detection

### Overview
AI-powered crop disease detection service using image upload.

### Layout Description

#### **Header Bar**

#### **Breadcrumb**
```
Services › Disease Detection
```

#### **Main Content (Centered Card)**
```
┌─────────────────────────────────────────────────────────────┐
│                 🔬 Crop Disease Detection                    │
│                                                              │
│     Upload a photo of your crop to detect diseases           │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                         │ │
│  │          📷 Click to upload image                       │ │
│  │              or drag and drop                           │ │
│  │                                                         │ │
│  │         Supported: JPG, PNG (Max 5MB)                  │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [Upload & Analyze]                                          │
│  (Button, disabled until image selected)                     │
└─────────────────────────────────────────────────────────────┘
```

**After Image Upload:**
```
┌─────────────────────────────────────────────────────────────┐
│  Uploaded Image                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                         │ │
│  │         [Preview of uploaded image]                     │ │
│  │              (400x300px)                                │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  [Change Image]  [Analyze →]                                 │
└─────────────────────────────────────────────────────────────┘
```

**Analysis Loading State:**
```
┌─────────────────────────────────────────────────────────────┐
│              ⟳ Analyzing image...                            │
│         Please wait while we detect diseases                 │
│                                                              │
│         [Progress bar: 65%]                                  │
└─────────────────────────────────────────────────────────────┘
```

**Results Display:**
```
┌─────────────────────────────────────────────────────────────┐
│  Detection Results                                           │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Disease Detected: Late Blight                               │
│  Confidence: 92%                                             │
│  Severity: Moderate                                          │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Symptoms:                                                   │
│  • Dark spots on leaves                                      │
│  • Yellowing around edges                                    │
│  • Visible fungal growth                                     │
│                                                              │
│  Recommended Actions:                                        │
│  1. Remove affected leaves immediately                       │
│  2. Apply fungicide (copper-based)                           │
│  3. Improve air circulation                                  │
│  4. Reduce overhead watering                                 │
│                                                              │
│  Prevention Tips:                                            │
│  • Plant resistant varieties                                 │
│  • Maintain proper spacing                                   │
│  • Regular monitoring                                        │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  [Download Report (PDF)]  [Consult Expert]                   │
│  [Detect Another]                                            │
└─────────────────────────────────────────────────────────────┘
```

#### **History Section (Below)**
```
┌─────────────────────────────────────────────────────────────┐
│  Previous Detections                                         │
│  ┌──────────┬────────────────┬────────────┬─────────────┐  │
│  │ Date     │ Disease        │ Crop       │ Action      │  │
│  ├──────────┼────────────────┼────────────┼─────────────┤  │
│  │ Oct 20   │ Powdery Mildew │ Tomato     │ [View]      │  │
│  │ Oct 15   │ Leaf Rust      │ Wheat      │ [View]      │  │
│  │ Oct 10   │ None Detected  │ Rice       │ [View]      │  │
│  └──────────┴────────────────┴────────────┴─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 12. Farm Onboarding

### Overview
Multi-step wizard for farmers to register their farms.

### Layout Description

#### **Header Bar** (Simplified)

#### **Progress Stepper**
```
┌─────────────────────────────────────────────────────────────┐
│       ①──────────②──────────③──────────④                   │
│   Basic Info   Location   Documents   Verification          │
└─────────────────────────────────────────────────────────────┘
```

#### **Step 1: Basic Information**
```
┌─────────────────────────────────────────────────────────────┐
│  👨‍🌾 Farm Registration                                       │
│                                                              │
│  Basic Information                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Farm Name*                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Farm Size (acres)*                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Primary Crop*  [Dropdown]                           │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Farm Type:  ○ Organic  ○ Conventional  ○ Mixed     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [Next →]                                                    │
└─────────────────────────────────────────────────────────────┘
```

#### **Step 2: Location Details**
```
┌─────────────────────────────────────────────────────────────┐
│  Farm Location                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Address*                                            │   │
│  │ (textarea)                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌───────────────────────┐ ┌───────────────────────────┐   │
│  │ Village/Town*         │ │ District*                 │   │
│  └───────────────────────┘ └───────────────────────────┘   │
│  ┌───────────────────────┐ ┌───────────────────────────┐   │
│  │ State*                │ │ Pincode*                  │   │
│  └───────────────────────┘ └───────────────────────────┘   │
│  ┌───────────────────────┐ ┌───────────────────────────┐   │
│  │ Latitude              │ │ Longitude                 │   │
│  └───────────────────────┘ └───────────────────────────┘   │
│                                                              │
│  [Use Current Location]  (GPS icon)                          │
│                                                              │
│  [Map Preview]                                               │
│  (Interactive map showing farm location)                     │
│                                                              │
│  [← Back]  [Next →]                                          │
└─────────────────────────────────────────────────────────────┘
```

#### **Step 3: Document Upload**
```
┌─────────────────────────────────────────────────────────────┐
│  Documentation                                               │
│                                                              │
│  Land Ownership Documents*                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📄 Click to upload or drag and drop                 │   │
│  │ Accepted: PDF, JPG, PNG (Max 10MB)                  │   │
│  └─────────────────────────────────────────────────────┘   │
│  [Uploaded: land_deed.pdf] ✓                                │
│                                                              │
│  Survey Number / Gat Number*                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Enter survey/gat number                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Soil Health Card (Optional)                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📄 Upload soil health card                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Organic Certification (If applicable)                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📄 Upload certification                             │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  [← Back]  [Next →]                                          │
└─────────────────────────────────────────────────────────────┘
```

#### **Step 4: Verification**
```
┌─────────────────────────────────────────────────────────────┐
│  Review & Verify                                             │
│                                                              │
│  Please review your information before submitting            │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Farm Details                          [Edit]         │   │
│  │ Name: [Farm Name]                                    │   │
│  │ Size: [Size] acres                                   │   │
│  │ Crop: [Primary Crop]                                 │   │
│  │ Type: [Farm Type]                                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Location                              [Edit]         │   │
│  │ [Full Address]                                       │   │
│  │ Village: [Name], District: [Name]                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Documents                             [Edit]         │   │
│  │ ✓ Land Ownership Document                            │   │
│  │ ✓ Survey Number: [Number]                            │   │
│  │ ✓ Soil Health Card (Optional)                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ☑ I certify that the information provided is accurate      │
│                                                              │
│  [← Back]  [Submit for Verification]                        │
└─────────────────────────────────────────────────────────────┘
```

**Success State:**
```
┌─────────────────────────────────────────────────────────────┐
│                        ✓                                     │
│                                                              │
│            Farm Registered Successfully!                     │
│                                                              │
│    Your farm is under verification. You will receive a      │
│    notification within 24-48 hours.                          │
│                                                              │
│  Farm ID: FM-2024-12345                                     │
│                                                              │
│  [Go to Dashboard]                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 13. Supplier Products

### Overview
Product management interface for suppliers to list and manage their inventory.

### Layout Description

#### **Header Bar**

#### **Page Header**
```
┌─────────────────────────────────────────────────────────────┐
│  My Products                                  [+ Add Product]│
└─────────────────────────────────────────────────────────────┘
```

#### **Filter & Search Bar**
```
┌─────────────────────────────────────────────────────────────┐
│  🔍 [Search products...]                                     │
│  Status: [All ▼]  Category: [All ▼]  Sort: [Newest ▼]      │
└─────────────────────────────────────────────────────────────┘
```

#### **Products Table**
```
┌──────────────────────────────────────────────────────────────────────────┐
│  ┌──────┬─────────────┬──────────┬───────┬────────┬────────┬──────────┐ │
│  │ #    │ Product     │ Category │ Price │ Stock  │ Status │ Actions  │ │
│  ├──────┼─────────────┼──────────┼───────┼────────┼────────┼──────────┤ │
│  │ [Img]│ Fertilizer  │ Supplies │ ₹999  │ 150    │ ● Live │ [Edit]   │ │
│  │      │ Mix NPK     │          │       │        │        │ [Delete] │ │
│  ├──────┼─────────────┼──────────┼───────┼────────┼────────┼──────────┤ │
│  │ [Img]│ Seeds Pack  │ Seeds    │ ₹499  │ 45     │ ● Live │ [Edit]   │ │
│  │      │ Tomato      │          │       │        │        │ [Delete] │ │
│  ├──────┼─────────────┼──────────┼───────┼────────┼────────┼──────────┤ │
│  │ [Img]│ Irrigation  │ Equipment│ ₹2999 │ 12     │ ○ Draft│ [Edit]   │ │
│  │      │ Sprinkler   │          │       │        │        │ [Delete] │ │
│  └──────┴─────────────┴──────────┴───────┴────────┴────────┴──────────┘ │
└──────────────────────────────────────────────────────────────────────────┘
```

**Status Indicators:**
- ● Live (Green) - Published and visible
- ○ Draft (Gray) - Not published
- ⚠ Low Stock (Orange) - Stock below threshold
- ✕ Out of Stock (Red) - No stock available

#### **Add/Edit Product Modal**
```
┌─────────────────────────────────────────────────────────────┐
│  Add New Product                                      [×]    │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Product Images*                                             │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ [+ Add More]          │
│  │ [Img]│ │ [Img]│ │ [Img]│ │ [Img]│                       │
│  │  ✕   │ │  ✕   │ │  ✕   │ │  ✕   │                       │
│  └──────┘ └──────┘ └──────┘ └──────┘                        │
│                                                              │
│  Product Name*                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Enter product name                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Category*                                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Select category [▼]                                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Description*                                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ (Rich text editor)                                  │   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌───────────────────────┐ ┌───────────────────────────┐   │
│  │ Price (₹)*            │ │ Stock Quantity*           │   │
│  └───────────────────────┘ └───────────────────────────┘   │
│                                                              │
│  ┌───────────────────────┐ ┌───────────────────────────┐   │
│  │ SKU                   │ │ Weight (kg)               │   │
│  └───────────────────────┘ └───────────────────────────┘   │
│                                                              │
│  Eco Score (0-100)                                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [Slider: 0 ───●───────────────────────── 100]      │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Product Status                                              │
│  ⦿ Publish  ○ Save as Draft                                │
│                                                              │
│  [Cancel]                              [Save Product]        │
└─────────────────────────────────────────────────────────────┘
```

#### **Bulk Actions**
```
┌─────────────────────────────────────────────────────────────┐
│  ☑ Select All (24 products)                                  │
│  [Bulk Actions ▼]  [Export CSV]  [Import CSV]               │
└─────────────────────────────────────────────────────────────┘
```

---

## 14. Wishlist

### Overview
User's saved/favorited products for later viewing.

### Layout Description

#### **Header Bar**

#### **Page Title**
```
┌─────────────────────────────────────────────────────────────┐
│  ❤ My Wishlist                               12 items       │
└─────────────────────────────────────────────────────────────┘
```

#### **Filter Bar**
```
┌─────────────────────────────────────────────────────────────┐
│  Sort by: [Date Added ▼]  Price: [All ▼]  Availability: [All ▼] │
└─────────────────────────────────────────────────────────────┘
```

#### **Wishlist Grid (3-4 columns)**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ [× Remove]   │ │ [× Remove]   │ │ [× Remove]   │ │ [× Remove]   │
│ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │ │ ┌──────────┐ │
│ │  Image   │ │ │ │  Image   │ │ │ │  Image   │ │ │ │  Image   │ │
│ └──────────┘ │ │ └──────────┘ │ │ └──────────┘ │ │ └──────────┘ │
│              │ │              │ │              │ │              │
│ Product Name │ │ Product Name │ │ Product Name │ │ Product Name │
│              │ │              │ │              │ │              │
│ ₹999         │ │ ₹1,299       │ │ ₹799         │ │ ₹1,599       │
│ In Stock ✓   │ │ In Stock ✓   │ │ Low Stock ⚠ │ │ Out of Stock │
│              │ │              │ │              │ │              │
│ [Add to Cart]│ │ [Add to Cart]│ │ [Add to Cart]│ │ [Notify Me]  │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

**Card Features:**
- Remove button (× icon, top right corner)
- Product image (clickable to product page)
- Product name
- Current price
- Stock status indicator:
  - ✓ In Stock (Green)
  - ⚠ Low Stock (Orange)
  - Out of Stock (Red)
- Action button:
  - "Add to Cart" (if in stock)
  - "Notify Me" (if out of stock)

#### **Empty Wishlist State**
```
┌─────────────────────────────────────────────────────────────┐
│                        ❤                                     │
│                                                              │
│            Your wishlist is empty                            │
│                                                              │
│      Start adding products you love!                         │
│                                                              │
│         [Browse Marketplace]                                 │
└─────────────────────────────────────────────────────────────┘
```

#### **Bulk Actions**
```
┌─────────────────────────────────────────────────────────────┐
│  [Add All to Cart]  [Remove All]  [Share Wishlist]          │
└─────────────────────────────────────────────────────────────┘
```

---

## Design System Reference

### Typography
- **Headings:**
  - H1: 32px, Bold, #1f2937
  - H2: 24px, Bold, #374151
  - H3: 20px, Semibold, #4b5563
  - H4: 18px, Semibold, #6b7280

- **Body:**
  - Large: 18px, Regular, #374151
  - Medium: 16px, Regular, #4b5563
  - Small: 14px, Regular, #6b7280
  - Tiny: 12px, Regular, #9ca3af

### Color Palette

**Primary Colors:**
- Primary Blue: #2563eb
- Primary Green: #059669
- Success Green: #10b981
- Warning Orange: #f59e0b
- Error Red: #dc2626

**Neutral Colors:**
- Gray 900: #1f2937
- Gray 800: #374151
- Gray 700: #4b5563
- Gray 600: #6b7280
- Gray 500: #9ca3af
- Gray 400: #d1d5db
- Gray 300: #e5e7eb
- Gray 200: #f3f4f6
- Gray 100: #f8fafc
- White: #ffffff

**Eco Score Colors:**
- High (80-100): #10b981 (Green)
- Medium (70-79): #f59e0b (Orange)
- Low (<70): #dc2626 (Red)

### Spacing
- 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px

### Border Radius
- Small: 4px
- Medium: 8px
- Large: 12px
- XL: 16px
- Round: 50%

### Shadows
- **Small:** 0 1px 2px rgba(0,0,0,0.05)
- **Medium:** 0 4px 6px rgba(0,0,0,0.1)
- **Large:** 0 10px 15px rgba(0,0,0,0.1)
- **XL:** 0 20px 25px rgba(0,0,0,0.15)

### Buttons

**Primary Button:**
- Background: #059669
- Color: White
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: 600
- Hover: Darken 10%

**Secondary Button:**
- Background: #2563eb
- Color: White
- Padding: 12px 24px
- Border Radius: 8px
- Font Weight: 600

**Outlined Button:**
- Background: Transparent
- Border: 2px solid #059669
- Color: #059669
- Padding: 10px 22px
- Border Radius: 8px

**Icon Button:**
- Size: 40x40px
- Border Radius: 50%
- Background: #f3f4f6
- Hover: #e5e7eb

### Form Elements

**Input Field:**
- Height: 44px
- Padding: 12px 16px
- Border: 1px solid #d1d5db
- Border Radius: 8px
- Focus: Border #2563eb, Shadow

**Dropdown:**
- Height: 44px
- Same styling as input
- Chevron icon on right

**Textarea:**
- Min Height: 120px
- Same styling as input

**Checkbox/Radio:**
- Size: 20x20px
- Border: 2px solid #d1d5db
- Checked: Background #2563eb

### Cards
- Background: White
- Border: 1px solid #e5e7eb (optional)
- Border Radius: 12px
- Shadow: Medium
- Padding: 24px

### Icons
- Use consistent icon library (e.g., Heroicons, Feather Icons)
- Size: 16px, 20px, 24px, 32px
- Color: Inherit from text or custom

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Large Desktop: > 1440px

### Animation
- Transition: all 0.2s ease
- Hover Effects: Scale 1.02, Elevation
- Page Transitions: Fade in/out

---

## Accessibility Notes

1. **Color Contrast:** Ensure WCAG AA compliance (4.5:1 for text)
2. **Keyboard Navigation:** All interactive elements accessible via Tab
3. **Focus States:** Visible focus indicators on all inputs/buttons
4. **Alt Text:** All images have descriptive alt attributes
5. **ARIA Labels:** Proper labels for screen readers
6. **Form Validation:** Clear error messages and indicators
7. **Loading States:** Announce loading to screen readers
8. **Heading Hierarchy:** Proper H1-H6 structure

---

## Mobile Considerations

1. **Touch Targets:** Minimum 44x44px for tappable elements
2. **Responsive Grid:** Stack cards vertically on mobile
3. **Bottom Navigation:** Consider fixed bottom nav for key actions
4. **Swipe Gestures:** Enable swipe for carousels and galleries
5. **Collapsible Sections:** Use accordions for long content
6. **Sticky Header:** Keep header fixed on scroll
7. **Large Input Fields:** Easier typing on mobile keyboards

---

## Future Enhancements

1. **Dark Mode:** Alternative color scheme
2. **Internationalization:** Multi-language support
3. **PWA Features:** Offline support, push notifications
4. **Advanced Filters:** More granular search options
5. **Social Features:** Share products, reviews
6. **Chat Support:** Real-time customer support
7. **Video Integration:** Product videos, tutorials
8. **AR Features:** Visualize products in real environment
9. **Voice Search:** Voice-activated product search
10. **Gamification:** Rewards, achievements for engagement

---

*This mockup document provides comprehensive specifications for all pages in the AgriStack platform. Use these as reference for development, design handoff, or user testing.*

