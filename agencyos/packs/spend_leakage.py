from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class SpendLeakagePack(Pack):
    key = "spend_leakage"
    name = "Spend Leakage / AP"

    def detect_signals(self, org_id: str):
        return [{"vendor": "Vendor A", "issue": "Duplicate charge", "amount": 3200}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Review potential duplicate vendor charge",
                description=f"Detected possible duplicate charge from {s['vendor']} for ${s['amount']}.",
                impact_score=7,
                urgency_score=6,
                confidence_score=8,
            )
            for s in signals
        ]
