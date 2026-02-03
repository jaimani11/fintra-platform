from fastapi import APIRouter
from modules.accounting.models.domain import LedgerBalance
from modules.accounting.logic.analyzer import analyze_ledger

router = APIRouter()

@router.post("/analyze")
def analyze(balance: LedgerBalance):
    return analyze_ledger(balance)
