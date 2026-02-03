from dataclasses import dataclass
from typing import List

@dataclass
class CrossModuleSignal:
    org_id: str
    sources: List[str]
    description: str
    severity: int  # 1–10
