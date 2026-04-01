import { SIP } from "./types";

export function analyzeCommission(
  marginLeakPercent: number
): SIP {

  const risk = Math.min(1, marginLeakPercent * 1.8);

  return {
    module: "sales_commission",
    risk_score: risk,
    financial_exposure: marginLeakPercent * 30000,
    impact_chain: ["margin"],
    analysis: "Commission structure incentivizes low-margin deals.",
    recommended_actions: [
      "Tie commissions to margin",
      "Cap bonus structures"
    ]
  };
}
