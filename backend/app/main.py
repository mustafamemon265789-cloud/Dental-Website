from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from app.routers import appointments, contact, auth
from app.core.database import engine, Base
import os

app = FastAPI(title="BrightSmile Dental API", version="1.0.0")

# CORS configuration
FRONTEND_URL = os.getenv("FRONTEND_URL", "*")
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

# Include API routers first
app.include_router(appointments.router, prefix="/api/appointments", tags=["appointments"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/api")
async def root():
    return {"message": "BrightSmile Dental API", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Serve static frontend files (must be last)
frontend_build = os.path.join(os.path.dirname(os.path.dirname(__file__)), "admin-dashboard", "dist")
if os.path.exists(frontend_build):
    assets_dir = os.path.join(frontend_build, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        file_path = os.path.join(frontend_build, full_path)
        if full_path and os.path.exists(file_path) and not os.path.isdir(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(frontend_build, "index.html"))
