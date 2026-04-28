# python -m testing.decision_generator_test

from agencyos.decision_engine.decision_generator import generate_decisions


def run():
    results = generate_decisions()

    print("\n=== DECISIONS (EPIC 11 CORE) ===\n")

    assert len(results) <= 5, "More than 5 decisions returned!"

    prev_score = float("inf")

    for r in results:
        print(f"- {r['content']}")
        print(f"  Modules: {r['modules']}")
        print(f"  Impact: {r['impact_score']}")
        print(f"  Urgency: {r['urgency_score']}")
        print(f"  Priority Score: {r['priority_score']}")

        #UPDATED: use signal_trace instead of source
        trace = r.get("signal_trace", {})

        print(
            f"  Source: {trace.get('module')} → "
            f"{trace.get('issue')} (sev {trace.get('severity')})\n"
        )

        # verify sorting order
        assert r["priority_score"] <= prev_score
        prev_score = r["priority_score"]


if __name__ == "__main__":
    run()