from sqlalchemy.orm import Session
from typing import Dict, Any, List
from app.db import models
from app.db.database import get_db

class MemoryService:
    """
    Persistence for memory using Database (SQLAlchemy).
    """
    def __init__(self, db: Session = None):
        self.db = db

    def get_user_memory(self, user_id: int) -> Dict[str, Any]:
        """
        Retrieves user's long-term memory profile.
        """
        if not self.db:
            return {}
        
        user = self.db.query(models.User).filter(models.User.id == user_id).first()
        if user:
            return user.memory_profile or {}
        return {}

    def update_user_memory(self, user_id: int, data: Dict[str, Any]):
        """
        Updates specific fields in user's memory profile.
        """
        if not self.db:
            return

        user = self.db.query(models.User).filter(models.User.id == user_id).first()
        if user:
            current_profile = dict(user.memory_profile or {})
            
            # Merge logic
            for k, v in data.items():
                if k == "topics_learned" and isinstance(v, list):
                    # Dedup append
                    current_set = set(current_profile.get("topics_learned", []))
                    current_set.update(v)
                    current_profile["topics_learned"] = list(current_set)
                elif k == "weak_areas" and isinstance(v, list):
                    current_set = set(current_profile.get("weak_areas", []))
                    current_set.update(v)
                    current_profile["weak_areas"] = list(current_set)
                elif isinstance(v, dict) and k == "progress":
                     current_profile.setdefault("progress", {}).update(v)
                else:
                    current_profile[k] = v
            
            user.memory_profile = current_profile
            self.db.add(user)
            self.db.commit()

    def create_chat_session(self, user_id: int, title: str = "New Chat") -> models.ChatSession:
        session = models.ChatSession(user_id=user_id, title=title)
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return session

    def add_chat_message(self, session_id: int, role: str, content: str, metadata: Dict = {}) -> models.ChatMessage:
        msg = models.ChatMessage(
            session_id=session_id,
            role=role,
            content=content,
            metadata_json=metadata
        )
        self.db.add(msg)
        self.db.commit()
        self.db.refresh(msg)
        return msg
    
    def get_chat_history(self, session_id: int, limit: int = 10) -> List[models.ChatMessage]:
        return self.db.query(models.ChatMessage)\
            .filter(models.ChatMessage.session_id == session_id)\
            .order_by(models.ChatMessage.timestamp.asc())\
            .all() # In real app, might limit recent k
