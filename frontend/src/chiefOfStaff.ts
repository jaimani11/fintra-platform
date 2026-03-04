import { SIP } from "./types";
import { monteCarloBusinessModel } from "./stochastic";
import { correlatedShock } from "./shockEngine";
import { cfoAgent, cooAgent, riskAgent } from "./agents";
import { recordDecision } from "./memory";
import { getReinforcementWeight } from "./reinforcement";

/* ============================= */
/* ===== MAIN SYNTHESIS ========= */
/* ============================= */

export function synthesize(
  modules: SIP[],
  revenue: number,
  payrollRatio: number,
  otherBurn: number
) {

  if (!modules || modules.length === 0)
    return emptyResponse();

  /* ===== Base Risk ===== */

  const baseRisk =
    modules.reduce(
      (acc, m) => acc + m.risk_score,
      0
    ) / modules.length;

  const reinforcement =
    getReinforcementWeight();

  const severityPre =
    determineSeverity(baseRisk);

  const adjustedRisk =
    correlatedShock(
      baseRisk + reinforcement,
      severityPre
    );

  const severity =
    determineSeverity(adjustedRisk);

  /* ===== Financial Exposure ===== */

  const totalExposure =
    modules.reduce(
      (acc, m) => acc + m.financial_exposure,
      0
    );

  /* ===== Monte Carlo Business Simulation ===== */

  const simulations =
    monteCarloBusinessModel(
      revenue,
      payrollRatio,
      otherBurn,
      18,
      2000
    );

  const avgRunway =
    simulations.reduce(
      (acc, s) =>
        acc + s.runway_path[5],
      0
    ) / simulations.length;

  const worstRunway =
    Math.min(
      ...simulations.map(s => s.runway_path[5])
    );

  const p10 =
    simulations
      .map(s => s.runway_path[5])
      .sort((a, b) => a - b)[
        Math.floor(simulations.length * 0.1)
      ];

  /* ===== Multi-Agent Layer ===== */

  const cfo = cfoAgent(modules);
  const coo = cooAgent(modules);
  const risk = riskAgent(adjustedRisk);

  const capitalStrategy =
    determineCapitalStrategy(
      worstRunway,
      p10,
      severity
    );

  const actionPlan =
    generateActionPlan(modules, severity);

  const forecast =
    forecastHorizon(adjustedRisk);

  const executiveSummary =
    generateNarrative(
      severity,
      totalExposure,
      avgRunway,
      capitalStrategy
    );

  const executiveDecision = {
    executive_priority: severity,
    priority_score: Number(adjustedRisk.toFixed(2)),
    projected_runway: Number(avgRunway.toFixed(1)),
    worst_case_runway: Number(worstRunway.toFixed(1)),
    p10_runway: Number(p10.toFixed(1)),
    capital_strategy: capitalStrategy,
    operational_strategy: coo.operations_adjustment,
    governance: risk.governance_flag,
    forecast,
    action_plan: actionPlan,
    executive_summary: executiveSummary
  };

  recordDecision(executiveDecision);

  return executiveDecision;
}

/* ============================= */
/* ===== CAPITAL STRATEGY ====== */
/* ============================= */

function determineCapitalStrategy(
  worstRunway: number,
  p10: number,
  severity: string
) {

  if (worstRunway < 6)
    return "Immediate capital raise required.";

  if (p10 < 9)
    return "Prepare capital raise within 90 days.";

  if (severity === "HIGH")
    return "Preserve capital and reduce burn.";

  return "No capital action required.";
}

/* ============================= */
/* ===== SEVERITY MODEL ======== */
/* ============================= */

function determineSeverity(score: number) {
  if (score > 0.9) return "CRITICAL";
  if (score > 0.7) return "HIGH";
  if (score > 0.5) return "MODERATE";
  return "LOW";
}

/* ============================= */
/* ===== ACTION PLAN =========== */
/* ============================= */

function generateActionPlan(
  modules: SIP[],
  severity: string
) {

  const actions =
    [...new Set(
      modules.flatMap(m => m.recommended_actions)
    )];

  const timeline =
    severity === "CRITICAL"
      ? "Immediate (0–7 days)"
      : severity === "HIGH"
      ? "30 Days"
      : severity === "MODERATE"
      ? "Quarterly"
      : "Monitor";

  return {
    timeline,
    steps: actions.map((action, i) => ({
      step: i + 1,
      action,
      owner: "Executive Team"
    }))
  };
}

/* ============================= */
/* ===== FORECAST MODEL ======== */
/* ============================= */

function forecastHorizon(score: number) {

  if (score > 0.85)
    return {
      "30d": "High Risk",
      "90d": "Structural Failure",
      "180d": "Insolvency Risk"
    };

  if (score > 0.65)
    return {
      "30d": "Operational Stress",
      "90d": "Margin Compression",
      "180d": "Capital Raise Likely"
    };

  return {
    "30d": "Stable",
    "90d": "Stable",
    "180d": "Stable"
  };
}

/* ============================= */
/* ===== EXECUTIVE SUMMARY ===== */
/* ============================= */

function generateNarrative(
  severity: string,
  exposure: number,
  runway: number,
  capital: string
) {

  return `
Severity: ${severity}

Estimated Financial Exposure: $${exposure.toLocaleString()}

Projected Runway: ${runway.toFixed(1)} months

Capital Strategy: ${capital}

This decision was generated using probabilistic Monte Carlo simulation,
correlated risk shock modeling, and multi-agent executive synthesis.
`;
}

/* ============================= */
/* ===== EMPTY RESPONSE ======== */
/* ============================= */

function emptyResponse() {
  return {
    executive_priority: "LOW",
    priority_score: 0,
    projected_runway: 24,
    worst_case_runway: 24,
    p10_runway: 24,
    capital_strategy: "No signals",
    operational_strategy: "Stable",
    governance: "No escalation",
    forecast: {},
    action_plan: {
      timeline: "Monitor",
      steps: []
    },
    executive_summary: "No operational signals detected."
  };
}
