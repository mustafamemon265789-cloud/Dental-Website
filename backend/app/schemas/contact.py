from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ContactBase(BaseModel):
    name: str
    email: str
    message: str


class ContactCreate(ContactBase):
    pass


class ContactResponse(ContactBase):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ContactUpdate(BaseModel):
    is_read: Optional[bool] = None
