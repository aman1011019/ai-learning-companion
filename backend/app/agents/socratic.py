from app.agents.base import BaseAgent
from app.schemas.base import AgentInput, AgentOutput

class SocraticAgent(BaseAgent):
    """
    Agent responsible for asking guiding questions (Socratic Method).
    """
    
    async def process(self, input_data: AgentInput) -> AgentOutput:
        user_message = input_data.message
        system_prompt = (
            "You are a Socratic Questioning Agent. Your goal is NOT to give the answer, "
            "but to ask a guiding question that helps the user discover the answer themselves. "
            "Based on the user's last message, formulate a single, thought-provoking question."
        )
        
        raw_response = await self.call_llm(
            system_prompt=system_prompt,
            user_message=user_message,
            model_id=input_data.selected_model
        )
        
        return AgentOutput(
            response=raw_response,
            agent_name="socratic_agent",
            next_action="wait_for_user"
        )
