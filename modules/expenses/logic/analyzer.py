def analyze_expense(expense):
    if expense.amount > 5000 and not expense.approved:
        return {"issue": "Large unapproved expense"}
    return None
