from fastapi import APIRouter
from modules.internal_audit.models.domain import ControlCheck
from modules.internal_audit.logic.analyzer import analyze_control

router = APIRouter()

@router.post("/analyze")
def analyze(control: ControlCheck):
    return analyze_control(control)
