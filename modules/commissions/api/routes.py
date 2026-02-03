from fastapi import APIRouter
from modules.commissions.logic.analyzer import analyze_commission
from modules.commissions.models.domain import CommissionStatement

router = APIRouter()

@router.post("/analyze")
def analyze(statement: CommissionStatement):
    return analyze_commission(statement)
