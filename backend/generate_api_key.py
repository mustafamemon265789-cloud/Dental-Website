"""
Generate a new API key for admin dashboard.
Run this script to create a new key and save it to a file.
"""

import asyncio
import sys
sys.path.append('.')

from app.core.security import generate_api_key, hash_api_key
from app.core.database import engine
from app.models.api_key import APIKey
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker

async def generate_key():
    # Generate new key
    plain_key = generate_api_key()
    hashed_key = hash_api_key(plain_key)
    
    # Save to database
    async with engine.begin() as conn:
        from sqlalchemy import text
        # Deactivate old keys
        await conn.execute(text("UPDATE api_keys SET is_active = 0 WHERE is_active = 1"))
        # Insert new key
        await conn.execute(
            text("INSERT INTO api_keys (name, key_hash, is_active) VALUES (:name, :hash, 1)"),
            {"name": "Admin Key", "hash": hashed_key}
        )
    
    # Save to file for easy access
    with open('admin_api_key.txt', 'w') as f:
        f.write(f"API Key: {plain_key}\n")
        f.write(f"Save this key! It won't be shown again.\n")
    
    print(f"✓ New API key generated!")
    print(f"✓ Key: {plain_key}")
    print(f"✓ Saved to: admin_api_key.txt")
    print(f"\nUse this key to log in to the admin dashboard.")

asyncio.run(generate_key())
