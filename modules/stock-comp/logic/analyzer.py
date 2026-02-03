from datetime import date

def analyze_equity_grant(grant):
    unvested = grant.total_shares - grant.vested_shares
    days_to_end = (grant.vesting_end - date.today()).days

    if unvested > 0 and days_to_end < 90:
        return {
            "issue": "Upcoming vesting cliff / acceleration window",
            "unvested_shares": unvested,
            "days_remaining": days_to_end,
            "severity": "medium",
        }

    return None
