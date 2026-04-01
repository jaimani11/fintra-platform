/* ===================================================== */
/* =============== CAPITAL SCENARIO ENGINE ============== */
/* ===================================================== */

export interface ScenarioResult {
  scenario: string;
  dilution_percent: number;
  runway_p10: number;
  runway_p50: number;
  runway_p90: number;
  survival_probability: number;
  volatility_score: number;
  structural_risk: number;
  races_score: number;
}

interface MonteCarloResult {
  p10: number;
  p50: number;
  p90: number;
  survival: number;
  volatility: number;
}

/* ===================================================== */
/* ================= MAIN ENTRY FUNCTION =============== */
/* ===================================================== */

export function simulateCapitalScenarios(
  revenue: number,
  payrollRatio: number,
  otherBurn: number
): ScenarioResult[] {

  if (revenue <= 0) {
    throw new Error("Revenue must be positive");
  }

  const scenarios = [
    { name: "Raise Now", delay: 0, dilution: 0.14 },
    { name: "Raise in 6 Months", delay: 6, dilution: 0.10 },
    { name: "Raise in 12 Months", delay: 12, dilution: 0.06 }
  ];

  return scenarios.map(s => {

    const monte = runMonteCarlo(
      revenue,
      payrollRatio,
      otherBurn,
      s.delay
    );

    const structuralRisk =
      calculateStructuralRisk(payrollRatio);

    const races =
      calculateRACES(
        monte,
        s.dilution,
        structuralRisk
      );

    return {
      scenario: s.name,
      dilution_percent: Number((s.dilution * 100).toFixed(2)),
      runway_p10: monte.p10,
      runway_p50: monte.p50,
      runway_p90: monte.p90,
      survival_probability: Number(monte.survival.toFixed(2)),
      volatility_score: Number(monte.volatility.toFixed(3)),
      structural_risk: structuralRisk,
      races_score: races
    };
  });
}

/* ===================================================== */
/* ================= MONTE CARLO CORE ================== */
/* ===================================================== */

function runMonteCarlo(
  revenue: number,
  payrollRatio: number,
  otherBurn: number,
  delay: number
): MonteCarloResult {

  const simulations = 2000;
  const results: number[] = [];

  for (let i = 0; i < simulations; i++) {

    let cash = 800000; // starting cash
    let months = 0;

    while (cash > 0 && months < 60) {

      const revShock =
        revenue * (1 + randomNormal(0, 0.05));

      const payroll =
        revShock * payrollRatio *
        (1 + randomNormal(0, 0.03));

      const burn = payroll + otherBurn;

      cash += revShock - burn;

      if (months === delay) {
        cash += 1_000_000; // capital injection
      }

      months++;
    }

    results.push(months);
  }

  results.sort((a, b) => a - b);

  const p10 = results[Math.floor(simulations * 0.1)];
  const p50 = results[Math.floor(simulations * 0.5)];
  const p90 = results[Math.floor(simulations * 0.9)];

  const survival =
    results.filter(m => m >= 24).length / simulations;

  const volatility =
    standardDeviation(results) / 60;

  return {
    p10,
    p50,
    p90,
    survival,
    volatility
  };
}

/* ===================================================== */
/* ================= RACES FORMULA ===================== */
/* ===================================================== */

function calculateRACES(
  monte: MonteCarloResult,
  dilution: number,
  structuralRisk: number
): number {

  const runwayScore = monte.p50 / 36;
  const survivalScore = monte.survival;

  const denominator =
    dilution *
    (1 + structuralRisk) *
    (1 + monte.volatility);

  if (denominator === 0) return 0;

  const efficiency =
    (runwayScore * survivalScore) / denominator;

  return Number(
    Math.min(efficiency * 100, 100).toFixed(1)
  );
}

/* ===================================================== */
/* ================= STRUCTURAL RISK =================== */
/* ===================================================== */

function calculateStructuralRisk(
  payrollRatio: number
): number {

  if (payrollRatio > 0.5) return 0.8;
  if (payrollRatio > 0.42) return 0.6;
  if (payrollRatio > 0.35) return 0.4;
  return 0.2;
}

/* ===================================================== */
/* ================= UTILITY FUNCTIONS ================= */
/* ===================================================== */

function randomNormal(
  mean: number,
  std: number
): number {

  const u = Math.random() || 0.0001;
  const v = Math.random() || 0.0001;

  return mean + std *
    Math.sqrt(-2 * Math.log(u)) *
    Math.cos(2 * Math.PI * v);
}

function standardDeviation(arr: number[]): number {

  const mean =
    arr.reduce((a, b) => a + b, 0) / arr.length;

  return Math.sqrt(
    arr.reduce((sum, val) =>
      sum + Math.pow(val - mean, 2), 0
    ) / arr.length
  );
}
