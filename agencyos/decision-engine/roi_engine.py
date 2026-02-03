def estimate_roi(decision):
    """
    Simple deterministic heuristics.
    Students can later improve these.
    """
    base = decision.impact_score * 10000
    urgency_penalty = decision.urgency_score * 2000

    return max(base - urgency_penalty, 0)


def cost_of_inaction(decision):
    return decision.urgency_score * 5000
