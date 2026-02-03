from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class MarginUnitEconomicsPack(Pack):
    key = "margin_unit_econ"
    name = "Margin & Unit Economics"

    def detect_signals(self, org_id: str):
        return [{"product": "Service Tier B", "margin_drop_pct": 12}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Investigate margin decline",
                description=f"Margin for {s['product']} dropped by {s['margin_drop_pct']}%.",
                impact_score=8,
                urgency_score=6,
                confidence_score=7,
            )
            for s in signals
        ]
