# 🚀 Deploy AgriStack Marketplace to Render

This guide will help you deploy your React application to Render.com

## 📋 Prerequisites

1. A GitHub account
2. A Render account (free tier available at https://render.com)
3. Git installed on your computer

---

## 📦 Step 1: Prepare Your Code for GitHub

### 1.1 Initialize Git Repository (if not already done)

Open your terminal in the `mockups-react` folder and run:

```bash
cd mockups-react
git init
git add .
git commit -m "Initial commit - AgriStack Marketplace"
```

### 1.2 Create a GitHub Repository

1. Go to https://github.com/new
2. Create a new repository named `agristack-marketplace`
3. **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### 1.3 Push Your Code to GitHub

Copy the commands from GitHub and run them (they'll look like this):

```bash
git remote add origin https://github.com/YOUR-USERNAME/agristack-marketplace.git
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## 🌐 Step 2: Deploy to Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up using your GitHub account
3. Authorize Render to access your GitHub repositories

### 2.2 Create New Static Site

1. From your Render dashboard, click **"New +"** button
2. Select **"Static Site"**
3. Connect your GitHub repository:
   - Search for `agristack-marketplace`
   - Click **"Connect"**

### 2.3 Configure Build Settings

Fill in the following details:

**Name:** `agristack-marketplace` (or any name you prefer)

**Branch:** `main`

**Root Directory:** Leave blank (or set to `mockups-react` if deploying from parent folder)

**Build Command:**
```bash
npm install && npm run build
```

**Publish Directory:**
```bash
dist
```

**Auto-Deploy:** `Yes` (recommended - auto-deploys on every push to main)

### 2.4 Add Rewrite Rule (Important for React Router)

1. Scroll down to **"Redirects/Rewrites"** section
2. Click **"Add Rule"**
3. Add the following:
   - **Source:** `/*`
   - **Destination:** `/index.html`
   - **Action:** `Rewrite`

This ensures that all routes (like `/marketplace`, `/cart`, etc.) work correctly.

### 2.5 Deploy

1. Click **"Create Static Site"**
2. Render will start building your app
3. Wait for the build to complete (usually 2-5 minutes)
4. Once done, you'll see a green "Live" badge

### 2.6 Access Your Site

Your site will be available at:
```
https://agristack-marketplace.onrender.com
```

(The exact URL will be shown on your Render dashboard)

---

## 🔄 Step 3: Update Your Deployed App

Whenever you make changes:

1. **Make your changes** in the code
2. **Commit changes:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
3. **Push to GitHub:**
   ```bash
   git push origin main
   ```
4. **Render auto-deploys** - Your site will automatically rebuild and redeploy!

---

## 📱 Step 4: Custom Domain (Optional)

### 4.1 Add Custom Domain

1. In your Render dashboard, go to your static site
2. Click on **"Settings"**
3. Scroll to **"Custom Domain"**
4. Click **"Add Custom Domain"**
5. Enter your domain name (e.g., `marketplace.yourdomain.com`)
6. Follow the DNS configuration instructions provided by Render

### 4.2 SSL Certificate

Render automatically provides free SSL certificates (HTTPS) for all sites, including custom domains!

---

## 🛠️ Troubleshooting

### Build Failed?

**Check the build logs in Render dashboard:**
- Common issue: Missing dependencies → Run `npm install` locally first
- Check that `package.json` is in the correct directory

### Routes Not Working (404 Errors)?

**Make sure you added the rewrite rule:**
- Source: `/*`
- Destination: `/index.html`
- Action: `Rewrite`

### Blank Page After Deployment?

**Check browser console for errors:**
- Open DevTools (F12)
- Look for JavaScript errors
- Common issue: Incorrect file paths

### Need to Rebuild Manually?

1. Go to your Render dashboard
2. Select your static site
3. Click **"Manual Deploy"** → **"Deploy latest commit"**

---

## ✅ Verification Checklist

After deployment, test these URLs:

- ✅ Homepage: `https://your-app.onrender.com/`
- ✅ Marketplace: `https://your-app.onrender.com/marketplace`
- ✅ Cart: `https://your-app.onrender.com/cart`
- ✅ Product Details: `https://your-app.onrender.com/product/1`
- ✅ Checkout: `https://your-app.onrender.com/checkout`

All routes should load correctly without 404 errors!

---

## 🎉 Success!

Your AgriStack Marketplace is now live on the internet! 

### Share Your App:
Send the URL to anyone: `https://your-app.onrender.com`

### Free Tier Limits:
- Render free tier sites may spin down after inactivity
- First load after inactivity may take 30-60 seconds
- Upgrade to paid plan for instant loading

---

## 📞 Support

If you encounter issues:
1. Check Render's build logs
2. Review the troubleshooting section above
3. Visit Render's documentation: https://render.com/docs/static-sites

---

**Happy Deploying! 🚀**

