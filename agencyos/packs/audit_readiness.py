from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class AuditReadinessPack(Pack):
    key = "audit_readiness"
    name = "Audit Readiness"

    def detect_signals(self, org_id: str):
        return [{"control": "Expense approvals", "missing_evidence": True}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Prepare audit evidence",
                description=f"Missing documentation for control: {s['control']}.",
                impact_score=9,
                urgency_score=6,
                confidence_score=8,
            )
            for s in signals
        ]
