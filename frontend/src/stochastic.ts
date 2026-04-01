export interface SimulationResult {
  revenue_path: number[];
  payroll_path: number[];
  runway_path: number[];
}

export function monteCarloBusinessModel(
  initialRevenue: number,
  payrollRatio: number,
  otherBurn: number,
  months = 18,
  simulations = 2000
): SimulationResult[] {

  const results: SimulationResult[] = [];

  for (let s = 0; s < simulations; s++) {

    let revenue = initialRevenue;
    let payroll = revenue * payrollRatio;
    let cash = 800000; // starting buffer

    const revenue_path: number[] = [];
    const payroll_path: number[] = [];
    const runway_path: number[] = [];

    for (let m = 0; m < months; m++) {

      // Revenue volatility
      const revenueShock =
        1 + (Math.random() - 0.5) * 0.3;

      revenue *= revenueShock;

      // Payroll growth volatility
      const payrollGrowth =
        1 + (Math.random() - 0.5) * 0.2;

      payroll = revenue * payrollRatio * payrollGrowth;

      const burn = payroll + otherBurn;
      cash += revenue - burn;

      revenue_path.push(revenue);
      payroll_path.push(payroll);
      runway_path.push(cash / burn);
    }

    results.push({
      revenue_path,
      payroll_path,
      runway_path
    });
  }

  return results;
}
