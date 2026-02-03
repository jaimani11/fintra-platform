from agencyos.decision_engine.cross_signals import CrossModuleSignal

def detect_cross_module_risks(org_id: str, module_findings: dict):
    """
    module_findings example:
    {
      "payroll": {...},
      "commissions": {...},
      "stock_comp": {...},
      "receivables": {...}
    }
    """
    signals = []

    # Example 1: Margin pressure risk
    if (
        module_findings.get("payroll") == "Overtime spike"
        and module_findings.get("commissions") == "High performer unpaid"
    ):
        signals.append(
            CrossModuleSignal(
                org_id=org_id,
                sources=["payroll", "commissions"],
                description="Labor costs rising while sales incentives are misaligned",
                severity=8,
            )
        )

    # Example 2: Retention + dilution risk
    if (
        module_findings.get("stock_comp") == "Upcoming vesting cliff / acceleration window"
        and module_findings.get("receivables") == "Overdue receivable"
    ):
        signals.append(
            CrossModuleSignal(
                org_id=org_id,
                sources=["stock_comp", "receivables"],
                description="Equity events approaching while cash flow is constrained",
                severity=9,
            )
        )

    return signals
