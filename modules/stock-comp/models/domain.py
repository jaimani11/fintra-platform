from dataclasses import dataclass
from datetime import date

@dataclass
class EquityGrant:
    org_id: str
    employee_id: str
    grant_type: str        # RSU, ISO, NSO
    total_shares: int
    vested_shares: int
    vesting_end: date
