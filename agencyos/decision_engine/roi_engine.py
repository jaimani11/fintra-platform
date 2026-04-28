def estimate_roi(decision: dict, signal_raw: dict = None) -> int:
    if signal_raw and signal_raw.get("amount"):
        amount_cents = signal_raw["amount"] * 100
        
        # ROI is based on the penalty you dont pay (arbitrarily 10%)
        # The remittance gap has to be paid, so it is not money saved, only
        # save the percentage of penatly avoided
        return int(amount_cents * 0.10)

    base = decision["impact_score"] * 10000
    urgency_penalty = decision["urgency_score"] * 2000
    return max(base - urgency_penalty, 0)


def cost_of_inaction(decision: dict, signal_raw: dict = None) -> int:
    if signal_raw and signal_raw.get("amount"):
        amount_cents = signal_raw["amount"] * 100
          # full gap plus penalty is paid
          # penalty for now arbitrarily set to 10%
        return int(amount_cents * 1.10)

    return decision["urgency_score"] * 5000