#Run below in terminal to test
#PYTHONPATH=. python testing/signal_service_test.py


from agencyos.decision_engine.signal_service import get_signals


def run_test():
    signals = get_signals()

    print("\n=== SIGNAL CONSOLIDATION OUTPUT ===\n")

    for s in signals:
        print(f"{s['module'].upper()}: {s['issue']} ({s['severity']})")


if __name__ == "__main__":
    run_test()