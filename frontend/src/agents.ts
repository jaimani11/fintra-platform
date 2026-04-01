import { SIP } from "./types";

export function cfoAgent(modules: SIP[]) {

  const exposure =
    modules.reduce(
      (acc, m) => acc + m.financial_exposure,
      0
    );

  return {
    capital_recommendation:
      exposure > 200000
        ? "Initiate capital raise"
        : "Monitor liquidity",
    exposure
  };
}

export function cooAgent(modules: SIP[]) {

  const payrollModule =
    modules.find(m => m.module === "payroll");

  return {
    operations_adjustment:
      payrollModule?.risk_score > 0.6
        ? "Freeze hiring"
        : "Operationally stable"
  };
}

export function riskAgent(priorityScore: number) {

  return {
    governance_flag:
      priorityScore > 0.8
        ? "Board notification required"
        : "No escalation"
  };
}
