def analyze_budget(budget):
    if budget.actual > budget.planned * 1.15:
        return {"issue": "Budget overrun"}
    return None
