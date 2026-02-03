def analyze_evidence(item):
    if not item.verified:
        return {"issue": "Unverified operational evidence"}
    return None
