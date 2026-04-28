from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class AppointmentBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    preferred_date: str
    preferred_time: str
    service: str
    notes: Optional[str] = None


class AppointmentCreate(AppointmentBase):
    pass


class AppointmentResponse(AppointmentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
