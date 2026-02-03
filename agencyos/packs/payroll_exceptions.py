from agencyos.packs.base import Pack
from agencyos.decision-engine.models import Decision
import uuid

class PayrollExceptionsPack(Pack):
    key = "payroll_exceptions"
    name = "Payroll Exceptions"

    def detect_signals(self, org_id: str):
        return [{"employee": "E-45", "issue": "Overtime spike"}]

    def generate_decisions(self, org_id: str, signals: list):
        return [
            Decision(
                id=str(uuid.uuid4()),
                org_id=org_id,
                title="Review overtime anomaly",
                description="Overtime hours exceeded threshold.",
                impact_score=7,
                urgency_score=6,
                confidence_score=8,
            )
        ]
