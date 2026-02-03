from dataclasses import dataclass

@dataclass
class LedgerBalance:
    org_id: str
    account: str
    reconciled: bool
