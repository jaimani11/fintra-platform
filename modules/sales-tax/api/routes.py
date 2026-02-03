from fastapi import APIRouter
from datetime import date
from modules.sales_tax.models.tax_record import SalesTaxRecord
from modules.sales_tax.logic.analyzer import analyze_sales_tax

router = APIRouter()

@router.post("/analyze")
def analyze_tax(
    org_id: str,
    jurisdiction: str,
    period_start: date,
    period_end: date,
    tax_collected: float,
    tax_remitted: float,
):
    record = SalesTaxRecord(
        org_id=org_id,
        jurisdiction=jurisdiction,
        period_start=period_start,
        period_end=period_end,
        tax_collected=tax_collected,
        tax_remitted=tax_remitted,
    )

    return analyze_sales_tax(record)
