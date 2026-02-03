from abc import ABC, abstractmethod
from typing import List
from agencyos.decision-engine.models import Decision

class Pack(ABC):
    key: str
    name: str

    @abstractmethod
    def detect_signals(self, org_id: str) -> list:
        pass

    @abstractmethod
    def generate_decisions(self, org_id: str, signals: list) -> List[Decision]:
        pass
