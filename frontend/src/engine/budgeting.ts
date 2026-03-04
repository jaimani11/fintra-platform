import { SIP } from "./types";

export function analyzeBudget(
  revenue: number,
  totalBurn: number
): SIP {

  const net = revenue - totalBurn;
  const stress = net < 0 ? 0.7 : 0.3;

  return {
    module: "budgeting",
    risk_score: stress,
    financial_exposure: net < 0 ? Math.abs(net) * 6 : 0,
    impact_chain: ["runway"],
    analysis:
      net < 0
        ? "Negative cash flow detected."
        : "Cash flow stable.",
    recommended_actions:
      net < 0
        ? [
            "Reduce discretionary spend",
            "Reforecast 6 month runway"
          ]
        : ["Maintain forecast discipline"]
  };
}
