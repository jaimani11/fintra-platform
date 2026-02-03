def analyze_risk(signal):
    if signal.score > 75:
        return {"issue": "High operational risk"}
    return None
