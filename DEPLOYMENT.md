# 🚀 Deployment Guide

This guide will help you publish your Stock Trading Strategy Analyzer to GitHub and deploy it online.

## 📦 Publishing to GitHub

### Step 1: Initialize Git Repository

```bash
cd /Users/rhuria/DataDeletion/ETF-UI
git init
git add .
git commit -m "Initial commit: Stock Trading Strategy Analyzer"
```

### Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **+** button in the top right
3. Select **"New repository"**
4. Name it: `stock-trading-analyzer` (or any name you prefer)
5. Keep it **Public** (or Private if you prefer)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

### Step 3: Push to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/stock-trading-analyzer.git
git branch -M main
git push -u origin main
```

## 🌐 Deploying the Application Online

Since this is a full-stack application, you'll need to deploy the frontend and backend separately.

### Option 1: Free Deployment (Recommended)

#### Frontend → Vercel (Free, Easy)
#### Backend → Render (Free, Easy)

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend for Production

Create a production build configuration:

```bash
cd frontend
npm run build
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click **"Add New Project"**
4. Import your GitHub repository
5. Configure build settings:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
6. Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: (You'll get this after deploying backend)
7. Click **"Deploy"**

---

## 🔧 Backend Deployment (Render)

### Step 1: Create `render.yaml` (Already Configured Below)

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name**: `stock-analyzer-api`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: Free
6. Click **"Create Web Service"**
7. Copy your service URL (e.g., `https://stock-analyzer-api.onrender.com`)

### Step 3: Update Frontend with Backend URL

After deploying backend, update your frontend to use the production API:

Create `frontend/.env.production`:
```env
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

Then update `frontend/src/App.js` to use environment variable.

---

## 🚀 Alternative: Deploy Both on Same Platform

### Option A: Railway (Easiest - Both in One)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Railway will auto-detect both Python and Node.js
6. Set up two services (frontend + backend)
7. Done! Both deployed with automatic HTTPS

### Option B: Heroku (Classic)

1. Create two Heroku apps (one for frontend, one for backend)
2. Add Heroku buildpacks
3. Deploy via Git

---

## 📝 Required Files for Deployment

I'll create these files for you automatically.

### For Backend (Render/Heroku):
- `Procfile` - Tells how to run the app
- `runtime.txt` - Specifies Python version
- `gunicorn` added to requirements

### For Frontend:
- Environment variable configuration
- Production build setup

---

## 🔒 Environment Variables

### Backend (Production)
- `FLASK_ENV=production`
- `CORS_ORIGINS=https://your-frontend-url.vercel.app`

### Frontend (Production)
- `REACT_APP_API_URL=https://your-backend-url.onrender.com`

---

## 📊 Cost Breakdown

### Free Tier Options:
- **Vercel (Frontend)**: Free forever
  - Unlimited deployments
  - Automatic HTTPS
  - CDN included

- **Render (Backend)**: Free tier
  - 750 hours/month free
  - May sleep after inactivity (15-30 sec cold start)
  - Automatic HTTPS

- **Railway**: $5 credit/month free
  - Both frontend & backend
  - No sleep mode

### Paid Options (If You Need More):
- Render Pro: $7/month (no sleep mode)
- Vercel Pro: $20/month (more resources)
- Railway: Pay as you go after free credit

---

## 🎯 Recommended Setup for This Project

1. **Frontend**: Vercel (Free, Fast, Easy)
2. **Backend**: Render Free Tier or Railway
3. **Cost**: $0/month (with occasional cold starts)

**OR**

1. **Both**: Railway ($0-5/month, no cold starts)

---

## 📖 Next Steps After Deployment

1. Update README with live demo links
2. Add badges to show build status
3. Set up custom domain (optional)
4. Monitor with Render/Vercel dashboards

---

## 🆘 Troubleshooting Deployment

### Frontend shows "Failed to fetch"
- Check CORS settings in backend
- Verify API URL in frontend environment variables
- Check browser console for exact error

### Backend errors on Render
- Check logs in Render dashboard
- Verify all dependencies in requirements.txt
- Check Python version compatibility

### Cold starts on free tier
- First request may take 15-30 seconds
- Consider upgrading to paid tier if needed
- Or use Railway which has better free tier

---

Need help? Check the documentation or create an issue on GitHub!

