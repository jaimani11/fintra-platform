#python -m testing.decision_ai_test

from agencyos.decision_engine.decision_generator import generate_decisions


def run():
    decisions = generate_decisions()

    for d in decisions:
        print("\n---")
        print(d["content"])
        print("ROI:", d["roi"]["estimated_savings_cents"])
        print("Cost:", d["cost_of_inaction_cents"])
        print("Explanation:", d["explanation"])


if __name__ == "__main__":
    run()