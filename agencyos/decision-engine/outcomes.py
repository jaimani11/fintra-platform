from dataclasses import dataclass

@dataclass
class Outcome:
    decision_id: str
    realized_value: float
    notes: str
