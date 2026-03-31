from fastapi import APIRouter
from datetime import date
from modules.sales_tax.models.tax_record import SalesTaxRecord
from modules.sales_tax.logic.analyzer import (
    analyze_sales_tax,
    economic_nexus_trigger,
    economic_nexus_warning
)

router = APIRouter()

@router.post("/analyze")
def analyze_tax(
    org_id: str,
    jurisdiction: str,
    period_start: date,
    period_end: date,
    tax_collected: float,
    tax_remitted: float,
    total_sales: float,
    transaction_count: int
):
    record = SalesTaxRecord(
        org_id=org_id,
        jurisdiction=jurisdiction,
        period_start=period_start,
        period_end=period_end,
        tax_collected=tax_collected,
        tax_remitted=tax_remitted,
        total_sales=total_sales,
        transaction_count=transaction_count
    )

    # Gather issues & warnings
    issues = []
    under_remit = analyze_sales_tax(record)
    nexus_issues = economic_nexus_trigger(record)
    nexus_warnings = economic_nexus_warning(record)

    if under_remit:
        issues.append(under_remit)
    if nexus_issues:
        issues.extend(nexus_issues)

    # Return structured result
    response = {
        "issues": issues,      # These will become CRITICAL/medium alerts
        "warnings": nexus_warnings or []  # Low severity
    }

    return response