from agencyos.prioritization.scorer import priority_score

def build_inbox(decisions: list):
    ranked = sorted(
        decisions,
        key=lambda d: priority_score(
            d.impact_score, d.urgency_score, d.confidence_score
        ),
        reverse=True,
    )
    return ranked[:5]  # never overwhelm the user
