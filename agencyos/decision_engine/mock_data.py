from datetime import date
from modules.sales_tax.models.tax_record import SalesTaxRecord
from modules.budgeting.models.domain import BudgetVariance
from modules.commissions.models.domain import CommissionStatement
from modules.expenses.models.domain import Expense
from modules.internal_audit.models.domain import ControlCheck
from modules.receivables.models.domain import Invoice
from modules.revrec.models.domain import RevenueContract
from modules.sentriai.models.domain import RiskSignal
from modules.sitesnap.models.domain import EvidenceItem
from modules.stock_comp.models.domain import EquityGrant


# options: "all", "scenario_a", "scenario_b", "scenario_c", "tax", "tax_pay_acc"
ACTIVE_SCENARIO = "tax_pay_acc"



SCENARIO_ALL = {
    "payroll":        type("obj", (), {"overtime_hours": 25})(),
    "accounting":     type("obj", (), {"reconciled": False})(),
    "sales_tax": SalesTaxRecord(
        org_id="demo-org",
        jurisdiction="CA",
        period_start=date(2024, 1, 1),
        period_end=date(2024, 3, 31),
        tax_collected=12000,
        tax_remitted=9000,
        total_sales=96000,
        transaction_count=210,
    ),
    "budgeting":      BudgetVariance(org_id="demo-org", planned=100000, actual=120000),
    "commissions":    CommissionStatement(org_id="demo-org", rep_id="rep-001", quota=100000, actual_sales=125000, commission_paid=0),
    "expenses":       Expense(org_id="demo-org", amount=7500, approved=False),
    "internal_audit": ControlCheck(org_id="demo-org", control="SOX-42", evidence_present=False),
    "receivables":    type("obj", (), {"days_overdue": 45})(),
    "revrec":         RevenueContract(org_id="demo-org", recognized=50000, invoiced=40000),
    "sentriai":       RiskSignal(org_id="demo-org", score=82),
    "sitesnap":       EvidenceItem(org_id="demo-org", category="ops", verified=False),
    "stock_comp":     EquityGrant(org_id="demo-org", employee_id="emp-001", grant_type="RSU", total_shares=10000, vested_shares=7500, vesting_end=date(2026, 6, 1)),
}



SCENARIO_A = {
    "payroll":     type("obj", (), {"overtime_hours": 25})(),
    "accounting":  type("obj", (), {"reconciled": True})(),
    "sales_tax": SalesTaxRecord(
        org_id="demo-org",
        jurisdiction="CA",
        period_start=date(2024, 1, 1),
        period_end=date(2024, 3, 31),
        tax_collected=12000,
        tax_remitted=9000,
        total_sales=96000,
        transaction_count=210,
    ),
    "budgeting":      BudgetVariance(org_id="demo-org", planned=100000, actual=120000),
    "commissions":    CommissionStatement(org_id="demo-org", rep_id="rep-001", quota=100000, actual_sales=125000, commission_paid=0),
    "expenses":       Expense(org_id="demo-org", amount=100, approved=False),
    "internal_audit": ControlCheck(org_id="demo-org", control="SOX-42", evidence_present=True),
    "receivables":    type("obj", (), {"days_overdue": 5})(),
    "revrec":         RevenueContract(org_id="demo-org", recognized=50000, invoiced=40000),
    "sentriai":       RiskSignal(org_id="demo-org", score=20),
    "sitesnap":       EvidenceItem(org_id="demo-org", category="ops", verified=True),
    "stock_comp":     EquityGrant(org_id="demo-org", employee_id="emp-001", grant_type="RSU", total_shares=10000, vested_shares=10000, vesting_end=date(2026, 6, 1)),
}

SCENARIO_B = {
    "payroll":        type("obj", (), {"overtime_hours": 5})(),
    "accounting":     type("obj", (), {"reconciled": True})(),
    "sales_tax": SalesTaxRecord(
        org_id="demo-org",
        jurisdiction="CA",
        period_start=date(2024, 1, 1),
        period_end=date(2024, 3, 31),
        tax_collected=9000,
        tax_remitted=9000,
        total_sales=50000,
        transaction_count=80,
    ),
    "budgeting":      BudgetVariance(org_id="demo-org", planned=100000, actual=105000),
    "commissions":    CommissionStatement(org_id="demo-org", rep_id="rep-001", quota=100000, actual_sales=80000, commission_paid=0),
    "expenses":       Expense(org_id="demo-org", amount=7500, approved=False),
    "internal_audit": ControlCheck(org_id="demo-org", control="SOX-42", evidence_present=False),
    "receivables":    type("obj", (), {"days_overdue": 45})(),
    "revrec":         RevenueContract(org_id="demo-org", recognized=30000, invoiced=30000),
    "sentriai":       RiskSignal(org_id="demo-org", score=82),
    "sitesnap":       EvidenceItem(org_id="demo-org", category="ops", verified=False),
    "stock_comp":     EquityGrant(org_id="demo-org", employee_id="emp-001", grant_type="RSU", total_shares=10000, vested_shares=10000, vesting_end=date(2026, 6, 1)),
}



SCENARIO_C = {
    "payroll":        type("obj", (), {"overtime_hours": 25})(),
    "accounting":     type("obj", (), {"reconciled": True})(),
    "sales_tax": SalesTaxRecord(
        org_id="demo-org",
        jurisdiction="CA",
        period_start=date(2024, 1, 1),
        period_end=date(2024, 3, 31),
        tax_collected=9000,
        tax_remitted=9000,
        total_sales=50000,
        transaction_count=80,
    ),
    "budgeting":      BudgetVariance(org_id="demo-org", planned=100000, actual=105000),
    "commissions":    CommissionStatement(org_id="demo-org", rep_id="rep-001", quota=100000, actual_sales=125000, commission_paid=0),
    "expenses":       Expense(org_id="demo-org", amount=100, approved=True),
    "internal_audit": ControlCheck(org_id="demo-org", control="SOX-42", evidence_present=True),
    "receivables":    type("obj", (), {"days_overdue": 45})(),   # fires for cross-module
    "revrec":         RevenueContract(org_id="demo-org", recognized=30000, invoiced=30000),
    "sentriai":       RiskSignal(org_id="demo-org", score=20),
    "sitesnap":       EvidenceItem(org_id="demo-org", category="ops", verified=True),
    "stock_comp":     EquityGrant(org_id="demo-org", employee_id="emp-001", grant_type="RSU", total_shares=10000, vested_shares=7500, vesting_end=date(2026, 6, 1)),
}



SCENARIO_TAX = {
    "payroll":        type("obj", (), {"overtime_hours": 5})(),
    "accounting":     type("obj", (), {"reconciled": True})(),
    "sales_tax": SalesTaxRecord(
        org_id="demo-org",
        jurisdiction="CA",
        period_start=date(2024, 1, 1),
        period_end=date(2024, 3, 31),
        tax_collected=12000,
        tax_remitted=9000,
        total_sales=96000,
        transaction_count=210,
    ),
    "budgeting":      BudgetVariance(org_id="demo-org", planned=100000, actual=100000),
    "commissions":    CommissionStatement(org_id="demo-org", rep_id="rep-001", quota=100000, actual_sales=80000, commission_paid=0),
    "expenses":       Expense(org_id="demo-org", amount=100, approved=True),
    "internal_audit": ControlCheck(org_id="demo-org", control="SOX-42", evidence_present=True),
    "receivables":    type("obj", (), {"days_overdue": 5})(),
    "revrec":         RevenueContract(org_id="demo-org", recognized=30000, invoiced=30000),
    "sentriai":       RiskSignal(org_id="demo-org", score=20),
    "sitesnap":       EvidenceItem(org_id="demo-org", category="ops", verified=True),
    "stock_comp":     EquityGrant(org_id="demo-org", employee_id="emp-001", grant_type="RSU", total_shares=10000, vested_shares=10000, vesting_end=date(2026, 6, 1)),
}


SCENARIO_TAX_PAY_ACC = {
    "payroll": type("obj", (), {
        "overtime_hours": 25,
        "hourly_rate": 50,
        "missing_timesheets": 3,
        "actual_total": 55000,
        "expected_total": 48000,
    })(),
    "accounting": type("obj", (), {
        "reconciled": False,
        "uncategorized_count": 12,
        "uncategorized_amount": 8500,
        "days_since_period_end": 9,
        "unexplained_variance": 7200,
    })(),
    "sales_tax": SalesTaxRecord(
        org_id="demo-org",
        jurisdiction="CA",
        period_start=date(2024, 1, 1),
        period_end=date(2024, 3, 31),
        tax_collected=12000,
        tax_remitted=9000,
        total_sales=96000,
        transaction_count=210,
    ),
    "budgeting":      BudgetVariance(org_id="demo-org", planned=100000, actual=100000),
    "commissions":    CommissionStatement(org_id="demo-org", rep_id="rep-001", quota=100000, actual_sales=80000, commission_paid=0),
    "expenses":       Expense(org_id="demo-org", amount=100, approved=True),
    "internal_audit": ControlCheck(org_id="demo-org", control="SOX-42", evidence_present=True),
    "receivables":    type("obj", (), {"days_overdue": 5})(),
    "revrec":         RevenueContract(org_id="demo-org", recognized=30000, invoiced=30000),
    "sentriai":       RiskSignal(org_id="demo-org", score=20),
    "sitesnap":       EvidenceItem(org_id="demo-org", category="ops", verified=True),
    "stock_comp":     EquityGrant(org_id="demo-org", employee_id="emp-001", grant_type="RSU", total_shares=10000, vested_shares=10000, vesting_end=date(2026, 6, 1)),
}


SCENARIOS = {
    "all":        SCENARIO_ALL,
    "scenario_a": SCENARIO_A,
    "scenario_b": SCENARIO_B,
    "scenario_c": SCENARIO_C,
    "tax":        SCENARIO_TAX,
    "tax_pay_acc":      SCENARIO_TAX_PAY_ACC,
}

def get_mock_inputs() -> dict:
    return SCENARIOS[ACTIVE_SCENARIO]