from datetime import date
from modules.sales_tax.models.tax_record import SalesTaxRecord
from modules.sales_tax.logic.analyzer import (
    analyze_sales_tax,
    economic_nexus_trigger,
    economic_nexus_warning
)

# python -m modules.sales_tax.tests.test_backend


records = [
    SalesTaxRecord(
        org_id="ORG123",
        jurisdiction="CA",
        period_start=date(2026, 1, 1),
        period_end=date(2026, 1, 31),
        tax_collected=5000,
        tax_remitted=4000,
        total_sales=95000,
        transaction_count=190
    ),
    SalesTaxRecord(
        org_id="ORG456",
        jurisdiction="NY",
        period_start=date(2026, 1, 1),
        period_end=date(2026, 1, 31),
        tax_collected=10000,
        tax_remitted=8000,
        total_sales=510000,
        transaction_count=120
    ),
]

for record in records:
    print(f"\n--- Analyzing record for {record.jurisdiction} ---")
    
    under_remit = analyze_sales_tax(record)
    nexus_issues = economic_nexus_trigger(record)
    nexus_warnings = economic_nexus_warning(record)
    
    print("Under-remittance issue:", under_remit)
    print("Nexus issues:", nexus_issues)
    print("Nexus warnings:", nexus_warnings)

