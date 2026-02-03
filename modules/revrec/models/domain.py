from dataclasses import dataclass

@dataclass
class RevenueContract:
    org_id: str
    recognized: float
    invoiced: float
