from dataclasses import dataclass
from typing import Optional
from agencyos.decision_engine.outcome_models import DecisionROI
Decision.roi = None

@dataclass
class Decision:
    id: str
    org_id: str
    title: str
    description: str
    impact_score: int        # 1–10
    urgency_score: int       # 1–10
    confidence_score: int    # 1–10
    status: str = "pending"  # pending, approved, rejected
    approved_by: Optional[str] = None
