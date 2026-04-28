from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class APIKeyCreate(BaseModel):
    name: str


class APIKeyResponse(BaseModel):
    id: int
    name: str
    api_key: str  # Only returned on creation
    is_active: bool
    created_at: datetime
    last_used: Optional[datetime] = None

    class Config:
        from_attributes = True


class APIKeyVerify(BaseModel):
    api_key: str


class APIKeyVerifyResponse(BaseModel):
    valid: bool
    message: str
