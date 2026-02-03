from agencyos.packs.registry import PACKS

def run_chief_of_staff(org_id: str):
    all_decisions = []
    for pack in PACKS:
        signals = pack.detect_signals(org_id)
        decisions = pack.generate_decisions(org_id, signals)
        all_decisions.extend(decisions)
    return all_decisions
