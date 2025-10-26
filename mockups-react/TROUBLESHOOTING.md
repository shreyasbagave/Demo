# Troubleshooting Guide - Not Rendering on Render

## Quick Diagnostic Steps

### 1. Check Browser Console (MOST IMPORTANT)
After deploying to Render:
1. Open your deployed site URL
2. Press `F12` to open Developer Tools
3. Click on **Console** tab
4. Look for red error messages
5. Take a screenshot and share it if you need help

**Common console errors and fixes:**

#### "Failed to fetch dynamically imported module"
- **Cause:** Asset paths are incorrect
- **Fix:** Clear build cache on Render and redeploy

#### "Uncaught SyntaxError: Unexpected token '<'"
- **Cause:** JS files are returning HTML (404 errors)
- **Fix:** Check that `staticPublishPath` in render.yaml points to `./mockups-react/dist`

#### "Cannot read properties of null (reading 'id')"
- **Cause:** Data not loading from localStorage
- **Fix:** Check if localStorage is accessible (some browsers block it)

### 2. Check Network Tab
1. In Developer Tools, click **Network** tab
2. Reload the page
3. Look for red/failed requests
4. Check if `index.html`, CSS, and JS files are loading (should show 200 status)

**What to look for:**
- ✅ `index.html` → Status: 200
- ✅ `/assets/index-*.js` → Status: 200
- ✅ `/assets/index-*.css` → Status: 200
- ❌ Any 404 errors → Asset path problem

### 3. Check Render Build Logs
1. Go to your Render dashboard
2. Click on your static site
3. Click **Logs** tab
4. Look for:
   - ✅ "Build successful"
   - ❌ "npm ERR!" → Dependency issue
   - ❌ "Module not found" → Missing dependency

### 4. Verify Deployment Settings
In Render dashboard, check:
- **Build Command:** Should be `cd mockups-react && npm install && npm run build`
- **Publish Directory:** Should be `./mockups-react/dist`
- **Environment:** Should be "Static"

## Common Issues & Solutions

### Issue: Blank/White Page

**Possible Causes:**
1. JavaScript error preventing app from loading
2. Wrong publish directory
3. Base path incorrect

**Solutions:**
```bash
# 1. Check console for errors (see step 1 above)

# 2. Verify build output locally
cd mockups-react
npm run build
npm run preview
# Visit http://localhost:4173 - does it work?

# 3. Clear cache and redeploy on Render
# In Render dashboard: Manual Deploy → Clear build cache & deploy
```

### Issue: 404 on Navigation

**Symptoms:** 
- Homepage loads
- Clicking links gives 404 error
- Direct URL navigation fails

**Solution:**
The `render.yaml` should have (already configured):
```yaml
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```

If still not working:
1. Check if `render.yaml` is at repository root
2. Make sure it's committed to git
3. Redeploy

### Issue: Assets Not Loading (CSS/JS)

**Symptoms:**
- Page loads but no styling
- Console shows "Failed to load resource"

**Solutions:**

1. **Check vite.config.js has correct base:**
   ```js
   export default defineConfig({
     base: '/',  // ← Should be '/'
     // ...
   })
   ```

2. **Rebuild and commit:**
   ```bash
   cd mockups-react
   npm run build
   git add .
   git commit -m "Fix asset paths"
   git push
   ```

### Issue: "Module not found" during build

**Solution:**
```bash
cd mockups-react
rm -rf node_modules package-lock.json
npm install
npm run build
git add package-lock.json
git commit -m "Update dependencies"
git push
```

## Testing Locally Before Deploy

Always test the production build locally:

```bash
# From repository root
cd mockups-react

# Build production version
npm run build

# Preview production build
npm run preview

# Visit http://localhost:4173
# Test all routes:
# - http://localhost:4173/
# - http://localhost:4173/marketplace
# - http://localhost:4173/cart
# etc.
```

If it works locally but not on Render, the issue is with deployment configuration.

## Debug Checklist

Run through this checklist:

- [ ] Opened deployed site in browser
- [ ] Opened DevTools Console (F12)
- [ ] Checked for error messages in Console
- [ ] Checked Network tab for 404 errors
- [ ] Verified build logs on Render show success
- [ ] Confirmed publish directory is `./mockups-react/dist`
- [ ] Tested production build locally with `npm run preview`
- [ ] Verified `render.yaml` is committed and in repository root
- [ ] Cleared build cache on Render and redeployed

## Still Not Working?

### Get Detailed Error Information

1. **Copy ALL console errors:**
   - Open Console (F12)
   - Right-click → Save as... or copy all text
   - Share the errors

2. **Check the actual deployed files:**
   - View source (right-click → View Page Source)
   - Check if the HTML looks correct
   - Verify script and CSS paths

3. **Share your Render URL:**
   - So someone can check the live site
   - Check console errors directly

### Emergency Fallback: Use HashRouter

If all else fails, you can switch to HashRouter (works without server-side routing):

**mockups-react/src/main.jsx:**
```jsx
import { HashRouter } from 'react-router-dom'

// Change BrowserRouter to HashRouter
<HashRouter>
  <Routes>
    {/* ... routes ... */}
  </Routes>
</HashRouter>
```

This will use `#` in URLs (e.g., `site.com/#/marketplace`) but requires no server configuration.

## Expected Console Output

When the app loads successfully, you should see:
```
App initializing...
Location: https://your-site.onrender.com/
Base URL: https://your-site.onrender.com/
Root element found, rendering app...
App rendered successfully
```

If you don't see these messages, the JavaScript isn't loading.

## Contact Points

1. **Check Render's status:** https://status.render.com/
2. **Render community:** https://community.render.com/
3. **Verify your repository is accessible:** Make sure Render can pull from your git repo

---

**Remember:** 90% of issues are visible in the browser console (F12). Always check there first!

