from agencyos.decision-engine.approval import approve_decision
from agencyos.decision-engine.models import Decision

def test_decision_approval():
    d = Decision(
        id="d1",
        org_id="org1",
        title="Test",
        description="Test decision",
        impact_score=5,
        urgency_score=5,
        confidence_score=5,
    )

    approve_decision(d, "u_owner")

    assert d.status == "approved"
    assert d.approved_by == "u_owner"
