from app.agents.base import BaseAgent
from app.schemas.base import AgentInput, AgentOutput

class ExplanationAgent(BaseAgent):
    """
    Agent responsible for explaining concepts tailored to the user's level.
    """
    
    async def process(self, input_data: AgentInput) -> AgentOutput:
        user_message = input_data.message
        context = input_data.context or {}
        user_level = context.get("user_level", "Beginner") # Default to Beginner if unknown
        
        system_prompt = (
            f"You are a Concept Explanation Agent. The user is at the '{user_level}' level. "
            "Provide a clear, accurate, and engaging explanation of the concept requested. "
            "Use analogies suitable for their level. "
            "Avoid jargon unless explained."
        )
        
        raw_response = await self.call_llm(
            system_prompt=system_prompt,
            user_message=user_message,
            model_id=input_data.selected_model
        )
        
        return AgentOutput(
            response=raw_response,
            agent_name="explanation_agent",
            metadata={"user_level": user_level},
            next_action="check_understanding" # Suggests triggering Socratic agent next
        )
