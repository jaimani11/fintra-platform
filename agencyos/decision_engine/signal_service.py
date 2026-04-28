from typing import List, Dict, Any

from modules.payroll.analyzer import analyze_payroll
from modules.accounting.logic.analyzer import analyze_ledger
from modules.sales_tax.logic.analyzer import analyze_sales_tax

from agencyos.decision_engine.cross_module_engine import detect_cross_module_risks


def normalize(module: str, result: Dict[str, Any]) -> Dict[str, Any]:
    if not result:
        return None

    severity_map = {
        "high": 8,
        "medium": 5,
        "low": 3
    }

    return {
        "module": module,
        "issue": result.get("issue", "Unknown issue"),
        "severity": severity_map.get(result.get("severity", "medium"), 5),
        "raw": result
    }


def get_signals(org_id: str = "demo-org") -> List[Dict[str, Any]]:
    signals = []


    # Mock inputs

    payroll_input = type("obj", (), {"overtime_hours": 25})()
    accounting_input = type("obj", (), {"reconciled": False})()

    sales_tax_input = type("obj", (), {
        "org_id": org_id,
        "jurisdiction": "CA",
        "period_start": None,
        "period_end": None,
        "tax_collected": 12000,
        "tax_remitted": 9000,
    })()

    # Module signals 

    payroll = normalize("payroll", analyze_payroll(payroll_input))
    accounting = normalize("accounting", analyze_ledger(accounting_input))
    sales_tax = normalize("sales_tax", analyze_sales_tax(sales_tax_input))

    for s in [payroll, accounting, sales_tax]:
        if s:
            signals.append(s)


    module_findings = {
        "payroll": payroll["issue"] if payroll else None,
        "commissions": None,
        "stock_comp": None,
        "receivables": None
    }

    cross = detect_cross_module_risks(org_id, module_findings)

    for c in cross:
        signals.append({
            "module": "cross_module",
            "issue": c.description,
            "severity": c.severity,
            "raw": c
        })

    return signals