from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.models.appointment import Appointment
from app.models.api_key import APIKey
from app.schemas.appointment import AppointmentCreate, AppointmentResponse
import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.core.config import settings

router = APIRouter()


async def send_confirmation_email(appointment_data: dict):
    """Send appointment confirmation email."""
    if not settings.SMTP_USERNAME or not settings.SMTP_PASSWORD:
        return

    msg = MIMEMultipart()
    msg["From"] = settings.FROM_EMAIL or settings.SMTP_USERNAME
    msg["To"] = appointment_data["email"]
    msg["Subject"] = "Appointment Request Received - BrightSmile Dental"

    body = f"""
    Dear {appointment_data['first_name']} {appointment_data['last_name']},

    Thank you for requesting an appointment with BrightSmile Dental.

    Appointment Details:
    - Service: {appointment_data['service']}
    - Preferred Date: {appointment_data['preferred_date']}
    - Preferred Time: {appointment_data['preferred_time']}

    Our team will contact you within 2 hours to confirm your appointment.

    For emergencies, please call us at (555) 123-4567.

    Best regards,
    BrightSmile Dental Team
    """

    msg.attach(MIMEText(body, "plain"))

    try:
        await aiosmtplib.send(
            msg,
            hostname=settings.SMTP_HOST,
            port=settings.SMTP_PORT,
            username=settings.SMTP_USERNAME,
            password=settings.SMTP_PASSWORD,
            start_tls=True,
        )
    except Exception as e:
        print(f"Failed to send email: {e}")


async def get_api_key_dependency(x_api_key: str = Header(None), db: AsyncSession = None):
    """Verify API key for admin routes."""
    result = await db.execute(select(APIKey).where(APIKey.is_active == True))
    api_key_record = result.scalar_one_or_none()

    if not api_key_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No API key configured. Contact administrator."
        )

    from app.core.security import verify_api_key
    if not verify_api_key(x_api_key, api_key_record.key_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    return api_key_record


@router.post("", response_model=AppointmentResponse, status_code=status.HTTP_201_CREATED)
async def create_appointment(appointment: AppointmentCreate, db: AsyncSession = Depends(get_db)):
    """Create a new appointment request (public endpoint)."""
    db_appointment = Appointment(**appointment.model_dump())
    db.add(db_appointment)
    await db.commit()
    await db.refresh(db_appointment)

    appointment_data = {
        "first_name": db_appointment.first_name,
        "last_name": db_appointment.last_name,
        "email": db_appointment.email,
        "service": db_appointment.service,
        "preferred_date": db_appointment.preferred_date,
        "preferred_time": db_appointment.preferred_time,
    }

    try:
        await send_confirmation_email(appointment_data)
    except Exception:
        pass

    return db_appointment


@router.get("", response_model=List[AppointmentResponse])
async def list_appointments(
    x_api_key: str = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """List all appointments (admin only)."""
    await get_api_key_dependency(x_api_key, db)
    result = await db.execute(select(Appointment).order_by(Appointment.created_at.desc()))
    appointments = result.scalars().all()
    return appointments


@router.get("/{appointment_id}", response_model=AppointmentResponse)
async def get_appointment(
    appointment_id: int,
    x_api_key: str = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """Get a specific appointment by ID (admin only)."""
    await get_api_key_dependency(x_api_key, db)
    result = await db.execute(select(Appointment).where(Appointment.id == appointment_id))
    appointment = result.scalar_one_or_none()

    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )
    return appointment


@router.delete("/{appointment_id}")
async def delete_appointment(
    appointment_id: int,
    x_api_key: str = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """Delete/cancel an appointment (admin only)."""
    await get_api_key_dependency(x_api_key, db)
    result = await db.execute(select(Appointment).where(Appointment.id == appointment_id))
    appointment = result.scalar_one_or_none()

    if not appointment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Appointment not found"
        )

    await db.delete(appointment)
    await db.commit()
    return {"message": "Appointment deleted successfully"}