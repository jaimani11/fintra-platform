from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.chief_of_staff import ChiefOfStaffService
from app.services.policy_engine import PolicyEngine

router = APIRouter()

@router.post("/decision")
def create_decision(
    payload: dict,
    db: Session = Depends(get_db)
):

    decision = ChiefOfStaffService.synthesize(
        payload["modules"],
        payload["revenue"],
        payload["payroll_ratio"],
        payload["other_burn"]
    )

    decision = PolicyEngine.apply_policies(
        db,
        payload["org_id"],
        decision
    )

    return decision
