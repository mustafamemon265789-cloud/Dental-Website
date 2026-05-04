from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import appointments, contact, auth
from app.core.database import engine, Base
from sqlalchemy import text

app = FastAPI(title="BrightSmile Dental API", version="1.0.0")

# CORS configuration
import os
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")
allow_origins = [FRONTEND_URL] if FRONTEND_URL != "*" else ["*"]
if FRONTEND_URL == "*":
    allow_origins = ["*"]
else:
    allow_origins = [FRONTEND_URL, "http://localhost:5173", "http://localhost:5174"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(appointments.router, prefix="/api/appointments", tags=["appointments"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


@app.get("/")
async def root():
    return {"message": "BrightSmile Dental API", "version": "1.0.0"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}