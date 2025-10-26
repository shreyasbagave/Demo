# Deployment Guide for Render

## Quick Deploy Steps

1. **Push to Git:**
   ```bash
   git add .
   git commit -m "Configure for static site deployment"
   git push origin main
   ```

2. **Create Static Site on Render:**
   - Go to https://render.com/dashboard
   - Click "New +" → "Static Site"
   - Connect your repository
   - Render will auto-detect `render.yaml`
   - Click "Create Static Site"

## Configuration Details

### Build Settings (from render.yaml)
- **Build Command:** `cd mockups-react && npm install && npm run build`
- **Publish Directory:** `./mockups-react/dist`
- **Environment:** Static

### Route Configuration
The `render.yaml` includes route rewriting to handle React Router:
```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

This ensures all routes (like `/marketplace`, `/cart`, etc.) are redirected to `index.html` for client-side routing.

## Troubleshooting

### If the site doesn't load:

1. **Check Build Logs on Render:**
   - Go to your site dashboard
   - Click on "Logs" tab
   - Look for any build errors

2. **Common Issues:**
   - **404 on routes:** Make sure the route rewriting is enabled in render.yaml
   - **Blank page:** Check browser console (F12) for JavaScript errors
   - **Assets not loading:** Verify the base path is set to '/' in vite.config.js

3. **Force Rebuild:**
   - In Render dashboard, click "Manual Deploy" → "Clear build cache & deploy"

4. **Check Console Errors:**
   - After deployment, open the site
   - Press F12 to open browser DevTools
   - Check Console tab for errors
   - Check Network tab to see if assets are loading

### If you see "Module not found" errors:

Make sure all dependencies are in `package.json`:
```bash
cd mockups-react
npm install
```

## Static Site Features

This app now runs completely in the browser using:
- **localStorage** for data persistence
- **Mock data** from `productImages.js`
- **No backend** required

### Pre-configured Mock Users:
- Username: `farmer1` / Password: `password` (Role: Farmer)
- Username: `dairy1` / Password: `password` (Role: Dairy)
- Username: `msme1` / Password: `password` (Role: MSME)

## File Structure

```
demo/
├── render.yaml              # Render deployment config
└── mockups-react/
    ├── package.json         # Dependencies
    ├── vite.config.js       # Vite build config
    ├── src/
    │   ├── api.js          # Static API (localStorage-based)
    │   ├── main.jsx        # Entry point
    │   └── ...
    ├── public/
    │   └── _redirects      # Route rewriting
    └── dist/               # Build output (generated)
```

## Testing Locally

Before deploying:
```bash
cd mockups-react
npm run build
npm run preview
```

This will build and preview the production site locally on http://localhost:4173

## Need Help?

- Check Render's documentation: https://render.com/docs/static-sites
- Verify your git repository is properly connected
- Ensure all commits are pushed before deploying

