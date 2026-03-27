from fastapi import APIRouter
from pydantic import BaseModel
from agents.orchestrator import run_orchestrator
from services.memory_service import get_profile

router = APIRouter()

class ChatRequest(BaseModel):
    session_id: str
    message: str

@router.post("/chat")
async def chat(req: ChatRequest):
    result = await run_orchestrator(req.session_id, req.message)
    return result

@router.get("/profile/{session_id}")
async def profile(session_id: str):
    data = await get_profile(session_id)
    return data