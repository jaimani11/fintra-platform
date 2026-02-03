from fastapi import APIRouter
from modules.payroll.logic.analyzer import analyze_payroll
from modules.payroll.models.domain import PayrollRun

router = APIRouter()

@router.post("/analyze")
def analyze(run: PayrollRun):
    return analyze_payroll(run)
