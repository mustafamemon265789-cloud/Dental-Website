# Deployment Guide

## Backend (Railway)

### 1. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

### 2. Deploy Backend
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
cd backend
railway init

# Set environment variables
railway variables set DATABASE_URL=${{SQLite}}
railway variables set SECRET_KEY=your-production-secret-key

# Deploy
railway up
```

### 3. Get Backend URL
After deployment, copy your backend URL from Railway dashboard (e.g., `https://your-app.railway.app`)

---

## Frontend (Vercel)

### 1. Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

### 2. Deploy Frontend
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend folder
cd backend/admin-dashboard
vercel

# For production
vercel --prod
```

### 3. Set Environment Variables in Vercel
Go to Vercel Dashboard → Project Settings → Environment Variables:
```
VITE_API_URL=https://your-backend.railway.app/api
```

### 4. Update CORS in Backend
After getting frontend URL, update `backend/app/main.py`:
```python
allow_origins=["https://your-frontend.vercel.app", "http://localhost:5173"]
```

---

## Quick Deploy (Recommended)

### Option 1: Railway (Backend) + Vercel (Frontend)
1. Push code to GitHub
2. Connect GitHub repo to Railway (select `backend` folder)
3. Connect GitHub repo to Vercel (select `backend/admin-dashboard` folder)
4. Set environment variables in both platforms

### Option 2: All on Railway
Railway can host both backend and frontend together.

---

## Environment Variables Summary

### Backend (Railway)
```
DATABASE_URL=sqlite+aiosqlite:///./dental.db
SECRET_KEY=your-secret-key-change-this
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend.railway.app/api
```

---

## Post-Deployment

1. Generate API key on Railway:
   ```bash
   railway run python generate_api_key.py
   ```

2. Visit: `https://your-frontend.vercel.app/login`

3. Enter the generated API key

4. You're live! 🎉
