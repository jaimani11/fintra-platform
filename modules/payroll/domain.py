from dataclasses import dataclass

@dataclass
class PayrollRun:
    org_id: str
    total_hours: float
    overtime_hours: float
