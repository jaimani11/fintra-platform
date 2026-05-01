def analyze_ledger(balance):
    signals = []

    if not balance.reconciled:
        signals.append({
            "issue": "Unreconciled account",
            "severity": "high",
        })

    uncategorized = getattr(balance, "uncategorized_count", 0)
    uncategorized_amount = getattr(balance, "uncategorized_amount", 0)
    if uncategorized > 0:
        signals.append({
            "issue": f"Uncategorized transactions: {uncategorized} item(s) totaling ${uncategorized_amount:,.0f}",
            "severity": "medium" if uncategorized_amount < 10000 else "high",
            "uncategorized_count": uncategorized,
            "uncategorized_amount": uncategorized_amount,
        })

    days_since_close = getattr(balance, "days_since_period_end", None)
    if days_since_close and days_since_close > 5:
        signals.append({
            "issue": f"Month-end close overdue by {days_since_close - 5} day(s)",
            "severity": "medium" if days_since_close < 10 else "high",
            "days_overdue": days_since_close - 5,
        })

    variance_amount = getattr(balance, "unexplained_variance", 0)
    if variance_amount > 5000:
        signals.append({
            "issue": f"Large unexplained variance: ${variance_amount:,.0f} unaccounted",
            "severity": "high",
            "variance_amount": variance_amount,
        })

    return signals if signals else None