from dataclasses import dataclass

@dataclass
class CommissionStatement:
    org_id: str
    rep_id: str
    quota: float
    actual_sales: float
    commission_paid: float
