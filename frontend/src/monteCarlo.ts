export function monteCarloRunway(
  baseRunwayMonths: number,
  volatility: number = 0.2,
  simulations: number = 2000
) {
  const results: number[] = [];

  for (let i = 0; i < simulations; i++) {
    const shock =
      1 + (Math.random() - 0.5) * volatility;

    const simulatedRunway =
      Math.max(1, baseRunwayMonths * shock);

    results.push(simulatedRunway);
  }

  const avg =
    results.reduce((a, b) => a + b, 0) / simulations;

  const sorted = results.sort((a, b) => a - b);

  return {
    expected: Number(avg.toFixed(1)),
    worst_case: Number(sorted[0].toFixed(1)),
    best_case: Number(sorted[sorted.length - 1].toFixed(1)),
    p10: Number(sorted[Math.floor(simulations * 0.1)].toFixed(1)),
    p90: Number(sorted[Math.floor(simulations * 0.9)].toFixed(1))
  };
}
