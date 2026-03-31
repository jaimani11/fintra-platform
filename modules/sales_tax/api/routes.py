from fastapi import APIRouter
from datetime import date
from modules.sales_tax.models.tax_record import SalesTaxRecord
from modules.sales_tax.logic.analyzer import (
    analyze_sales_tax,
    economic_nexus_trigger,
    economic_nexus_warning
)
from modules.sales_tax.logic.rules import NEXUS_RULES  # For thresholds

router = APIRouter()

# Existing POST endpoint (unchanged)
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

    under_remit_issue = analyze_sales_tax(record)
    nexus_issues = economic_nexus_trigger(record)
    nexus_warnings = economic_nexus_warning(record)

    issues = []
    if under_remit_issue:
        issues.append(under_remit_issue)
    if nexus_issues:
        issues.extend(nexus_issues)

    response = {
        "issues": issues,
        "warnings": nexus_warnings or []
    }

    return response


# NEW GET endpoint for frontend table
@router.get("/api/sales_tax")
def get_sales_tax_table():
    # TODO: Replace this with real DB fetch
    mock_records = [
        SalesTaxRecord(org_id="org1", jurisdiction="California", total_sales=120000, transaction_count=50,
                       tax_collected=1200, tax_remitted=1000, period_start="2026-01-01", period_end="2026-03-31"),
        SalesTaxRecord(org_id="org1", jurisdiction="New York", total_sales=85000, transaction_count=40,
                       tax_collected=800, tax_remitted=700, period_start="2026-01-01", period_end="2026-03-31"),
        SalesTaxRecord(org_id="org1", jurisdiction="Texas", total_sales=400000, transaction_count=600,
                       tax_collected=4000, tax_remitted=3500, period_start="2026-01-01", period_end="2026-03-31"),
    ]

    result = []
    for record in mock_records:
        # Determine status
        if economic_nexus_trigger(record):
            status = "Active"
        elif economic_nexus_warning(record):
            status = "Approaching"
        else:
            status = "Safe"

        threshold = NEXUS_RULES.get(record.jurisdiction, {}).get("sales_threshold", 0)
        result.append({
            "state": record.jurisdiction,
            "revenue": record.total_sales,
            "threshold": threshold,
            "status": status
        })

    return result