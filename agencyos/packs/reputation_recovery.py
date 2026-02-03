from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class ReputationRecoveryPack(Pack):
    key = "reputation_recovery"
    name = "Reputation & Customer Recovery"

    def detect_signals(self, org_id: str):
        return [{"channel": "Google Reviews", "rating": 2, "comment": "Poor response time"}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Respond to negative customer feedback",
                description=f"Low rating detected on {s['channel']}: \"{s['comment']}\".",
                impact_score=6,
                urgency_score=7,
                confidence_score=8,
            )
            for s in signals
        ]
