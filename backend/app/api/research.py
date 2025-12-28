from fastapi import APIRouter, Body
from typing import List, Dict, Any

router = APIRouter()

# In-memory log store for research mode (persisted to file in real app)
RESEARCH_LOGS = []
RESEARCH_MODE = {"enabled": True}

@router.post("/research/enable")
async def set_research_mode(enabled: bool = Body(..., embed=True)):
    RESEARCH_MODE["enabled"] = enabled
    return {"status": "updated", "research_mode": enabled}

@router.get("/research/logs")
async def get_research_logs():
    return {"logs": RESEARCH_LOGS}

@router.get("/research/compare")
async def compare_models_mock():
    """
    Mock endpoint to demonstrate model comparison data structure.
    """
    return {
        "comparison": [
            {"model": "gemini-pro", "accuracy": 0.85, "speed_ms": 1200},
            {"model": "gpt-4", "accuracy": 0.92, "speed_ms": 2500},
            {"model": "local-research", "accuracy": 0.60, "speed_ms": 400}
        ]
    }
    
def log_research_event(event_type: str, data: Dict[str, Any]):
    if RESEARCH_MODE["enabled"]:
        RESEARCH_LOGS.append({
            "type": event_type, 
            "data": data, 
            "timestamp": "iso-timestamp-placeholder"
        })
