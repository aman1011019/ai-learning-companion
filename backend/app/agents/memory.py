from app.agents.base import BaseAgent
from app.schemas.base import AgentInput, AgentOutput
from app.services.memory_service import MemoryService

class MemoryAgent(BaseAgent):
    """
    Agent responsible for managing user memory. 
    It can summarize sessions and store key insights.
    """
    def __init__(self, model_router):
        super().__init__(model_router)
        self.memory_service = MemoryService()

    async def process(self, input_data: AgentInput) -> AgentOutput:
        # Action: 'retrieve' or 'store'
        action = input_data.context.get("action", "retrieve")
        user_id = input_data.user_id
        
        if action == "retrieve":
            memory = self.memory_service.get_user_memory(user_id)
            return AgentOutput(
                response="Memory retrieved successfully.",
                agent_name="memory_agent",
                metadata={"memory": memory}
            )
        
        elif action == "store":
            # If we want to store something, we might use the LLM to summarize it first
            # For now, just direct storage from context 'data'
            data_to_store = input_data.context.get("data", {})
            self.memory_service.update_user_memory(user_id, data_to_store)
            return AgentOutput(
                response="Memory updated successfully.",
                agent_name="memory_agent"
            )
        
        return AgentOutput(response="Unknown memory action.", agent_name="memory_agent")
