from agencyos.decision_engine.roi_engine import estimate_roi
from platform_core.governance.config import GOVERNANCE_MODE_ENABLED
from platform_core.governance.hasher import hash_decision
from platform_core.governance.blockchain import anchor_hash

def approve_decision(decision: dict, user_id: str) -> dict:
    decision["status"] = "approved"
    decision["approved_by"] = user_id
    decision["roi"] = {
        "estimated_savings_cents": estimate_roi(decision),
        "realized_savings_cents": None,
    }
    return decision

def reject_decision(decision: dict, user_id: str) -> dict:
    decision["status"] = "rejected"
    decision["rejected_by"] = user_id
    return decision
