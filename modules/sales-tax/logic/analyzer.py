from modules.sales_tax.models.tax_record import SalesTaxRecord

def analyze_sales_tax(record: SalesTaxRecord):
    delta = record.tax_collected - record.tax_remitted

    if delta > 1000:
        return {
            "issue": "Under-remittance detected",
            "amount": delta,
            "severity": "high",
        }

    return None
