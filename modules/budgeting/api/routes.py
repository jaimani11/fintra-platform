from fastapi import APIRouter
from modules.budgeting.models.domain import BudgetVariance
from modules.budgeting.logic.analyzer import analyze_budget

router = APIRouter()

@router.post("/analyze")
def analyze(budget: BudgetVariance):
    return analyze_budget(budget)
