// src/ai/useAISynthesis.ts
import { useFinancialStore } from "../store/useFinancialStore";

export function useAISynthesis() {

  const { revenue, payrollRatio, otherBurn } = useFinancialStore();

  /* ========================= */
  /* CORE CALCULATIONS */
  /* ========================= */

  const payroll = revenue * payrollRatio;
  const totalBurn = payroll + otherBurn;
  const net = revenue - totalBurn;

  const runway =
    net >= 0
      ? 36
      : Math.max(1, Math.round(600000 / Math.abs(net)));

  /* ========================= */
  /* STRUCTURAL RISK MODEL */
  /* ========================= */

  const structuralRisk =
    payrollRatio * 0.6 +
    (net < 0 ? 0.25 : 0) +
    (runway < 8 ? 0.15 : 0);

  const riskScore = Math.min(structuralRisk, 1);

  const severity =
    riskScore > 0.75
      ? "CRITICAL"
      : riskScore > 0.55
      ? "HIGH"
      : riskScore > 0.35
      ? "MODERATE"
      : "STABLE";

  /* ========================= */
  /* CAPITAL INTELLIGENCE */
  /* ========================= */

  const capitalEfficiency =
    revenue > 0
      ? Number((net / revenue).toFixed(2))
      : 0;

  const capitalHealthIndex =
    Math.min(
      1,
      (runway / 24) * 0.4 +
      capitalEfficiency * 0.4 +
      (1 - riskScore) * 0.2
    );

  const boardEscalation =
    severity === "CRITICAL" ||
    runway < 6;

  /* ========================= */
  /* RETURN SYNTHESIS */
  /* ========================= */

  return {
    payroll,
    totalBurn,
    net,
    runway,
    riskScore,
    severity,
    capitalEfficiency,
    capitalHealthIndex,
    boardEscalation
  };
}
