from services.memory_service import get_history, save_message, save_profile
from agents.profiler import extract_profile
from agents.recommender import recommend
from services.openai_service import call_openai

CONCIERGE_PROMPT = """You are the ET Concierge — a smart, warm personal guide to the Economic Times ecosystem.
Your job:
1. Learn about the user naturally through conversation (don't interrogate them)
2. Understand their goals, role, and interests
3. Guide them to ET products that genuinely help them

ET products you know about: ET Prime (deep journalism), ET Markets (stocks/MFs),
ET Masterclasses (learning), ET Wealth Summit (networking), ET Rise (entrepreneurs).

Be conversational. Ask one question at a time. Feel like a knowledgeable friend, not a chatbot."""

async def run_orchestrator(session_id: str, message: str) -> dict:
    history = await get_history(session_id)

    await save_message(session_id, "user", message)
    history.append({"role": "user", "content": message})

    profile = await extract_profile(history)
    if profile:
        await save_profile(session_id, profile)

    recommendations = recommend(profile)

    reply = await call_openai(CONCIERGE_PROMPT, history)

    await save_message(session_id, "assistant", reply)

    return {
        "reply": reply,
        "profile": profile,
        "recommendations": recommendations
    }