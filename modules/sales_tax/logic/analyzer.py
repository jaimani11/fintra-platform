from modules.sales_tax.models.tax_record import SalesTaxRecord
from modules.sales_tax.logic.rules import NEXUS_RULES # Import the dictionary from rules.py

# TODO: edge cases
# TODO: integrate to frontend
# TODO: physical, marketplace, and affiliate nexus IF applicable
# TODO: digital nexus?


def analyze_sales_tax(record: SalesTaxRecord):
    threshold = NEXUS_RULES.get(record.jurisdiction, {}).get("under_remittance_threshold")
    delta = record.tax_collected - record.tax_remitted

    if delta > threshold:
        return {
            "issue": "Under-remittance detected",
            "amount": delta,
            "severity": "high",
        }

    return None

# 
def economic_nexus_trigger(record: SalesTaxRecord):
    rules = NEXUS_RULES.get(record.jurisdiction)
    if not rules:
        return None

    issues = []

    sales_threshold = rules["sales_threshold"]
    if record.total_sales >= sales_threshold:
        issues.append({
            "issue": "Economic nexus triggered by total sales",
            "jurisdiction": record.jurisdiction,
            "current_sales": record.total_sales,
            "threshold": sales_threshold,
            "severity": "medium"
        })

    transaction_threshold = rules["transaction_threshold"]
    if transaction_threshold is not None and record.transaction_count >= transaction_threshold:
        issues.append({
            "issue": "Economic nexus triggered by transaction count",
            "jurisdiction": record.jurisdiction,
            "current_transactions": record.transaction_count,
            "threshold": transaction_threshold,
            "severity": "medium"
        })

    if issues:
        return issues

    return None


def economic_nexus_warning(record: SalesTaxRecord, warning_pct: float = 0.9):
    rules = NEXUS_RULES.get(record.jurisdiction)
    if not rules:
        return None

    warnings = []

    sales_threshold = rules["sales_threshold"]
    if record.total_sales >= sales_threshold * warning_pct and record.total_sales < sales_threshold:
        warnings.append({
            "warning": "Approaching economic nexus based on total sales",
            "jurisdiction": record.jurisdiction,
            "current_sales": record.total_sales,
            "threshold": sales_threshold,
            "severity": "low"
        })

    transaction_threshold = rules["transaction_threshold"]
    if transaction_threshold is not None:
        if record.transaction_count >= transaction_threshold * warning_pct and record.transaction_count < transaction_threshold:
            warnings.append({
                "warning": "Approaching economic nexus based on transaction count",
                "jurisdiction": record.jurisdiction,
                "current_transactions": record.transaction_count,
                "threshold": transaction_threshold,
                "severity": "low"
            })

    if warnings:
        return warnings

    return None

    
