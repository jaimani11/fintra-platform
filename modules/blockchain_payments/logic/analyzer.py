def analyze_payment(payment):
    if not payment.confirmed:
        return {"issue": "Unconfirmed blockchain payment"}
    return None
