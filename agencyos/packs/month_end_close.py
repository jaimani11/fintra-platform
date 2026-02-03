from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class MonthEndClosePack(Pack):
    key = "month_end_close"
    name = "Month-End Close"

    def detect_signals(self, org_id: str):
        return [{"account": "Deferred Revenue", "status": "Unreconciled"}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Resolve unreconciled account before close",
                description=f"Account {s['account']} is not reconciled for month-end close.",
                impact_score=8,
                urgency_score=8,
                confidence_score=7,
            )
            for s in signals
        ]
