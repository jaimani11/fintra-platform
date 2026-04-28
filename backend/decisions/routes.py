from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Optional, Literal
from datetime import datetime

from agencyos.decision_engine.decision_generator import generate_decisions
from backend.app.services.explanation_service import ExplanationService

router = APIRouter(prefix="/api/decisions", tags=["decisions"])

DECISIONS: Dict[int, dict] = {}


# -----------------------------
# MODELS
# -----------------------------

class DecisionUpdate(BaseModel):
    decision_id: int
    status: Literal["approved", "deferred", "pending"]
    approved_at: Optional[str] = None
    response_time_seconds: Optional[int] = None


class DecisionResponse(BaseModel):
    decision_id: int
    status: str
    approved_at: Optional[str]
    response_time_seconds: Optional[int]
    updated_at: str
    content: Optional[str] = None
    priority_score: Optional[float] = None
    explanation: Optional[str] = None


class DecisionCreate(BaseModel):
    prompt: str
    modules: List[str] = []
    revenue: float
    payroll_ratio: float
    other_burn: float


class ApprovePayload(BaseModel):
    sub_decision_id: int


# -----------------------------
# ROUTES
# -----------------------------

@router.get("/health")
def health():
    return {"status": "ok", "decision_count": len(DECISIONS)}


@router.post("/generate")
def generate_decision(payload: DecisionCreate):
    decisions = generate_decisions(org_id="demo-org")

    for i, d in enumerate(decisions):
        d["decision_id"] = i + 1
        d["status"] = "pending"
        d["approved_sub_decision_id"] = None
        d["denied_sub_decision_ids"] = []
        d["updated_at"] = datetime.utcnow().isoformat()
        DECISIONS[d["decision_id"]] = d

    return decisions


@router.get("/{decision_id}")
def get_decision(decision_id: int):
    if decision_id not in DECISIONS:
        raise HTTPException(status_code=404)
    return DECISIONS[decision_id]


@router.delete("/{decision_id}")
def delete_decision(decision_id: int):
    if decision_id not in DECISIONS:
        raise HTTPException(status_code=404)
    del DECISIONS[decision_id]
    return {"success": True}


@router.patch("/{decision_id}/approve")
def approve_decision(decision_id: int, payload: ApprovePayload):
    if decision_id not in DECISIONS:
        raise HTTPException(status_code=404, detail="Issue not found")

    issue = DECISIONS[decision_id]

    sub_ids = [s["id"] for s in issue.get("decisions", [])]
    if payload.sub_decision_id not in sub_ids:
        raise HTTPException(status_code=404, detail="Sub-decision not found")

    issue["status"] = "approved"
    issue["approved_sub_decision_id"] = payload.sub_decision_id
    issue["updated_at"] = datetime.utcnow().isoformat()

    return {
        "decision_id": decision_id,
        "status": "approved",
        "approved_sub_decision_id": payload.sub_decision_id,
        "updated_at": issue["updated_at"],
    }


@router.patch("/{decision_id}/sub/{sub_id}/deny")
def deny_sub_decision(decision_id: int, sub_id: int):
    if decision_id not in DECISIONS:
        raise HTTPException(status_code=404, detail="Issue not found")

    issue = DECISIONS[decision_id]

    sub_ids = [s["id"] for s in issue.get("decisions", [])]
    if sub_id not in sub_ids:
        raise HTTPException(status_code=404, detail="Sub-decision not found")

    denied = issue.setdefault("denied_sub_decision_ids", [])
    if sub_id not in denied:
        denied.append(sub_id)

    issue["updated_at"] = datetime.utcnow().isoformat()

    return {
        "decision_id": decision_id,
        "denied_sub_decision_id": sub_id,
        "updated_at": issue["updated_at"],
    }