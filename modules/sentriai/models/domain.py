from dataclasses import dataclass

@dataclass
class RiskSignal:
    org_id: str
    score: int
