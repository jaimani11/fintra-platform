from typing import List, Dict, Any
from agencyos.decision_engine.mock_data import get_mock_inputs

from modules.payroll.analyzer import analyze_payroll
from modules.accounting.logic.analyzer import analyze_ledger
from modules.sales_tax.logic.analyzer import (
    analyze_sales_tax,
    economic_nexus_trigger,
    economic_nexus_warning,
)
from modules.budgeting.logic.analyzer import analyze_budget
from modules.commissions.logic.analyzer import analyze_commission
from modules.expenses.logic.analyzer import analyze_expense
from modules.internal_audit.logic.analyzer import analyze_control
from modules.receivables.logic.analyzer import analyze_invoice
from modules.revrec.logic.analyzer import analyze_revenue
from modules.sentriai.logic.analyzer import analyze_risk
from modules.sitesnap.logic.analyzer import analyze_evidence
from modules.stock_comp.logic.analyzer import analyze_equity_grant

from agencyos.decision_engine.cross_module_engine import detect_cross_module_risks


def normalize(module: str, result: Dict[str, Any]) -> Dict[str, Any]:
    if not result:
        return None

    severity_map = {"high": 8, "medium": 5, "low": 3}
    issue_text = result.get("issue") or result.get("warning") or "Unknown issue"

    if result.get("type") == "nexus_warning":
        issue_text = f"Approaching sales tax nexus threshold: {issue_text}"
    if result.get("type") == "nexus_trigger":
        issue_text = f"Sales tax nexus triggered: {issue_text}"

    return {
        "module": module,
        "issue": issue_text,
        "severity": severity_map.get(result.get("severity", "medium"), 5),
        "raw": result,
    }


def normalize_list(module: str, results) -> List[Dict[str, Any]]:
    if not results:
        return []
    return [s for s in [normalize(module, r) for r in results] if s]


def get_signals(org_id: str = "demo-org") -> List[Dict[str, Any]]:
    m = get_mock_inputs()
    signals = []

    signals.extend(normalize_list("payroll", analyze_payroll(m["payroll"])))
    signals.extend(normalize_list("accounting", analyze_ledger(m["accounting"])))

    under_rem      = normalize("sales_tax",      analyze_sales_tax(m["sales_tax"]))
    budgeting      = normalize("budgeting",      analyze_budget(m["budgeting"]))
    commissions    = normalize("commissions",    analyze_commission(m["commissions"]))
    expenses       = normalize("expenses",       analyze_expense(m["expenses"]))
    internal_audit = normalize("internal_audit", analyze_control(m["internal_audit"]))
    receivables    = normalize("receivables",    analyze_invoice(m["receivables"]))
    revrec         = normalize("revrec",         analyze_revenue(m["revrec"]))
    sentriai       = normalize("sentriai",       analyze_risk(m["sentriai"]))
    sitesnap       = normalize("sitesnap",       analyze_evidence(m["sitesnap"]))
    stock_comp     = normalize("stock_comp",     analyze_equity_grant(m["stock_comp"]))

    for s in [under_rem, budgeting, commissions, expenses,
              internal_audit, receivables, revrec, sentriai,
              sitesnap, stock_comp]:
        if s:
            signals.append(s)

    for t in (economic_nexus_trigger(m["sales_tax"]) or []):
        t["type"] = "nexus_trigger"
        s = normalize("sales_tax", t)
        if s:
            signals.append(s)

    for w in (economic_nexus_warning(m["sales_tax"]) or []):
        w["type"] = "nexus_warning"
        s = normalize("sales_tax", w)
        if s:
            signals.append(s)

    payroll_issue     = next((s["issue"] for s in signals if s["module"] == "payroll"), None)
    commissions_issue = normalize("commissions", analyze_commission(m["commissions"]))
    stock_comp_issue  = normalize("stock_comp",  analyze_equity_grant(m["stock_comp"]))
    receivables_issue = normalize("receivables", analyze_invoice(m["receivables"]))

    module_findings = {
        "payroll":     payroll_issue,
        "commissions": commissions_issue["issue"] if commissions_issue else None,
        "stock_comp":  stock_comp_issue["issue"]  if stock_comp_issue  else None,
        "receivables": receivables_issue["issue"] if receivables_issue else None,
    }

    for c in detect_cross_module_risks(org_id, module_findings):
        signals.append({
            "module": "cross_module",
            "issue": c.description,
            "severity": c.severity,
            "raw": c,
        })

    return signals