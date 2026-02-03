from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class InventoryIntelPack(Pack):
    key = "inventory_intel"
    name = "Inventory & Materials Intelligence"

    def detect_signals(self, org_id: str):
        return [{"item": "Raw Material X", "days_remaining": 5}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Reorder inventory item",
                description=f"{s['item']} has only {s['days_remaining']} days of inventory left.",
                impact_score=7,
                urgency_score=9,
                confidence_score=9,
            )
            for s in signals
        ]
