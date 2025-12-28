import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from app.api import chat, models, memory, research, auth, profile
from app.db.database import engine, Base

# Create tables on startup (for MVP)
Base.metadata.create_all(bind=engine)

# Load environment variables
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize resources (db, etc. if needed)
    print("Starting up Agentic AI Backend...")
    yield
    # Shutdown: Clean up resources
    print("Shutting down...")

app = FastAPI(
    title="Agentic Learning Intelligence System",
    description="Backend for AI Research & Learning Companion",
    version="0.1.0",
    lifespan=lifespan
)

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",
    "*", # Allow all for research/testing convenience
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(models.router, prefix="/api", tags=["Models"])
app.include_router(memory.router, prefix="/api", tags=["Memory"])
app.include_router(research.router, prefix="/api", tags=["Research"])
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(profile.router, prefix="/api", tags=["Profile"])

@app.get("/health")
async def health_check():
    return {
        "status": "healthy", 
        "environment": os.getenv("ENVIRONMENT", "unknown"),
        "research_mode": os.getenv("RESEARCH_MODE_ENABLED", "false")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
