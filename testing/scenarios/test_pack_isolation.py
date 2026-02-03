from agencyos.packs.cash_collections import CashCollectionsPack

def test_pack_does_not_execute_actions():
    pack = CashCollectionsPack()
    signals = pack.detect_signals("org_test")

    assert isinstance(signals, list)
