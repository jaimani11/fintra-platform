import { SIP } from "./types";

/* ============================= */
/* ======== MAIN ENGINE ======== */
/* ============================= */

export function synthesize(modules: SIP[]) {

  if (!modules || modules.length === 0) {
    return {
      executive_priority: "LOW",
      priority_score: 0,
      confidence_score: 0,
      structural_overlap_count: 0,
      total_financial_exposure: 0,
      workforce_recommendation: {
        strategy: "No data provided",
        rationale: "No modules were analyzed."
      },
      execution_triggers: [],
      executive_summary: "No operational signals detected.",
      action_plan: {
        timeline: "Monitor",
        steps: []
      },
      modules: []
    };
  }

  const totalExposure =
    modules.reduce((acc, m) => acc + m.financial_exposure, 0);

  const baseRisk =
    modules.reduce((acc, m) => acc + m.risk_score, 0) /
    modules.length;

  /* ============================= */
  /* === CROSS-MODULE CASCADE ==== */
  /* ============================= */

  const overlap =
    modules.filter(m =>
      m.impact_chain.includes("cash_runway")
    ).length;

  const multiplier =
    overlap > 1 ? 1.4 : 1;

  const priorityScore =
    Math.min(1, baseRisk * multiplier);

  let severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL" = "LOW";

  if (priorityScore > 0.85) severity = "CRITICAL";
  else if (priorityScore > 0.65) severity = "HIGH";
  else if (priorityScore > 0.45) severity = "MODERATE";

  const confidence = generateConfidence(modules, overlap);

  const workforceDecision =
    workforceStrategy(severity, modules);

  const executionTriggers =
    generateExecutionTriggers(severity, overlap);

  const actionPlan =
    generateActionPlan(modules, severity);

  const executiveSummary =
    generateNarrative(
      severity,
      totalExposure,
      overlap,
      workforceDecision
    );

  return {
    executive_priority: severity,
    priority_score: Number(priorityScore.toFixed(2)),
    confidence_score: confidence,
    structural_overlap_count: overlap,
    total_financial_exposure: Math.round(totalExposure),
    workforce_recommendation: workforceDecision,
    execution_triggers: executionTriggers,
    executive_summary: executiveSummary,
    action_plan: actionPlan,
    modules
  };
}

/* ============================= */
/* ===== CONFIDENCE MODEL ====== */
/* ============================= */

function generateConfidence(
  modules: SIP[],
  overlap: number
) {
  const highRiskModules =
    modules.filter(m => m.risk_score > 0.6).length;

  let confidence =
    0.6 +
    modules.length * 0.05 +
    overlap * 0.1 +
    highRiskModules * 0.05;

  return Number(Math.min(confidence, 0.98).toFixed(2));
}

/* ============================= */
/* ==== WORKFORCE STRATEGY ===== */
/* ============================= */

function workforceStrategy(
  severity: string,
  modules: SIP[]
) {

  const payrollModule =
    modules.find(m => m.module === "payroll");

  if (!payrollModule) {
    return {
      strategy: "No workforce signal",
      rationale: "Payroll module not present."
    };
  }

  if (severity === "CRITICAL") {
    return {
      strategy: "Immediate hiring freeze + targeted layoffs",
      rationale:
        "Payroll materially impacts runway. Structural correction required.",
      estimated_headcount_reduction_percent: 10
    };
  }

  if (severity === "HIGH") {
    return {
      strategy: "Freeze hiring and audit role efficiency",
      rationale:
        "Labor cost trending above sustainable threshold.",
      estimated_headcount_reduction_percent: 5
    };
  }

  if (severity === "MODERATE") {
    return {
      strategy: "Selective hiring with margin guardrails",
      rationale:
        "Payroll growth must track revenue growth.",
      estimated_headcount_reduction_percent: 0
    };
  }

  return {
    strategy: "Continue planned hiring",
    rationale: "Workforce load stable.",
    estimated_headcount_reduction_percent: 0
  };
}

/* ============================= */
/* ===== EXECUTION TRIGGERS ==== */
/* ============================= */

function generateExecutionTriggers(
  severity: string,
  overlap: number
) {

  const triggers: {
    workflow: string;
    auto_execute: boolean;
  }[] = [];

  if (severity === "CRITICAL") {
    triggers.push({
      workflow: "FreezeHiringWorkflow",
      auto_execute: true
    });

    triggers.push({
      workflow: "BoardAlertNotification",
      auto_execute: true
    });
  }

  if (overlap > 1) {
    triggers.push({
      workflow: "CashPreservationMode",
      auto_execute: true
    });
  }

  if (severity === "HIGH") {
    triggers.push({
      workflow: "BudgetReforecast",
      auto_execute: false
    });
  }

  return triggers;
}

/* ============================= */
/* ===== ACTION PLAN LOGIC ===== */
/* ============================= */

function generateActionPlan(
  modules: SIP[],
  severity: string
) {

  const allActions =
    [...new Set(
      modules.flatMap(m => m.recommended_actions)
    )];

  let timeline: string;

  if (severity === "CRITICAL")
    timeline = "Immediate (0–7 days)";
  else if (severity === "HIGH")
    timeline = "Short-Term (30 days)";
  else if (severity === "MODERATE")
    timeline = "Quarterly correction";
  else
    timeline = "Monitor only";

  return {
    timeline,
    steps: allActions.map((action, i) => ({
      step: i + 1,
      action,
      owner: "CFO / COO",
      deadline_days:
        severity === "CRITICAL"
          ? 7
          : severity === "HIGH"
          ? 30
          : 90
    }))
  };
}

/* ============================= */
/* ==== EXECUTIVE NARRATIVE ==== */
/* ============================= */

function generateNarrative(
  severity: string,
  exposure: number,
  overlap: number,
  workforceDecision: any
) {

  const urgency =
    severity === "CRITICAL"
      ? "Immediate executive intervention required."
      : severity === "HIGH"
      ? "Structural risk is accelerating."
      : severity === "MODERATE"
      ? "Operational drift detected."
      : "Operations stable.";

  const cascade =
    overlap > 1
      ? "Multiple modules are compounding runway risk."
      : "Risk remains localized.";

  return `
${urgency}

Total financial exposure is approximately $${exposure.toLocaleString()}.

${cascade}

Workforce recommendation: ${workforceDecision.strategy}.

This assessment is derived from cross-module structural synthesis and impact propagation modeling.
`;
}
