// src/engine/MonteCarloEngine.ts
export const runRunwaySimulation = (cash: number, burn: number, revenueVol: number) => {
  const iterations = 1000;
  const results: number[] = [];

  for (let i = 0; i < iterations; i++) {
    let currentCash = cash;
    let months = 0;
    
    // Simulate until cash depletion or 5-year cap
    while (currentCash > 0 && months < 60) {
      // revenueVol simulates the unpredictable nature of event ticket sales
      const monthlyRevenue = (burn * 1.1) * (1 + (Math.random() - 0.5) * revenueVol);
      currentCash = currentCash - burn + monthlyRevenue;
      months++;
    }
    results.push(months);
  }

  const sorted = results.sort((a, b) => a - b);
  return {
    p10: sorted[Math.floor(iterations * 0.1)], // "Worst Case" (10% chance)
    p50: sorted[Math.floor(iterations * 0.5)], // "Expected Case" (Median)
    p90: sorted[Math.floor(iterations * 0.9)], // "Best Case" (90% chance)
  };
};
