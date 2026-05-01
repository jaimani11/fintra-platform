def analyze_control(control):
    if not control.evidence_present:
        return {"issue": "Missing audit evidence"}
    return None
