from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./dental.db"

    # API Key
    SECRET_KEY: str = "your-secret-key-change-in-production"

    # Email (Gmail SMTP)
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USERNAME: Optional[str] = None
    SMTP_PASSWORD: Optional[str] = None
    FROM_EMAIL: Optional[str] = None

    # Environment
    ENVIRONMENT: str = "development"

    # Google OAuth (optional - loaded from os.getenv in auth.py)
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    GOOGLE_REDIRECT_URI: Optional[str] = None
    ALLOWED_ADMIN_EMAILS: Optional[str] = None
    FRONTEND_URL: Optional[str] = None

    class Config:
        env_file = ".env"


settings = Settings()
