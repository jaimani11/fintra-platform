from dataclasses import dataclass
from datetime import date

@dataclass
class SalesTaxRecord:
    org_id: str
    jurisdiction: str
    period_start: date
    period_end: date
    tax_collected: float
    tax_remitted: float
