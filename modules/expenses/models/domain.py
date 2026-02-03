from dataclasses import dataclass

@dataclass
class Expense:
    org_id: str
    amount: float
    approved: bool
