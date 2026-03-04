// src/pages/ExecutiveOverview.tsx
import { useFinancialStore } from "../store/useFinancialStore";
import { runRunwaySimulation } from "../engine/MonteCarloEngine";
import RiskView from "../components/RiskView"; // Import the new component

export default function ExecutiveOverview() {
  const { 
    viewMode, 
    setViewMode, 
    isSimulationMode, 
    simulatedRevenue, 
    revenue, 
    simulatedPayrollRatio, 
    payrollRatio 
  } = useFinancialStore();

  const activeRevenue = isSimulationMode ? simulatedRevenue : revenue;
  const activeRatio = isSimulationMode ? simulatedPayrollRatio : payrollRatio;
  
  // Simulation: Based on current cash reserves and burn volatility
  const simResults = runRunwaySimulation(850000, 120000, 0.25);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-white">{viewMode} Mode Intelligence</h2>
          <p className="text-zinc-500 mt-1">Compiled data from Fintra & FairTix ecosystem</p>
        </div>
        <div className="flex bg-[#161a22] p-1 rounded-xl border border-zinc-800">
          {['CEO', 'CFO', 'COO', 'Risk'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === mode ? 'bg-indigo-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </header>

      {/* STRATEGIC KPIS */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Projected Revenue" value={`$${activeRevenue.toLocaleString()}`} />
        <StatCard title="Monte Carlo P50" value={`${simResults.p50} months`} />
        <StatCard title="Efficiency Ratio" value={`${(activeRatio * 100).toFixed(1)}%`} />
      </div>

      {/* DYNAMIC VIEW CONTENT */}
      <div className="min-h-[300px]">
        {viewMode === 'Risk' ? (
          <RiskView />
        ) : (
          <div className="bg-[#161a22] p-8 rounded-2xl border border-zinc-800 border-l-4 border-l-indigo-500">
            <h3 className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
              {viewMode} Strategic Directive
            </h3>
            <p className="text-zinc-300 italic leading-relaxed">
              {viewMode === 'CEO' && `FairTix volume indicates a 15% surplus. Recommended: Allocate to Fintra engineering headcount.`}
              {viewMode === 'CFO' && `Tax Nexus threshold reached in California. Prepare $12k reserve for FairTix resale fees.`}
              {viewMode === 'COO' && `Operational capacity aligned. Payroll ratio of ${(activeRatio*100).toFixed(0)}% supports hiring 2 FTEs.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string, value: string }) {
  return (
    <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{title}</div>
      <div className="text-3xl font-mono text-white">{value}</div>
    </div>
  );
}
