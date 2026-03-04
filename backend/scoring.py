def compute_performance_score(records):
    if not records:
        return 0

    total = len(records)
    approvals = sum(1 for r in records if r.approved_at)
    successes = sum(1 for r in records if r.outcome_success)

    approval_rate = approvals / total
    success_rate = successes / total if successes else 0

    score = (approval_rate * 0.4 + success_rate * 0.6) * 100
    return round(score, 1)
