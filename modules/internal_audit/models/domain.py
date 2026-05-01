from dataclasses import dataclass

@dataclass
class ControlCheck:
    org_id: str
    control: str
    evidence_present: bool
