from agencyos.chief-of-staff.engine import run_chief_of_staff
from testing.fixtures.orgs import TEST_ORG

def test_chief_of_staff_generates_decisions():
    decisions = run_chief_of_staff(TEST_ORG["id"])

    assert len(decisions) > 0
    for d in decisions:
        assert d.org_id == TEST_ORG["id"]
        assert d.status == "pending"
        assert d.impact_score >= 1
