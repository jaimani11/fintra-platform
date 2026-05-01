def analyze_payroll(run):
    signals = []

    if run.overtime_hours > 20:
        estimated_cost = run.overtime_hours * getattr(run, "hourly_rate", 50) * 1.5
        signals.append({
            "issue": "Overtime spike",
            "severity": "high",
            "overtime_hours": run.overtime_hours,
            "estimated_cost": estimated_cost,
        })

    missing = getattr(run, "missing_timesheets", 0)
    if missing > 0:
        signals.append({
            "issue": f"Missing timesheets: {missing} employee(s) unsubmitted",
            "severity": "medium",
            "missing_timesheets": missing,
        })

    expected = getattr(run, "expected_total", None)
    actual_total = getattr(run, "actual_total", None)
    if expected and actual_total:
        variance = abs(actual_total - expected)
        variance_pct = variance / expected
        if variance_pct > 0.10:
            signals.append({
                "issue": "Payroll anomaly: total deviates more than 10% from expected",
                "severity": "high",
                "variance_amount": variance,
                "variance_pct": round(variance_pct * 100, 1),
                "expected_total": expected,
                "actual_total": actual_total,
            })

    return signals if signals else None