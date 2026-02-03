from agencyos.packs.base import Pack
from agencyos.decision_engine.models import Decision
from agencyos.decision_engine.cross_module_engine import detect_cross_module_risks
import uuid

class CrossModuleIntelligencePack(Pack):
    key = "cross_module_intelligence"
    name = "Cross-Module Intelligence"

    def detect_signals(self, org_id: str):
        # Mock findings from multiple modules
        return {
            "payroll": "Overtime spike",
            "commissions": "High performer unpaid",
            "stock_comp": "Upcoming vesting cliff / acceleration window",
            "receivables": "Overdue receivable",
        }

    def generate_decisions(self, org_id: str, findings: dict):
        cross_signals = detect_cross_module_risks(org_id, findings)

        decisions = []
        for s in cross_signals:
            decisions.append(
                Decision(
                    id=str(uuid.uuid4()),
                    org_id=org_id,
                    title="Cross-functional business risk detected",
                    description=s.description,
                    impact_score=s.severity,
                    urgency_score=s.severity - 1,
                    confidence_score=8,
                )
            )

        return decisions
