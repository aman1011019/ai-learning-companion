from abc import ABC, abstractmethod
from app.schemas.base import AgentInput, AgentOutput
from app.core.model_router import ModelRouter

class BaseAgent(ABC):
    def __init__(self, model_router: ModelRouter):
        self.model_router = model_router

    @abstractmethod
    async def process(self, input_data: AgentInput) -> AgentOutput:
        """
        Process the input and return a structure output.
        """
        pass
    
    async def call_llm(self, system_prompt: str, user_message: str, model_id: str = None) -> str:
        """
        Helper to call the model router.
        """
        # Default to a configured default or the input's preference
        selected_model = model_id or "gemini-pro"
        return await self.model_router.generate_response(selected_model, system_prompt, user_message)
