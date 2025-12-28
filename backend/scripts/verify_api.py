import asyncio
import httpx
import sys
import os

BASE_URL = "http://127.0.0.1:8000"

async def test_health():
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(f"{BASE_URL}/health")
            print(f"Health Check: {response.status_code} - {response.json()}")
            return response.status_code == 200
        except Exception as e:
            print(f"Health Check Failed: {e}")
            return False

async def test_models():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{BASE_URL}/api/models")
        print(f"Models List: {response.status_code}")
        print(response.json())
        return response.status_code == 200

async def test_chat_diagnosis():
    async with httpx.AsyncClient() as client:
        payload = {
            "user_id": "test_user",
            "session_id": "sess_1",
            "message": "I want to learn about Quantum Physics.",
            "context": {"target_agent": "diagnosis"}
        }
        response = await client.post(f"{BASE_URL}/api/chat", json=payload, timeout=30.0)
        print(f"Chat (Diagnosis): {response.status_code}")
        print(response.json())
        return response.status_code == 200

async def main():
    print("Running Verification Tests...")
    
    # Wait for server to be up (manual check logic usually, but here we assume running)
    retries = 5
    while retries > 0:
        if await test_health():
            break
        print("Waiting for server...")
        await asyncio.sleep(2)
        retries -= 1
    
    if retries == 0:
        print("Server not reachable.")
        return

    await test_models()
    await test_chat_diagnosis()

if __name__ == "__main__":
    # If running with uvicorn programmatically, we'd do that here.
    # But we'll rely on external uvicorn start.
    asyncio.run(main())
