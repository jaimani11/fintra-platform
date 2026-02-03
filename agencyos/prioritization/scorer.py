def priority_score(impact: int, urgency: int, confidence: int) -> float:
    """
    Weighted score to rank decisions.
    """
    return (impact * 0.5) + (urgency * 0.35) + (confidence * 0.15)
