from fastapi import APIRouter
from modules.revrec.models.domain import RevenueContract
from modules.revrec.logic.analyzer import analyze_revenue

router = APIRouter()

@router.post("/analyze")
def analyze(contract: RevenueContract):
    return analyze_revenue(contract)
