import json
from services.openai_service import call_openai

SYSTEM = """You are an expert at understanding people from conversation.
Extract a JSON profile with these exact fields:
{
  "role": "student | investor | entrepreneur | professional | other",
  "experience_level": "beginner | intermediate | expert",
  "interests": ["list", "of", "topics"],
  "financial_goals": "wealth building | trading | learning | networking | other",
  "location_tier": "metro | tier2 | other"
}
Return ONLY valid JSON. No explanation. No markdown. If unsure, make your best guess."""

async def extract_profile(messages: list) -> dict:
    try:
        raw = await call_openai(SYSTEM, messages, json_mode=True)
        return json.loads(raw)
    except Exception:
        return {}