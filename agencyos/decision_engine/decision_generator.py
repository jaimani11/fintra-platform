import json
from typing import List, Dict, Any

from agencyos.decision_engine.signal_service import get_signals
from agencyos.decision_engine.roi_engine import estimate_roi, cost_of_inaction
from backend.app.services.explanation_service import ExplanationService
from backend.app.services.ai_service import AIService


def severity_to_urgency(severity: int) -> int:
    return severity

def severity_to_impact(severity: int) -> int:
    return min(severity + 1, 10)

def severity_to_confidence(module: str) -> int:
    return {"payroll": 9, "accounting": 6, "sales_tax": 9, "cross_module": 7}.get(module, 7)



# These are fallback if AI has issues
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

        These scores must reflect the actual action, a bold high-risk fix should have high impact and lower confidence. A safe monitoring step should have lower impact and high confidence.

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
            valid = [
                o for o in options
                if "action" in o and "impact" in o and "confidence" in o
            ]
            return valid[:5]
    except Exception:
        pass

    return DECISION_TEMPLATES.get(signal["module"], [
        {"action": f"Investigate and resolve: {signal['issue']}", "impact": 7, "confidence": 7}
    ])


def build_sub_decision(sub_id: int, option: Dict[str, Any], signal: Dict[str, Any]) -> Dict[str, Any]:
    urgency = severity_to_urgency(signal["severity"])
    impact = min(int(option["impact"]), 10)
    confidence = min(int(option["confidence"]), 10)
    signal_raw = signal.get("raw") if isinstance(signal.get("raw"), dict) else None

    sub = {
        "id": sub_id,
        "content": option["action"],
        "impact_score": impact,
        "urgency_score": urgency,
        "confidence_score": confidence,
        "roi": {
            "estimated_savings_cents": estimate_roi(
                {"impact_score": impact, "urgency_score": urgency},
                signal_raw
            ),
            "realized_savings_cents": None,
        },
    }

    try:
        sub["explanation"] = ExplanationService.generate_explanation({
            "content": option["action"],
            "modules": [signal["module"]],
            "signal_trace": signal,
            "impact_score": impact,
            "urgency_score": urgency,
            "confidence_score": confidence,
            "roi": sub["roi"],
            "cost_of_inaction_cents": cost_of_inaction(
                {"urgency_score": urgency},
                signal_raw
            ),
        })
    except Exception:
        sub["explanation"] = "Explanation unavailable"

    return sub


def build_issue(signal: Dict[str, Any]) -> Dict[str, Any]:
    severity = signal["severity"]
    urgency = severity_to_urgency(severity)
    impact = severity_to_impact(severity)
    confidence = severity_to_confidence(signal["module"])
    signal_raw = signal.get("raw") if isinstance(signal.get("raw"), dict) else None

    issue = {
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

    options = generate_decision_options(signal)

    issue["decisions"] = [
        build_sub_decision(i + 1, option, signal)
        for i, option in enumerate(options)
    ]

    return issue


def enforce_inbox_contract(issues: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    cleaned = [i for i in issues if "priority_score" in i and "decisions" in i]
    cleaned.sort(key=lambda x: x["priority_score"], reverse=True)
    return cleaned[:5]


def generate_decisions(org_id: str = "demo-org") -> List[Dict[str, Any]]:
    signals = get_signals(org_id)
    signals = deduplicate_signals(signals)
    issues = [build_issue(s) for s in signals]
    return enforce_inbox_contract(issues)