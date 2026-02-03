def approve_decision(decision, user_id: str):
    decision.status = "approved"
    decision.approved_by = user_id
    return decision


def reject_decision(decision, user_id: str):
    decision.status = "rejected"
    decision.approved_by = user_id
    return decision
