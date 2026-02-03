from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class CashCollectionsPack(Pack):
    key = "cash_collections"
    name = "Cash & Collections"

    def detect_signals(self, org_id: str):
        # deterministic mock signal
        return [{"invoice_id": "INV-123", "days_overdue": 45, "amount": 12000}]

    def generate_decisions(self, org_id: str, signals: list):
        decisions = []
        for s in signals:
            decisions.append(
                Decision(
                    id=str(uuid.uuid4()),
                    org_id=org_id,
                    title="Follow up on overdue invoice",
                    description=f"Invoice {s['invoice_id']} is {s['days_overdue']} days overdue (${s['amount']}).",
                    impact_score=8,
                    urgency_score=7,
                    confidence_score=9,
                )
            )
        return decisions
