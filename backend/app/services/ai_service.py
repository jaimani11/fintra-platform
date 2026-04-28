import os
import openai
from fastapi import HTTPException


class AIService:

    @staticmethod
    def generate_text(prompt: str, max_tokens: int = 250) -> str:
        api_key = os.getenv("OPENAI_API_KEY")

        if not api_key:
            raise HTTPException(status_code=500, detail="Missing OPENAI_API_KEY")

        try:
            client = openai.OpenAI(api_key=api_key)

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a CFO-level executive analyst. "
                            "You explain business decisions clearly, concisely, and professionally."
                        )
                    },
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=max_tokens
            )

            return response.choices[0].message.content.strip()

        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"OpenAI error: {type(e).__name__}: {e}"
            )