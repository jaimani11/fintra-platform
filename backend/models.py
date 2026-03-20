from dataclasses import dataclass
from datetime import datetime

@dataclass
class DecisionRecord:
    decision_id: str
    created_at: datetime
    approved_at: datetime | None
    edited: bool
    outcome_success: bool | None  # True/False/None
