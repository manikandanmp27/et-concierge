import os
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def call_openai(system: str, messages: list, json_mode: bool = False) -> str:
    kwargs = {
        "model": "gpt-4o",
        "messages": [{"role": "system", "content": system}] + messages,
        "max_tokens": 1000,
        "temperature": 0.7,
    }
    if json_mode:
        kwargs["response_format"] = {"type": "json_object"}

    response = await client.chat.completions.create(**kwargs)
    return response.choices[0].message.content