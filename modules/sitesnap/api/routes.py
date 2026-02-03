from fastapi import APIRouter
from modules.sitesnap.models.domain import EvidenceItem
from modules.sitesnap.logic.analyzer import analyze_evidence

router = APIRouter()

@router.post("/analyze")
def analyze(item: EvidenceItem):
    return analyze_evidence(item)
