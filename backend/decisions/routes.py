from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Optional, Literal
from datetime import datetime

from agencyos.decision_engine.decision_generator import generate_issues, generate_decisions_for_issue
from backend.app.services.explanation_service import ExplanationService

router = APIRouter(prefix="/api/decisions", tags=["decisions"])

DECISIONS: Dict[int, dict] = {}


# -----------------------------
# MODELS
# -----------------------------

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
    global DECISIONS
    DECISIONS.clear()

    issues = generate_issues(org_id="demo-org")

    for i, issue in enumerate(issues):
        issue["decision_id"] = i + 1
        issue["status"] = "pending"
        issue["approved_sub_decision_id"] = None
        issue["denied_sub_decision_ids"] = []
        issue["decisions"] = []
        issue["updated_at"] = datetime.utcnow().isoformat()
        DECISIONS[issue["decision_id"]] = issue

    return issues


@router.post("/{decision_id}/decisions")
def generate_decisions_for_issue_route(decision_id: int):
    if decision_id not in DECISIONS:
        raise HTTPException(status_code=404, detail="Issue not found")

    issue = DECISIONS[decision_id]

    if issue.get("decisions"):
        return issue["decisions"]

    signal = issue["signal_trace"] 

    decisions = generate_decisions_for_issue(signal)

    for i, d in enumerate(decisions):
        d["id"] = i + 1

    issue["decisions"] = decisions
    issue["updated_at"] = datetime.utcnow().isoformat()

    return decisions

@router.post("/{decision_id}/decisions/{sub_id}/explain")
def explain_sub_decision(decision_id: int, sub_id: int):
    """
    Generates AI reasoning for one sub-decision on demand.
    Called when user clicks 'View reasoning'.
    """
    if decision_id not in DECISIONS:
        raise HTTPException(status_code=404, detail="Issue not found")

    issue = DECISIONS[decision_id]
    sub = next((d for d in issue.get("decisions", []) if d["id"] == sub_id), None)

    if not sub:
        raise HTTPException(status_code=404, detail="Sub-decision not found")

    if sub.get("explanation"):
        return {"explanation": sub["explanation"]}

    explanation = ExplanationService.generate_explanation({
        "content": sub["content"],
        "modules": issue["modules"],
        "signal_trace": issue["signal_trace"],
        "impact_score": sub["impact_score"],
        "urgency_score": sub["urgency_score"],
        "confidence_score": sub["confidence_score"],
        "roi": sub["roi"],
        "cost_of_inaction_cents": issue["cost_of_inaction_cents"],
    })

    sub["explanation"] = explanation
    return {"explanation": explanation}


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