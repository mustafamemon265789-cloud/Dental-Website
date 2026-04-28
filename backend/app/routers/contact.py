from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.core.database import get_db
from app.models.contact import ContactMessage
from app.models.api_key import APIKey
from app.schemas.contact import ContactCreate, ContactResponse, ContactUpdate
from app.core.security import verify_api_key

router = APIRouter()


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact_message(message: ContactCreate, db: AsyncSession = Depends(get_db)):
    """Submit a new contact message (public endpoint)."""
    db_message = ContactMessage(**message.model_dump())
    db.add(db_message)
    await db.commit()
    await db.refresh(db_message)
    return db_message


@router.get("", response_model=List[ContactResponse])
async def list_contact_messages(
    x_api_key: str = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """List all contact messages (admin only)."""
    result = await db.execute(select(APIKey).where(APIKey.is_active == True))
    api_key_record = result.scalar_one_or_none()

    if not api_key_record:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No API key configured"
        )

    if not verify_api_key(x_api_key, api_key_record.key_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )

    result = await db.execute(select(ContactMessage).order_by(ContactMessage.created_at.desc()))
    messages = result.scalars().all()
    return messages


@router.patch("/{message_id}", response_model=ContactResponse)
async def update_contact_message(
    message_id: int,
    message_update: ContactUpdate,
    x_api_key: str = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """Update a contact message (admin only)."""
    result = await db.execute(select(APIKey).where(APIKey.is_active == True))
    api_key_record = result.scalar_one_or_none()

    if not api_key_record or not verify_api_key(x_api_key, api_key_record.key_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API key")

    result = await db.execute(select(ContactMessage).where(ContactMessage.id == message_id))
    db_message = result.scalar_one_or_none()

    if not db_message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )

    update_data = message_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_message, field, value)

    await db.commit()
    await db.refresh(db_message)
    return db_message


@router.delete("/{message_id}")
async def delete_contact_message(
    message_id: int,
    x_api_key: str = Header(None),
    db: AsyncSession = Depends(get_db),
):
    """Delete a contact message (admin only)."""
    result = await db.execute(select(APIKey).where(APIKey.is_active == True))
    api_key_record = result.scalar_one_or_none()

    if not api_key_record or not verify_api_key(x_api_key, api_key_record.key_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid API key")

    result = await db.execute(select(ContactMessage).where(ContactMessage.id == message_id))
    db_message = result.scalar_one_or_none()

    if not db_message:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Message not found"
        )

    await db.delete(db_message)
    await db.commit()
    return {"message": "Message deleted successfully"}