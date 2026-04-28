from dataclasses import dataclass
from typing import Optional

@dataclass
class DecisionROI:
    decision_id: str
    estimated_savings_cents: int
    realized_savings_cents: Optional[int] = None
    cost_of_inaction_cents: Optional[int] = None
