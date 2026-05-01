def estimate_roi(decision: dict, signal_raw: dict = None) -> int:
    if signal_raw:

        # Tax collected but not sent to government
        if signal_raw.get("amount"):
            amount_cents = signal_raw["amount"] * 100
            return int(amount_cents * 0.10)

        # Nexus trigger by income
        if signal_raw.get("threshold") and signal_raw.get("current_sales"):
            overage = max(signal_raw["current_sales"] - signal_raw["threshold"], 0)
            return int(overage * 0.05 * 100)

        # Nexus trigger by transaction count
        if signal_raw.get("threshold") and signal_raw.get("current_transactions"):
            return 150000 

        # Nexus warning
        if signal_raw.get("warning"):
            return 50000 

        # Overtime
        if signal_raw.get("estimated_cost"):
            return int(signal_raw["estimated_cost"] * 0.30 * 100)


        if signal_raw.get("variance_amount"):
            return int(signal_raw["variance_amount"] * 0.80 * 100)

        if signal_raw.get("missing_timesheets"):
            return signal_raw["missing_timesheets"] * 15000

        if signal_raw.get("uncategorized_amount"):
            return int(signal_raw["uncategorized_amount"] * 0.05 * 100)

        if signal_raw.get("days_overdue"):
            return signal_raw["days_overdue"] * 10000

    base = decision["impact_score"] * 10000
    urgency_penalty = decision["urgency_score"] * 2000
    return max(base - urgency_penalty, 0)


def cost_of_inaction(decision: dict, signal_raw: dict = None) -> int:
    if signal_raw:

        if signal_raw.get("amount"):
            amount_cents = signal_raw["amount"] * 100
            return int(amount_cents * 1.10)

        if signal_raw.get("threshold") and signal_raw.get("current_sales"):
            overage = max(signal_raw["current_sales"] - signal_raw["threshold"], 0)
            return int(overage * 0.08 * 100)

        if signal_raw.get("threshold") and signal_raw.get("current_transactions"):
            return 300000

        if signal_raw.get("warning"):
            return 100000

        if signal_raw.get("estimated_cost"):
            return int(signal_raw["estimated_cost"] * 100)

        if signal_raw.get("variance_amount"):
            return int(signal_raw["variance_amount"] * 100)

        if signal_raw.get("missing_timesheets"):
            return signal_raw["missing_timesheets"] * 50000

        if signal_raw.get("uncategorized_amount"):
            return int(signal_raw["uncategorized_amount"] * 0.15 * 100)

        if signal_raw.get("days_overdue"):
            return signal_raw["days_overdue"] * 25000

    # Fallback
    return decision["urgency_score"] * 5000