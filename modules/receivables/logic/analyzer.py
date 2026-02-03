def analyze_invoice(invoice):
    if invoice.days_overdue > 30:
        return {"issue": "Overdue receivable"}
    return None
