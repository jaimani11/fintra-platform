from dataclasses import dataclass

@dataclass
class EvidenceItem:
    org_id: str
    category: str
    verified: bool
