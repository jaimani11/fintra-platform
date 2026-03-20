import { SIP } from "./types";

export function analyzePayroll(
  revenue: number,
  payrollRatio: number
): SIP {

  const threshold = 0.40;

  const overage = Math.max(0, payrollRatio - threshold);
  const exposure = revenue * overage;

  const risk = Math.min(1, payrollRatio * 1.5);

  return {
    module: "payroll",
    risk_score: risk,
    financial_exposure: Math.round(exposure),
    impact_chain: ["margin", "cash_runway", "hiring"],
    analysis:
      payrollRatio > threshold
        ? "Payroll ratio exceeds sustainable operating band."
        : "Payroll operating within efficiency band.",
    recommended_actions:
      payrollRatio > threshold
        ? ["Reduce overtime", "Pause hiring", "Audit role efficiency"]
        : []
  };
}
