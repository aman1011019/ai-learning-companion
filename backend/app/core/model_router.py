import os
from typing import List, Optional
import google.generativeai as genai
# from openai import AsyncOpenAI # Uncomment when ready for OpenAI
from app.schemas.base import ModelMetadata

class ModelRouter:
    """
    Handles dynamic switching between AI models (Gemini, GPT, Local).
    Standardizes the interface so agents don't care which model is running.
    """
    
    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY")
        self.openai_key = os.getenv("OPENAI_API_KEY")
        
        # Initialize providers
        if self.gemini_key:
            genai.configure(api_key=self.gemini_key)
        
        self.supported_models = [
            ModelMetadata(id="gemini-pro", provider="google", name="Gemini Pro", description="Google's capable generative model", context_window=32000),
            ModelMetadata(id="gpt-4", provider="openai", name="GPT-4", description="OpenAI's most capable model", context_window=8192),
            ModelMetadata(id="local-research", provider="local", name="Local Research Model", description="Mock local model for experimentation", context_window=4096),
        ]

    def get_available_models(self) -> List[ModelMetadata]:
        return self.supported_models

    async def generate_response(
        self, 
        model_id: str, 
        system_prompt: str, 
        user_message: str,
        temperature: float = 0.7
    ) -> str:
        """
        Unified generation method. Routes to the specific provider.
        """
        
        # Log payload if research mode is on (TODO: Move logging to orchestrated decorator/middleware)
        
        if model_id.startswith("gemini"):
            return await self._call_gemini(model_id, system_prompt, user_message, temperature)
        elif model_id.startswith("gpt"):
            return await self._call_openai(model_id, system_prompt, user_message, temperature)
        elif model_id == "local-research":
            return await self._call_local(system_prompt, user_message)
        else:
            raise ValueError(f"Unknown model_id: {model_id}")

    async def _call_gemini(self, model_id: str, system_prompt: str, user_message: str, temperature: float) -> str:
        if not self.gemini_key:
            return "[Mock] Gemini API Key not found. Response to: " + user_message
            
        try:
            # Gemini Python SDK usually uses 'gemini-pro'
            # Note: System prompts in Gemini 1.0 are often handled via initial context or specific API methods 
            # (GenerativeModel(system_instruction=...)) depending on library version. 
            # We will prepend system prompt for broad compatibility if needed, 
            # or use the new system_instruction param if available.
            
            model = genai.GenerativeModel(model_name=model_id) 
            # Simple combined prompt for now
            full_prompt = f"System: {system_prompt}\n\nUser: {user_message}"
            
            response = await model.generate_content_async(
                full_prompt, 
                generation_config=genai.types.GenerationConfig(temperature=temperature)
            )
            return response.text
        except Exception as e:
            return f"Gemini Error: {str(e)}"

    async def _call_openai(self, model_id: str, system_prompt: str, user_message: str, temperature: float) -> str:
        if not self.openai_key:
            return f"[Mock] OpenAI API Key not found. Selected {model_id}. Response to: {user_message}"
        
        # Mocking actual call for now to avoid dependency crash if library not fully set up
        # client = AsyncOpenAI(api_key=self.openai_key)
        # ...
        return f"[Mock] Real OpenAI call implementation pending. Model: {model_id}"

    async def _call_local(self, system_prompt: str, user_message: str) -> str:
        """
        Simulates a local model response for research/testing.
        """
        return f"[Local Model] Analysis: Processed '{user_message}' with system context length {len(system_prompt)}. Ready for research task."
