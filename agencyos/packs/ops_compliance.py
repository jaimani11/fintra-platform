from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class OpsCompliancePack(Pack):
    key = "ops_compliance"
    name = "Ops Calendar & Compliance"

    def detect_signals(self, org_id: str):
        return [{"task": "Employee training renewal", "due_in_days": 10}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Complete compliance task",
                description=f"{s['task']} is due in {s['due_in_days']} days.",
                impact_score=7,
                urgency_score=8,
                confidence_score=9,
            )
            for s in signals
        ]
