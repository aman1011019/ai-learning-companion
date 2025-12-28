from fastapi import APIRouter
from typing import Dict
from app.services.memory_service import MemoryService

router = APIRouter()
memory_service = MemoryService()

@router.get("/memory/{user_id}")
async def get_memory(user_id: str):
    """
    Retrieve the long-term memory for a specific user.
    """
    return memory_service.get_user_memory(user_id)
