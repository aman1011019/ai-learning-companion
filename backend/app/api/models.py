from fastapi import APIRouter
from typing import List
from app.schemas.base import ModelMetadata
from app.core.model_router import ModelRouter

router = APIRouter()
model_router = ModelRouter()

@router.get("/models", response_model=List[ModelMetadata])
async def list_models():
    """
    List all available AI models supported by the system.
    """
    return model_router.get_available_models()

@router.get("/models/current")
async def get_current_model_config():
    """
    Get current global configuration (in a real per-user system, this would be user-specific).
    """
    # For MVP, just return default
    return {"current_model": "gemini-pro"}
