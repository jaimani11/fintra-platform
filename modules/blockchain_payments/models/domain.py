from dataclasses import dataclass

@dataclass
class Payment:
    org_id: str
    confirmed: bool
