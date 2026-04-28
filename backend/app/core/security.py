import bcrypt
from datetime import datetime, timedelta
from typing import Optional
import secrets


def hash_api_key(api_key: str) -> str:
    """Hash an API key using bcrypt."""
    return bcrypt.hashpw(api_key.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_api_key(plain_key: str, hashed_key: str) -> bool:
    """Verify a plain API key against a hashed key."""
    return bcrypt.checkpw(plain_key.encode('utf-8'), hashed_key.encode('utf-8'))


def generate_api_key() -> str:
    """Generate a random API key."""
    return secrets.token_urlsafe(32)
