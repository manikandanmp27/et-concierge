import os
from google import genai
from google.genai import types

# Initialize the Gemini native client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

async def call_openai(system: str, messages: list, json_mode: bool = False) -> str:
    # Format messages into a clear conversation transcript for native Gemini
    prompt = f"System Instructions:\n{system}\n\nConversation History:\n"
    for m in messages:
        role = "User" if m["role"] == "user" else "Assistant"
        prompt += f"{role}: {m['content']}\n\n"
    
    prompt += "Assistant: "

    config = types.GenerateContentConfig(
        temperature=0.7,
        max_output_tokens=1000,
    )
    
    if json_mode:
        config.response_mime_type = "application/json"

    response = await client.aio.models.generate_content(
        model='gemini-2.5-flash',
        contents=prompt,
        config=config
    )
    
    return response.text