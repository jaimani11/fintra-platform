from dataclasses import dataclass
from typing import List

@dataclass
class OrgLicense:
    org_id: str
    enabled_modules: List[str]
    seat_limit: int
