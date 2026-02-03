from fastapi import APIRouter
from modules.receivables.models.domain import Invoice
from modules.receivables.logic.analyzer import analyze_invoice

router = APIRouter()

@router.post("/analyze")
def analyze(invoice: Invoice):
    return analyze_invoice(invoice)
