#python -m testing.decision_explanation_tes

from agencyos.decision_engine.decision_generator import generate_decisions


def run():
    decisions = generate_decisions(org_id="demo-org")

    print("\n=== DECISIONS WITH EXPLANATIONS (STEP 4) ===\n")

    for d in decisions:
        print(f"- {d['content']}")
        print(f"  Modules: {d['modules']}")
        print(f"  Priority Score: {d['priority_score']}")
        print(f"  Explanation: {d.get('explanation')}")
        print()


if __name__ == "__main__":
    run()