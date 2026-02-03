from agencyos.decision_engine.roi_engine import estimate_roi

def approve_decision(decision, user_id: str):
    decision.status = "approved"
    decision.approved_by = user_id

    decision.roi = {
        "estimated_savings_cents": estimate_roi(decision),
        "realized_savings_cents": None,
    }

    return decision
def approve_decision(decision, user_id: str):
    decision.status = "approved"
    decision.approved_by = user_id
    return decision


def reject_decision(decision, user_id: str):
    decision.status = "rejected"
    decision.approved_by = user_id
    return decision
