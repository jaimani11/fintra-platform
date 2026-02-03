from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class ContractsRenewalsPack(Pack):
    key = "contracts_renewals"
    name = "Contracts & Renewals"

    def detect_signals(self, org_id: str):
        return [{"contract": "CRM Software", "days_to_renewal": 21}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Review upcoming contract renewal",
                description=f"Contract {s['contract']} renews in {s['days_to_renewal']} days.",
                impact_score=6,
                urgency_score=7,
                confidence_score=9,
            )
            for s in signals
        ]
