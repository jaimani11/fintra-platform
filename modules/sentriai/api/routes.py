from fastapi import APIRouter
from modules.sentriai.models.domain import RiskSignal
from modules.sentriai.logic.analyzer import analyze_risk

router = APIRouter()

@router.post("/analyze")
def analyze(signal: RiskSignal):
    return analyze_risk(signal)
