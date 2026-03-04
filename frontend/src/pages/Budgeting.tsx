import { Card } from "../components/Card";
import { useAISynthesis } from "../ai/useAISynthesis";

export default function Budgeting() {
  const ai = useAISynthesis();
  
  // Example Logic: Budget Variance
  const planned = 500000;
  const actual = 485000;
  const variance = ((planned - actual) / planned) * 100;
  const isUnderBudget = actual <= planned;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Budgeting & Forecasting</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card label="Total Budget" value={`$${planned.toLocaleString()}`} />
        <Card label="Actual Spend" value={`$${actual.toLocaleString()}`} />
        <Card label="Variance" value={`${variance.toFixed(1)}%`} trend={{ value: Math.abs(variance), isPositive: isUnderBudget }} />
      </div>

      <div className={`p-6 rounded-2xl border ${isUnderBudget ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
        <div className="text-sm opacity-70 mb-2">Budget Health</div>
        <div className="text-lg font-medium">
          {isUnderBudget 
            ? `You are $${(planned - actual).toLocaleString()} under budget. Potential for re-allocation.`
            : `Over-spend detected in OpEx. Suggesting immediate freeze on non-critical hiring.`}
        </div>
      </div>

      <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
        <div className="text-sm text-zinc-400 mb-2">AI Forecast (Next 90 Days)</div>
        <p className="text-zinc-300">Based on current burn, you will require a budget adjustment of +$45k in Q3 to maintain growth targets.</p>
      </div>
    </div>
  );
}
