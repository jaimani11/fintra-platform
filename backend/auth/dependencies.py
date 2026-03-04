
from fastapi import HTTPException

def verify_token(token: str):
    if token != "demo-token":
        raise HTTPException(status_code=401, detail="Unauthorized")
