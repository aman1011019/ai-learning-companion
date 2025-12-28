from typing import Dict
from app.schemas.base import AgentInput, AgentOutput
from app.core.model_router import ModelRouter
from app.agents.base import BaseAgent

from app.agents.diagnosis import DiagnosisAgent
from app.agents.explanation import ExplanationAgent
from app.agents.socratic import SocraticAgent
from app.agents.memory import MemoryAgent
from app.agents.adaptation import AdaptationAgent

class AgentOrchestrator:
    def __init__(self):
        self.model_router = ModelRouter()
        self.agents: Dict[str, BaseAgent] = {}
        
        # Register Agents
        self.register_agent("diagnosis", DiagnosisAgent(self.model_router))
        self.register_agent("explanation", ExplanationAgent(self.model_router))
        self.register_agent("socratic", SocraticAgent(self.model_router))
        self.register_agent("memory", MemoryAgent(self.model_router))
        self.register_agent("adaptation", AdaptationAgent(self.model_router))

    def register_agent(self, name: str, agent: BaseAgent):
        self.agents[name] = agent

    async def route_request(self, input_data: AgentInput) -> AgentOutput:
        """
        Determines which agent should handle the request.
        For MVP, we might use a simple keyword or metadata field, 
        or a 'Router Agent' (LLM based) to decide.
        """
        
        # 1. Simple routing strategy based on context or explicit intent
        # (This is a placeholder logic until specific agents are built)
        
        target_agent_name = input_data.context.get("target_agent", "general")
        
        if target_agent_name in self.agents:
             return await self.agents[target_agent_name].process(input_data)
        
        # Fallback / General routing logic
        # For now, if no agent matches, return a default system response
        
        # If we have a 'Socratic' agent or 'Chat' agent, default to that.
        # For now, return a stub.
        
        return AgentOutput(
            response=f"Orchestrator: No specific agent found for '{target_agent_name}'. Available: {list(self.agents.keys())}",
            agent_name="orchestrator",
            metadata={"status": "fallback"}
        )

    def get_available_models(self):
        return self.model_router.get_available_models()
