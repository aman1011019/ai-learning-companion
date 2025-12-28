import asyncio
import httpx
import sys
import random

BASE_URL = "http://127.0.0.1:8000"

async def test_auth_flow():
    print(f"\n--- Testing Auth Flow ---")
    async with httpx.AsyncClient(base_url=BASE_URL) as client:
        # 1. Register
        email = f"testuser_{random.randint(1000,9999)}@example.com"
        password = "strongpassword"
        payload = {"email": email, "password": password, "full_name": "Test User"}
        
        reg_resp = await client.post("/api/auth/register", json=payload)
        print(f"Register: {reg_resp.status_code}")
        if reg_resp.status_code != 200:
            print(f"Register failed: {reg_resp.text}")
            return None, None

        token_data = reg_resp.json()
        access_token = token_data["access_token"]
        user_id = token_data["user_id"]
        print(f"Got Token: {access_token[:15]}... UserID: {user_id}")

        # 2. Login (Double check)
        login_data = {"username": email, "password": password}
        login_resp = await client.post("/api/auth/login", data=login_data) # OAuth2 form data
        print(f"Login: {login_resp.status_code}")
        
        # 3. Check Me
        headers = {"Authorization": f"Bearer {access_token}"}
        me_resp = await client.get("/api/auth/me", headers=headers)
        print(f"Me: {me_resp.status_code} - {me_resp.json()['email']}")
        
        return access_token, user_id

async def test_stateful_chat(token, user_id):
    print(f"\n--- Testing Stateful Chat ---")
    headers = {"Authorization": f"Bearer {token}"}
    async with httpx.AsyncClient(base_url=BASE_URL, headers=headers, timeout=30.0) as client:
        
        # 1. First Turn
        chat_payload = {
            "user_id": str(user_id), # Legacy field, but auth user used primarily
            "session_id": "", # New session
            "message": "Hi, my name is Alice.",
            "context": {}
        }
        resp1 = await client.post("/api/chat", json=chat_payload)
        print(f"Chat Turn 1: {resp1.status_code}")
        if resp1.status_code != 200:
            print(f"Failed: {resp1.text}")
            return
            
        # Parse session
        # (For MVP the response AgentOutput might not strictly return the session_id unless we update Schema or Context injection.
        # But our upgraded endpoint injected it back? Wait, the schema AgentOutput doesn't have session_id field explicitly.)
        # However, we can check if it persists by memory endpoint or profile.
        
        # 2. Check Memory/Profile update
        # We can update profile preferences
        pref_payload = {"preferences": {"active_model": "gpt-4"}}
        pref_resp = await client.put("/api/profile/update", json=pref_payload)
        print(f"Profile Update: {pref_resp.status_code}")

        # 3. Get Profile to verify
        prof_resp = await client.get("/api/profile")
        print(f"Profile Get: {prof_resp.json()['preferences']}")

async def main():
    token, user_id = await test_auth_flow()
    if token:
        await test_stateful_chat(token, user_id)
    else:
        print("Skipping chat test due to auth fail.")

if __name__ == "__main__":
    asyncio.run(main())
