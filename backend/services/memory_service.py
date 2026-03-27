import os
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient(os.getenv("MONGODB_URI"))
db = client[os.getenv("DB_NAME", "et_concierge")]

async def get_history(session_id: str) -> list:
    doc = await db.sessions.find_one({"session_id": session_id})
    if not doc:
        return []
    return doc.get("messages", [])

async def save_message(session_id: str, role: str, content: str):
    await db.sessions.update_one(
        {"session_id": session_id},
        {"$push": {"messages": {"role": role, "content": content}}},
        upsert=True
    )

async def save_profile(session_id: str, profile: dict):
    await db.sessions.update_one(
        {"session_id": session_id},
        {"$set": {"profile": profile}},
        upsert=True
    )

async def get_profile(session_id: str) -> dict:
    doc = await db.sessions.find_one({"session_id": session_id})
    if not doc:
        return {"session_id": session_id, "profile": {}, "message_count": 0}
    return {
        "session_id": session_id,
        "profile": doc.get("profile", {}),
        "message_count": len(doc.get("messages", []))
    }