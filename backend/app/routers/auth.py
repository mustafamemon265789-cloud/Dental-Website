from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update
from app.core.database import get_db
from app.core.security import hash_api_key, generate_api_key, verify_api_key
from app.models.api_key import APIKey
from app.schemas.auth import APIKeyCreate, APIKeyResponse, APIKeyVerify, APIKeyVerifyResponse
from datetime import datetime, timezone

router = APIRouter()


@router.post("/create", response_model=APIKeyResponse)
async def create_api_key(
    key_data: APIKeyCreate,
    db: AsyncSession = Depends(get_db)
):
    """Create a new API key (first-time setup)."""
    result = await db.execute(select(APIKey).where(APIKey.is_active == True))
    existing_key = result.scalar_one_or_none()

    if existing_key:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An active API key already exists. Use the rotate endpoint."
        )

    plain_key = generate_api_key()
    hashed_key = hash_api_key(plain_key)

    db_key = APIKey(
        name=key_data.name,
        key_hash=hashed_key
    )
    db.add(db_key)
    await db.commit()
    await db.refresh(db_key)

    return APIKeyResponse(
        id=db_key.id,
        name=db_key.name,
        api_key=plain_key,
        is_active=db_key.is_active,
        created_at=db_key.created_at,
        last_used=db_key.last_used
    )


@router.post("/verify", response_model=APIKeyVerifyResponse)
async def verify_key(
    verify_data: APIKeyVerify,
    db: AsyncSession = Depends(get_db)
):
    """Verify if an API key is valid."""
    result = await db.execute(select(APIKey).where(APIKey.is_active == True))
    api_key_record = result.scalar_one_or_none()

    if not api_key_record:
        return APIKeyVerifyResponse(valid=False, message="No API key configured")

    if verify_api_key(verify_data.api_key, api_key_record.key_hash):
        api_key_record.last_used = datetime.now(timezone.utc)
        await db.commit()
        return APIKeyVerifyResponse(valid=True, message="API key is valid")

    return APIKeyVerifyResponse(valid=False, message="Invalid API key")


@router.post("/rotate", response_model=APIKeyResponse)
async def rotate_api_key(
    key_data: APIKeyCreate,
    x_api_key: str,
    db: AsyncSession = Depends(get_db)
):
    """Rotate the API key (requires valid current key)."""
    result = await db.execute(select(APIKey).where(APIKey.is_active == True))
    old_key = result.scalar_one_or_none()

    if old_key:
        if not verify_api_key(x_api_key, old_key.key_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid API key"
            )
        old_key.is_active = False
        await db.commit()

    plain_key = generate_api_key()
    hashed_key = hash_api_key(plain_key)

    db_key = APIKey(
        name=key_data.name,
        key_hash=hashed_key
    )
    db.add(db_key)
    await db.commit()
    await db.refresh(db_key)

    return APIKeyResponse(
        id=db_key.id,
        name=db_key.name,
        api_key=plain_key,
        is_active=db_key.is_active,
        created_at=db_key.created_at,
        last_used=db_key.last_used
    )


@router.get("/status")
async def get_key_status(
    x_api_key: str,
    db: AsyncSession = Depends(get_db)
):
    """Get API key status (admin only)."""
    result = await db.execute(select(APIKey).where(APIKey.is_active == True))
    key_record = result.scalar_one_or_none()

    if not key_record:
        return {"active": False, "message": "No active API key"}

    if not verify_api_key(x_api_key, key_record.key_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )

    return {
        "active": True,
        "name": key_record.name,
        "created_at": key_record.created_at,
        "last_used": key_record.last_used
    }