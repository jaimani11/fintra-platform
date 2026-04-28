from agencyos.decision_engine.decision_generator import generate_decisions


def run():
    decisions = generate_decisions()

    print("\n=== STEP 5 ROI + COST VALIDATION ===\n")

    for d in decisions:
        print(f"- {d['content']}")
        print(f"  Impact: {d['impact_score']}")
        print(f"  Urgency: {d['urgency_score']}")
        print(f"  Confidence: {d['confidence_score']}")
        print(f"  Priority: {d['priority_score']}")
        print(f"  ROI (cents): {d['roi']['estimated_savings_cents']}")
        print(f"  Cost of Inaction (cents): {d['cost_of_inaction_cents']}")
        print()


if __name__ == "__main__":
    run()