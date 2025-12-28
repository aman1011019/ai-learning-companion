from app.agents.base import BaseAgent
from app.schemas.base import AgentInput, AgentOutput

class DiagnosisAgent(BaseAgent):
    """
    Agent responsible for assessing the user's knowledge level on a specific topic.
    """
    
    async def process(self, input_data: AgentInput) -> AgentOutput:
        user_message = input_data.message
        context = input_data.context or {}
        
        system_prompt = (
            "You are a Learning Diagnosis Agent. Your goal is to assess the user's "
            "understanding of the current topic. Analyze their input and categorize "
            "their knowledge level as: Beginner, Intermediate, or Advanced. "
            "Also provide a brief reasoning."
            "\n\nOutput format:\n"
            "Level: [Level]\n"
            "Reasoning: [Reasoning]"
        )
        
        raw_response = await self.call_llm(
            system_prompt=system_prompt,
            user_message=user_message,
            model_id=input_data.selected_model
        )
        
        # In a real system, we'd parse the raw_response into structured data
        # For now, wrap text in AgentOutput
        
        return AgentOutput(
            response=raw_response,
            agent_name="diagnosis_agent",
            metadata={"type": "diagnosis"},
            next_action="update_memory" 
        )
