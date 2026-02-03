from agencyos.prioritization.scorer import priority_score

def test_priority_scoring():
    high = priority_score(9, 9, 9)
    low = priority_score(3, 3, 3)

    assert high > low
