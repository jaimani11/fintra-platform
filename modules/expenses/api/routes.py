from fastapi import APIRouter
from modules.expenses.models.domain import Expense
from modules.expenses.logic.analyzer import analyze_expense

router = APIRouter()

@router.post("/analyze")
def analyze(expense: Expense):
    return analyze_expense(expense)
