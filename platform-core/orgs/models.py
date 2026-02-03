from dataclasses import dataclass
from typing import List

@dataclass
class Organization:
    id: str
    name: str
    base_seats: int = 3
    purchased_seats: int = 0

    @property
    def seat_limit(self) -> int:
        return self.base_seats + self.purchased_seats


@dataclass
class Membership:
    user_id: str
    org_id: str
    role: str  # owner, admin, accountant, staff, viewer
