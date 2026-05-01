import json
from typing import List, Dict, Any

from agencyos.decision_engine.signal_service import get_signals
from agencyos.decision_engine.roi_engine import estimate_roi, cost_of_inaction
from backend.app.services.ai_service import AIService


def severity_to_urgency(severity: int) -> int:
    return severity

def severity_to_impact(severity: int) -> int:
    return min(severity + 1, 10)

def severity_to_confidence(module: str) -> int:
    return {
        "payroll": 9,
        "accounting": 6,
        "sales_tax": 9,
        "cross_module": 7,
        "budgeting": 8,
        "commissions": 8,
        "expenses": 9,
        "internal_audit": 8,
        "receivables": 8,
        "revrec": 7,
        "sentriai": 6,
        "sitesnap": 7,
        "stock_comp": 8,
    }.get(module, 7)



# Placeholder decision templates for if AI does not work, or to switch to if testing without the AI
DECISION_TEMPLATES = {
    "payroll": [
        {"action": "Cap overtime to 10h/week per department until headcount review", "impact": 7, "confidence": 9},
        {"action": "Redistribute shifts across underutilized staff in adjacent roles", "impact": 6, "confidence": 8},
        {"action": "Open part-time contractor roles to cover peak hours", "impact": 8, "confidence": 6},
    ],
    "sales_tax": [
        {"action": "File amended return and remit outstanding tax gap immediately", "impact": 9, "confidence": 9},
        {"action": "Audit tax collection rules and verify rate configuration", "impact": 7, "confidence": 8},
        {"action": "Engage tax counsel to assess nexus exposure and penalties", "impact": 8, "confidence": 7},
    ],
    "accounting": [
        {"action": "Assign reconciliation owner and set 48h deadline for close", "impact": 7, "confidence": 8},
        {"action": "Run automated ledger sweep to identify timing differences", "impact": 6, "confidence": 9},
        {"action": "Escalate unreconciled items to controller for manual review", "impact": 8, "confidence": 6},
    ],
    "cross_module": [
        {"action": "Initiate cross-functional margin review across affected modules", "impact": 8, "confidence": 7},
        {"action": "Freeze discretionary spend pending root cause analysis", "impact": 6, "confidence": 9},
        {"action": "Schedule executive review of correlated risk signals", "impact": 7, "confidence": 8},
    ],
    "budgeting": [
        {"action": "Identify top 3 overspend categories and freeze non-essential lines", "impact": 8, "confidence": 8},
        {"action": "Require VP approval for any spend above 10% of line item budget", "impact": 7, "confidence": 9},
        {"action": "Reforecast Q remaining budget based on current run rate", "impact": 6, "confidence": 8},
    ],
    "commissions": [
        {"action": "Process overdue commission payment for qualifying reps immediately", "impact": 9, "confidence": 9},
        {"action": "Audit commission calculation logic for quota attainment errors", "impact": 7, "confidence": 8},
        {"action": "Schedule review with sales ops to reconcile attainment records", "impact": 6, "confidence": 8},
    ],
    "expenses": [
        {"action": "Flag and freeze unapproved expense pending manager sign-off", "impact": 8, "confidence": 9},
        {"action": "Audit recent large expenses for policy compliance", "impact": 7, "confidence": 8},
        {"action": "Update expense policy to require pre-approval above $2,500", "impact": 6, "confidence": 7},
    ],
    "internal_audit": [
        {"action": "Collect and attach missing evidence for flagged control immediately", "impact": 9, "confidence": 9},
        {"action": "Assign control owner and set 24h remediation deadline", "impact": 8, "confidence": 8},
        {"action": "Run full control inventory to identify other evidence gaps", "impact": 7, "confidence": 7},
    ],
    "receivables": [
        {"action": "Send escalation notice to overdue account with 7-day payment deadline", "impact": 8, "confidence": 8},
        {"action": "Offer structured payment plan to recover outstanding balance", "impact": 6, "confidence": 7},
        {"action": "Refer account to collections if no response within 14 days", "impact": 9, "confidence": 6},
    ],
    "revrec": [
        {"action": "Delay additional revenue recognition until billing catches up", "impact": 8, "confidence": 8},
        {"action": "Issue invoice immediately for unbilled recognized revenue", "impact": 9, "confidence": 9},
        {"action": "Review contract terms to confirm recognition schedule is valid", "impact": 7, "confidence": 7},
    ],
    "sentriai": [
        {"action": "Escalate high-risk signal to ops leadership for immediate review", "impact": 9, "confidence": 6},
        {"action": "Initiate root cause analysis on flagged risk category", "impact": 8, "confidence": 7},
        {"action": "Increase monitoring frequency on affected operational area", "impact": 6, "confidence": 8},
    ],
    "sitesnap": [
        {"action": "Verify and sign off on unverified evidence item within 48 hours", "impact": 7, "confidence": 9},
        {"action": "Assign site owner to complete evidence verification workflow", "impact": 6, "confidence": 8},
        {"action": "Escalate unverified evidence to compliance team for review", "impact": 8, "confidence": 7},
    ],
    "stock_comp": [
        {"action": "Notify affected employees of upcoming vesting event and next steps", "impact": 7, "confidence": 9},
        {"action": "Review acceleration clauses and confirm board approval requirements", "impact": 8, "confidence": 8},
        {"action": "Coordinate with legal and finance on tax withholding obligations", "impact": 9, "confidence": 7},
    ],
}


def deduplicate_signals(signals: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    seen = set()
    unique = []
    for s in signals:
        key = s["issue"].strip().lower()
        if key in seen:
            continue
        seen.add(key)
        unique.append(s)
    return unique


def build_issue_shell(signal: Dict[str, Any]) -> Dict[str, Any]:
    """
    Builds the issue card from a signal.
    No AI called. No decisions generated.
    """
    severity = signal["severity"]
    urgency = severity_to_urgency(severity)
    impact = severity_to_impact(severity)
    confidence = severity_to_confidence(signal["module"])
    signal_raw = signal.get("raw") if isinstance(signal.get("raw"), dict) else None

    return {
        "content": f"Address issue: {signal['issue']}",
        "modules": [signal["module"]],
        "impact_score": impact,
        "urgency_score": urgency,
        "confidence_score": confidence,
        "priority_score": round(
            (impact * 0.35) + (urgency * 0.25) + (confidence * 0.15), 2
        ),
        "signal_trace": {
            "module": signal["module"],
            "issue": signal["issue"],
            "severity": severity,
            "raw": signal.get("raw"),   # ← add this
        },
        "cost_of_inaction_cents": cost_of_inaction(
            {"urgency_score": urgency},
            signal_raw
        ),
        "roi": {
            "estimated_savings_cents": 0,
            "realized_savings_cents": None,
        },
        "status": "pending",
    }


def generate_decision_options(signal: Dict[str, Any]) -> List[Dict[str, Any]]:
    prompt = f"""
You are a CFO-level executive analyst.

A business system has detected the following operational issue:

Module: {signal["module"]}
Issue: {signal["issue"]}
Severity: {signal["severity"]}/10

Generate up to 5 concrete, specific action options to address this issue.
Only generate fewer if fewer distinct actions genuinely exist.

For each option estimate:
- impact (1-10): how much this action resolves the problem if executed
- confidence (1-10): how certain we are this action will work

Return ONLY a JSON array, nothing else:
[
  {{"action": "string", "impact": int, "confidence": int}},
  ...
]
"""
    try:
        raw = AIService.generate_text(prompt, max_tokens=400)
        cleaned = raw.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
        options = json.loads(cleaned)
        if isinstance(options, list) and len(options) > 0:
            valid = [o for o in options if "action" in o and "impact" in o and "confidence" in o]
            return valid[:5]
    except Exception:
        pass

    return DECISION_TEMPLATES.get(signal["module"], [
        {"action": f"Investigate and resolve: {signal['issue']}", "impact": 7, "confidence": 7}
    ])


def build_sub_decision(sub_id: int, option: Dict[str, Any], signal: Dict[str, Any]) -> Dict[str, Any]:
    """
    Builds a single sub-decision. No explanation generated here — that's on demand.
    """
    urgency = severity_to_urgency(signal["severity"])
    impact = min(int(option["impact"]), 10)
    confidence = min(int(option["confidence"]), 10)
    signal_raw = signal.get("raw") if isinstance(signal.get("raw"), dict) else None

    return {
        "id": sub_id,
        "content": option["action"],
        "impact_score": impact,
        "urgency_score": urgency,
        "confidence_score": confidence,
        "explanation": None, 
        "roi": {
            "estimated_savings_cents": estimate_roi(
                {"impact_score": impact, "urgency_score": urgency},
                signal_raw
            ),
            "realized_savings_cents": None,
        },
    }



def generate_issues(org_id: str = "demo-org") -> List[Dict[str, Any]]:
    signals = get_signals(org_id)
    signals = deduplicate_signals(signals)
    issues = [build_issue_shell(s) for s in signals]
    issues.sort(key=lambda x: x["priority_score"], reverse=True)
    return issues   # ← return ALL, frontend handles the 5 cap and see more



def generate_decisions_for_issue(signal: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generates action options for a single issue signal.
    Called on demand when user expands an issue.
    """
    options = generate_decision_options(signal)
    decisions = [build_sub_decision(i + 1, option, signal) for i, option in enumerate(options)]

    # Sort by ROI desc as default ranking
    decisions.sort(key=lambda x: x["roi"]["estimated_savings_cents"], reverse=True)
    return decisions