from dataclasses import dataclass

@dataclass
class BudgetVariance:
    org_id: str
    planned: float
    actual: float
