def anchor_hash(decision_hash: str):
    """
    Simulated chain anchor.
    Replace with real chain later.
    """
    return {
        "tx_id": f"tx_{decision_hash[:10]}",
        "status": "anchored",
    }
