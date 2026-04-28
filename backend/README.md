# BrightSmile Dental Backend

FastAPI backend for the BrightSmile Dental website with appointment booking, contact form handling, and admin dashboard.

## Features

- **Appointment Management** - Create and manage patient appointments
- **Contact Form** - Handle patient inquiries
- **API Key Authentication** - Secure admin access
- **Email Notifications** - Appointment confirmations via Gmail SMTP
- **Admin Dashboard** - React-based admin interface
- **CSV Export** - Export appointments data

## Tech Stack

- **Backend**: FastAPI, SQLAlchemy, Pydantic
- **Database**: PostgreSQL
- **Authentication**: API Key-based
- **Email**: Gmail SMTP (aiosmtplib)
- **Admin UI**: React + Vite
- **Deployment**: Railway

## Getting Started

### Prerequisites

- Python 3.11+
- PostgreSQL
- Node.js 18+ (for admin dashboard)

### Local Development

1. **Clone and setup backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
```

2. **Configure environment:**
```bash
cp .env.example .env
# Edit .env with your settings
```

3. **Set up PostgreSQL:**
```bash
# Create database
createdb dental_website
```

4. **Run backend:**
```bash
uvicorn app.main:app --reload --port 8000
```

5. **Setup admin dashboard:**
```bash
cd admin-dashboard
npm install
cp .env.example .env
npm run dev
```

6. **Create API key (first-time setup):**
```bash
curl -X POST http://localhost:8000/api/auth/create \
  -H "Content-Type: application/json" \
  -d '{"name": "Admin Dashboard"}'
```

Save the returned API key - you'll need it to access the admin dashboard.

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Create appointment |
| POST | `/api/contact` | Submit contact message |

### Admin Endpoints (require X-API-Key header)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | List all appointments |
| GET | `/api/appointments/:id` | Get appointment details |
| DELETE | `/api/appointments/:id` | Cancel appointment |
| GET | `/api/contact` | List all messages |
| PATCH | `/api/contact/:id` | Mark message as read |
| DELETE | `/api/contact/:id` | Delete message |
| POST | `/api/auth/verify` | Verify API key |
| POST | `/api/auth/rotate` | Rotate API key |
| GET | `/api/auth/status` | Get API key status |

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://postgres:postgres@localhost:5432/dental_website` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USERNAME` | Gmail address | - |
| `SMTP_PASSWORD` | Gmail app password | - |
| `FROM_EMAIL` | Sender email | - |
| `ENVIRONMENT` | Environment name | `development` |

### Gmail App Password

To use Gmail SMTP:

1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate an App Password at: https://myaccount.google.com/apppasswords
4. Use the app password in `SMTP_PASSWORD`

## Deploying to Railway

1. **Push code to GitHub**

2. **Create new project on Railway:**
   - Go to https://railway.app
   - Click "New Project"
   - Select your GitHub repo

3. **Add PostgreSQL:**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway automatically sets `DATABASE_URL`

4. **Configure environment variables:**
   - Add SMTP variables from `.env.example`
   - Set `PORT` variable (Railway provides this automatically)

5. **Deploy:**
   - Railway automatically deploys on push
   - View logs and monitor from dashboard

## Admin Dashboard

Access the admin dashboard at `http://localhost:5173` (dev) or your Railway URL.

Features:
- Dashboard with stats overview
- Appointments management with filtering and CSV export
- Contact messages inbox with read/unread status
- API key management (rotate keys)

## Project Structure

```
backend/
├── app/
│   ├── core/
│   │   ├── config.py      # Environment configuration
│   │   ├── database.py    # Database connection
│   │   └── security.py    # API key hashing/verification
│   ├── models/
│   │   ├── appointment.py # Appointment model
│   │   ├── contact.py     # Contact message model
│   │   └── api_key.py     # API key model
│   ├── schemas/
│   │   ├── appointment.py # Pydantic schemas
│   │   ├── contact.py
│   │   └── auth.py
│   ├── routers/
│   │   ├── appointments.py # Appointment endpoints
│   │   ├── contact.py      # Contact endpoints
│   │   └── auth.py         # Auth endpoints
│   └── main.py            # FastAPI app initialization
├── admin-dashboard/       # React admin UI
├── requirements.txt
├── .env.example
└── railway.json
```

## License

MIT
