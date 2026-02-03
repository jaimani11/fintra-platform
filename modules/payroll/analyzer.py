def analyze_payroll(run):
    if run.overtime_hours > 20:
        return {"issue": "Overtime spike", "severity": "high"}
    return None
