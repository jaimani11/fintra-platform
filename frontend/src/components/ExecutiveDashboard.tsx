// src/components/ExecutiveDashboard.tsx
import { useFinancialStore } from "../store/useFinancialStore";
import { CEOView, CFOView, COOView, RiskView } from "./ExecutiveViews";

export default function ExecutiveDashboard({ mode }: { mode: 'CEO' | 'CFO' | 'COO' | 'Risk' }) {
  const { isSimulationMode, simulatedRevenue, revenue } = useFinancialStore();
  
  // Choose data source based on simulation toggle
  const activeRevenue = isSimulationMode ? simulatedRevenue : revenue;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{mode} Mode Intelligence</h2>
        <span className="text-xs font-mono bg-zinc-800 px-3 py-1 rounded-full">
          Source: {isSimulationMode ? "Simulation Engine" : "Integrated Software Suite"}
        </span>
      </header>

      {/* Render the specific persona view */}
      {mode === 'CEO' && <CEOView revenue={activeRevenue} />}
      {mode === 'CFO' && <CFOView />}
      {mode === 'COO' && <COOView />}
      {mode === 'Risk' && <RiskView />}
    </div>
  );
}
