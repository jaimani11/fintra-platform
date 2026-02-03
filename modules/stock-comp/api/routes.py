from fastapi import APIRouter
from modules.stock_comp.logic.analyzer import analyze_equity_grant
from modules.stock_comp.models.domain import EquityGrant

router = APIRouter()

@router.post("/analyze")
def analyze(grant: EquityGrant):
    return analyze_equity_grant(grant)
