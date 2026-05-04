# BrightSmile Dental Website

## Quick Start Commands

### 1. Generate API Key (First Time Setup)
```bash
cd backend
.\venv\Scripts\Activate.ps1
python generate_api_key.py
```
**Your API Key will be saved to:** `backend/admin_api_key.txt`

---

### 2. Start Backend Server
```bash
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --reload --port 8000
```
**Backend URL:** http://127.0.0.1:8000

---

### 3. Start Frontend (Admin Dashboard)
```bash
cd backend/admin-dashboard
npm run dev
```
**Frontend URL:** http://localhost:5173 (or http://localhost:5174)

---

### 4. Login to Admin Dashboard
1. Open browser: `http://localhost:5173/login`
2. Enter API Key: `jZFBzj95wKjoQAXUkM1noxkUWsBoa2ofDWBqzRxfRqo`
3. Click **Login**
4. You stay logged in permanently (saved in browser localStorage)

---

## Deploy to Production

### Backend (Railway)
```bash
cd backend
railway login
railway init
railway up
```
See [DEPLOYMENT.md](DEPLOYMENT.md) for full guide.

### Frontend (Vercel)
```bash
cd backend/admin-dashboard
vercel login
vercel --prod
```
Set `VITE_API_URL` in Vercel to your Railway backend URL.

**Quick deploy:** Run `deploy.bat` for interactive deployment.

---

## All Commands Reference

### Backend Commands
```bash
# Activate virtual environment
cd backend
.\venv\Scripts\Activate.ps1

# Start server
uvicorn app.main:app --reload --port 8000

# Generate new API key
python generate_api_key.py

# Install dependencies
pip install -r requirements.txt
```

### Frontend Commands
```bash
cd backend/admin-dashboard

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Test Commands
```bash
cd backend/admin-dashboard

# Run Playwright test (auto-login)
npx playwright test tests/auto-login.spec.js

# Run test with UI
npx playwright test --ui
```

---

## API Key
**Current API Key:** `jZFBzj95wKjoQAXUkM1noxkUWsBoa2ofDWBqzRxfRqo`

**Saved in:** `backend/admin_api_key.txt`

---

## Project Structure
```
dental-website/
├── backend/
│   ├── app/
│   │   ├── routers/       # API routes (auth, appointments, contact)
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   └── core/          # Config, database, security
│   ├── admin-dashboard/   # React frontend
│   ├── dental.db          # SQLite database
│   ├── generate_api_key.py
│   ├── Procfile           # Railway config
│   └── railway.json       # Railway config
├── README.md
├── DEPLOYMENT.md          # Full deployment guide
└── deploy.bat             # Quick deploy script
```

---

## Troubleshooting

### Backend won't start
- Check if port 8000 is free: `netstat -ano | findstr :8000`
- Check `.env` file exists in backend folder

### Frontend won't start
- Delete `node_modules` and run `npm install`
- Check if port 5173/5174 is free

### Can't login
- Run `python generate_api_key.py` to create new key
- Check key in `admin_api_key.txt`
- Clear browser localStorage and try again
