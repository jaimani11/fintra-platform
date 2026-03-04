import { SIP } from "./types";

export function analyzeSalesTax(
  nexusStates: number,
  unfiledMonths: number
): SIP {

  const exposure = nexusStates * 15000 + unfiledMonths * 2000;
  const risk = Math.min(1, (nexusStates * 0.2 + unfiledMonths * 0.1));

  return {
    module: "sales_tax",
    risk_score: risk,
    financial_exposure: exposure,
    impact_chain: ["legal", "cash"],
    analysis: `${nexusStates} unregistered nexus states detected.`,
    recommended_actions: [
      "Register nexus immediately",
      "File backdated returns"
    ]
  };
}
