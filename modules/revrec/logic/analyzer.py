def analyze_revenue(contract):
    if contract.recognized > contract.invoiced:
        return {"issue": "Revenue recognized ahead of billing"}
    return None
