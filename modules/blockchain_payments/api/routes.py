from fastapi import APIRouter
from modules.blockchain_payments.models.domain import Payment
from modules.blockchain_payments.logic.analyzer import analyze_payment

router = APIRouter()

@router.post("/analyze")
def analyze(payment: Payment):
    return analyze_payment(payment)
