from fastapi import APIRouter, Depends, Body, HTTPException
from sqlalchemy.orm import Session
from app.db import models
from app.db.database import get_db
from app.core.security import get_current_user
from typing import Dict, Any

router = APIRouter()

@router.get("/profile")
def get_profile(current_user: models.User = Depends(get_current_user)):
    """
    Get detailed profile with learning stats.
    """
    return {
        "user_id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "preferences": current_user.preferences,
        "memory_profile": current_user.memory_profile
    }

@router.put("/profile/update")
def update_profile(
    preferences: Dict[str, Any] = Body(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    """
    Update user preferences (e.g. model selection, research mode).
    """
    if preferences:
        # Deep merge or replace? For simple JSON, replace top keys.
        current_prefs = dict(current_user.preferences or {})
        current_prefs.update(preferences)
        current_user.preferences = current_prefs
        
        db.add(current_user)
        db.commit()
    
    return {"status": "updated", "preferences": current_user.preferences}
