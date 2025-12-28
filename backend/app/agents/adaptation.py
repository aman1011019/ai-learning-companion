from app.agents.base import BaseAgent
from app.schemas.base import AgentInput, AgentOutput

class AdaptationAgent(BaseAgent):
    """
    Agent responsible for adapting the learning strategy based on progress.
    """
    
    async def process(self, input_data: AgentInput) -> AgentOutput:
        # Context should contain user progress/history
        progress = input_data.context.get("progress", {})
        
        system_prompt = (
            "You are an Adaptation Strategy Agent. Analyze the user's progress: "
            f"{progress}. Suggest a learning strategy adjustment. "
            "Options: 'Increase Difficulty', 'Decrease Difficulty', 'Switch to Visuals', 'Maintain Pace'."
        )
        
        raw_response = await self.call_llm(
            system_prompt=system_prompt,
            user_message="Analyze my progress and adapt.",
            model_id=input_data.selected_model
        )
        
        return AgentOutput(
            response=raw_response,
            agent_name="adaptation_agent",
            next_action="notify_user"
        )
