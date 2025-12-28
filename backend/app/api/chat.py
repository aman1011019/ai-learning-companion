from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.schemas.base import AgentInput, AgentOutput
from app.core.orchestrator import AgentOrchestrator
from app.core.security import get_current_user
from app.db import models
from app.db.database import get_db
from app.services.memory_service import MemoryService
from typing import Optional

# Create global orchestrator (assuming stateless orchestrator logic, 
# dependencies treated per request)
orchestrator = AgentOrchestrator()

router = APIRouter()

@router.post("/chat", response_model=AgentOutput)
async def chat_endpoint(
    input_data: AgentInput, 
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Authenticated Chat Endpoint.
    1. Loads/Creates Chat Session.
    2. Retrieves History.
    3. Calls Orchestrator.
    4. Saves Interaction.
    """
    memory_service = MemoryService(db)
    
    # 1. Resolve Session
    # For MVP, if input has session_id, verify ownership. If not, create new/use default.
    # We will use input_data.session_id as a string literal or ID.
    session_id = input_data.session_id
    
    session = None
    if session_id and session_id.isdigit():
        session = db.query(models.ChatSession).filter(models.ChatSession.id == int(session_id), models.ChatSession.user_id == current_user.id).first()
    
    if not session:
        # Create new session if invalid or missing
        session = memory_service.create_chat_session(current_user.id, title=input_data.message[:30])
        # Update input with new session id so response matches
        input_data.session_id = str(session.id)
    
    # 2. Retrieve History (Context)
    # We can fetch last k messages to pass as context to the agent if needed.
    # For now, we assume the Agent/Orchestrator might want them provided in input_data.context
    history_msgs = memory_service.get_chat_history(session.id)
    history_context = [{"role": m.role, "content": m.content} for m in history_msgs]
    
    if not input_data.context:
        input_data.context = {}
    input_data.context["chat_history"] = history_context[-5:] # Last 5 turns
    input_data.context["user_id"] = str(current_user.id) # Inject real user ID
    
    # Save User Message to DB
    memory_service.add_chat_message(session.id, "user", input_data.message)

    try:
        # 3. Process with Orchestrator
        # Add research mode pref if set in user profile
        if current_user.preferences and current_user.preferences.get("research_mode"):
             input_data.context["research_mode"] = True
             
        response = await orchestrator.route_request(input_data)
        
        # 4. Save Assistant Response to DB
        memory_service.add_chat_message(
            session.id, 
            "assistant", 
            response.response, 
            metadata={"agent_name": response.agent_name, "raw_metadata": response.metadata}
        )
        
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
