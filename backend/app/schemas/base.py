from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field
from datetime import datetime

class Message(BaseModel):
    role: Literal["user", "system", "assistant"]
    content: str
    timestamp: datetime = Field(default_factory=datetime.now)

class AgentInput(BaseModel):
    user_id: str
    session_id: str
    message: str
    context: Optional[Dict[str, Any]] = {}
    selected_model: Optional[str] = None

class AgentOutput(BaseModel):
    response: str
    agent_name: str
    metadata: Optional[Dict[str, Any]] = {}
    next_action: Optional[str] = None # e.g., "ask_question", "provide_explanation", "terminate"

class ModelMetadata(BaseModel):
    id: str
    provider: Literal["google", "openai", "local"]
    name: str
    description: str
    context_window: int
