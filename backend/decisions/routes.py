from fastapi import APIRouter, HTTPException, Depends, Request
from pydantic import BaseModel, Field
from typing import Optional, Literal, Dict
from datetime import datetime
from uuid import uuid4

router = APIRouter(
    prefix="/api/decisions",
    tags=["decisions"]
)

# -------------------------------------------------------------------
# In-Memory Store (Replace with real DB layer later)
# -------------------------------------------------------------------

DECISIONS: Dict[int, dict] = {}

# -------------------------------------------------------------------
# Models
# -------------------------------------------------------------------

class DecisionUpdate(BaseModel):
    decision_id: int = Field(..., description="Unique decision ID")
    status: Literal["approved", "deferred"]
    approved_at: Optional[str] = None
    response_time_seconds: Optional[int] = None


class DecisionResponse(BaseModel):
    decision_id: int
    status: str
    approved_at: Optional[str]
    response_time_seconds: Optional[int]
    updated_at: str


# -------------------------------------------------------------------
# Utility Validation
# -------------------------------------------------------------------

def parse_iso_timestamp(value: Optional[str]) -> Optional[datetime]:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Invalid ISO timestamp format"
        )


# -------------------------------------------------------------------
# Routes
# -------------------------------------------------------------------

@router.post("/update", response_model=DecisionResponse)
def update_decision(payload: DecisionUpdate):
    """
    Update decision status.
    Tracks response time and approval timestamp.
    """

    # Validate required approval timestamp
    if payload.status == "approved" and not payload.approved_at:
        raise HTTPException(
            status_code=400,
            detail="approved_at required when status is approved"
        )

    approved_at_dt = parse_iso_timestamp(payload.approved_at)

    # Save (Replace this with DB persistence layer)
    DECISIONS[payload.decision_id] = {
        "decision_id": payload.decision_id,
        "status": payload.status,
        "approved_at": approved_at_dt.isoformat() if approved_at_dt else None,
        "response_time_seconds": payload.response_time_seconds,
        "updated_at": datetime.utcnow().isoformat(),
    }

    return DECISIONS[payload.decision_id]


@router.get("/{decision_id}", response_model=DecisionResponse)
def get_decision(decision_id: int):
    """
    Fetch a specific decision record.
    """
    if decision_id not in DECISIONS:
        raise HTTPException(status_code=404, detail="Decision not found")

    return DECISIONS[decision_id]


@router.get("/", response_model=Dict[int, DecisionResponse])
def list_decisions():
    """
    Return all stored decisions.
    """
    return DECISIONS


@router.delete("/{decision_id}")
def delete_decision(decision_id: int):
    """
    Admin-only: Delete decision record.
    """
    if decision_id not in DECISIONS:
        raise HTTPException(status_code=404, detail="Decision not found")

    del DECISIONS[decision_id]
    return {"success": True}


@router.get("/health")
def health_check():
    """
    Lightweight health endpoint.
    """
    return {
        "status": "ok",
        "decision_count": len(DECISIONS),
        "timestamp": datetime.utcnow().isoformat(),
    }
