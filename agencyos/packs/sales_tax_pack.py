from agencyos.packs.base import Pack
from agencyos.decision_engine.models import Decision
import uuid

class SalesTaxPack(Pack):
    key = "sales_tax"
    name = "Sales Tax Compliance"

    def detect_signals(self, org_id: str):
        # mock signal from module
        return [{"jurisdiction": "CA", "underpaid": 2500}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Resolve sales tax underpayment",
                description=f"Underpayment of ${s['underpaid']} detected in {s['jurisdiction']}.",
                impact_score=9,
                urgency_score=8,
                confidence_score=9,
            )
            for s in signals
        ]
