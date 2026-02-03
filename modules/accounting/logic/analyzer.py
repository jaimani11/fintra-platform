def analyze_ledger(balance):
    if not balance.reconciled:
        return {"issue": "Unreconciled account"}
    return None
