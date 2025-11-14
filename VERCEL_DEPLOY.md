# 🚀 Vercel Deployment Guide

## Deploy Backend

1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import `stock-trading-analyzer` repository
5. **Important Settings:**
   - Root Directory: `backend`
   - Framework Preset: Other
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Click "Deploy"
7. **Copy your backend URL** (e.g., `https://your-backend.vercel.app`)

## Deploy Frontend

1. In Vercel Dashboard, click "Add New" → "Project"
2. Import `stock-trading-analyzer` repository **again**
3. **Important Settings:**
   - Root Directory: `frontend`
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Environment Variables:**
   - Add: `REACT_APP_API_URL` = `https://your-backend.vercel.app` (use URL from step 1)
5. Click "Deploy"

## Test Your App

Once both deployments are complete:
- Frontend URL: `https://your-frontend.vercel.app`
- Share this URL with your friends! 🎉

## Update After Code Changes

To update after making changes:
```bash
git add .
git commit -m "Your update message"
git push origin master
```

Vercel will automatically redeploy!

---

**Note:** Vercel free tier limits:
- 100 GB bandwidth/month
- 100 serverless function invocations/day
- Should be plenty for sharing with friends!

