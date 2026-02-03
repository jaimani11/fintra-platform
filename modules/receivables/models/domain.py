from dataclasses import dataclass

@dataclass
class Invoice:
    org_id: str
    days_overdue: int
