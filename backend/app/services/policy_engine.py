from app.models.policy import Policy
from sqlalchemy.orm import Session

class PolicyEngine:

    @staticmethod
    def apply_policies(
        db: Session,
        org_id,
        executive_decision: dict
    ):

        policies = db.query(Policy).filter(
            Policy.org_id == org_id
        ).all()

        for policy in policies:

            if policy.policy_type == "capital":
                if executive_decision["projected_runway"] < policy.threshold:
                    executive_decision["capital_strategy"] = \
                        "Policy Override: Mandatory Capital Raise"

                    if policy.hard_block:
                        executive_decision["execution_blocked"] = True

            if policy.policy_type == "workforce":
                if executive_decision["executive_priority"] == "CRITICAL":
                    executive_decision["operational_strategy"] = \
                        "Policy Override: Board Approval Required"

        return executive_decision
