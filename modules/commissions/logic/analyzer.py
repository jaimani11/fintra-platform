def analyze_commission(statement):
    attainment = statement.actual_sales / statement.quota

    if attainment > 1.2 and statement.commission_paid == 0:
        return {
            "issue": "High performer unpaid",
            "attainment": round(attainment, 2),
            "severity": "high",
        }

    if attainment < 0.6 and statement.commission_paid > 0:
        return {
            "issue": "Commission paid below quota",
            "attainment": round(attainment, 2),
            "severity": "medium",
        }

    return None
