def summarize_roi(decisions):
    estimated = sum(
        d.roi["estimated_savings_cents"]
        for d in decisions
        if getattr(d, "roi", None)
    )

    realized = sum(
        d.roi["realized_savings_cents"]
        for d in decisions
        if getattr(d, "roi", None) and d.roi["realized_savings_cents"]
    )

    return {
        "estimated_cents": estimated,
        "realized_cents": realized,
    }
