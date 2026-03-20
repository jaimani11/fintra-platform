import React from "react";
import { useFinancialStore } from "../store/useFinancialStore";
import { synthesize } from "../chiefOfStaff"; // Ensure the 'O' is capitalized
import { mockModules } from "../data/mockModules";
import { exportExecutivePDF } from "../utils/pdfExport";
import { 
  CEONarrative, 
  CFOCapitalView, 
  COOOperationsView, 
  CROGovernanceView 
} from "../components/ExecutiveViews";

/**
 * EXECUTIVE OVERVIEW
 * Unified Command Center for Fintra & FairTix.
 * Handles persona-based views, stochastic stats, and board reporting.
 */
export default function ExecutiveOverview() {
  const { 
    viewMode, 
    simulatedRevenue, 
    simulatedPayrollRatio,
    isSimulationMode,
    revenue,
    payrollRatio,
    theme
  } = useFinancialStore();

  // 1. Determine active data points based on simulation state
  const activeRevenue = isSimulationMode ? simulatedRevenue : revenue;
  const activePayrollRatio = isSimulationMode ? simulatedPayrollRatio : payrollRatio;

  // 2. Run the Synthesis Engine (The Chief of Staff Brain)
  const decision = synthesize(
    mockModules,
    activeRevenue,
    activePayrollRatio,
    50000 
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER WITH EXPORT ACTION */}
      <header className={`flex justify-between items-center border-b pb-6 ${
        theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200'
      }`}>
        <div>
          <h2 className={`text-3xl font-bold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-zinc-900'
          }`}>
            {viewMode} Command Center
          </h2>
          <p className="text-zinc-500 text-sm mt-1">
            Synthesized intelligence from Fintra & FairTix ecosystem.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Badge 
            label="Priority" 
            value={decision.executive_priority} 
            color={decision.executive_priority === 'CRITICAL' ? 'text-red-400' : 'text-indigo-400'} 
          />
          
          {/* PDF DOWNLOAD BUTTON */}
          <button 
            onClick={() => exportExecutivePDF(decision)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2"
          >
            <span>📄</span> Download Board Report (.PDF)
          </button>
        </div>
      </header>

      {/* TOP-LEVEL STOCHASTIC STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Projected Runway" 
          value={`${decision.projected_runway} Months`} 
          detail="Avg. path to depletion"
        />
        <StatCard 
          title="Liability Exposure" 
          value={`$${(decision.priority_score * 100000).toLocaleString()}`} 
          detail="Risk-weighted exposure"
        />
        <StatCard 
          title="Stochastic P10" 
          value={`${decision.p10_runway} Months`} 
          detail="Worst-case safety buffer"
        />
      </div>

      {/* AGENT VIEW CONTAINER: Responsively switches based on viewMode */}
      <div className={`${
        theme === 'dark' ? 'bg-[#111318] border-zinc-800 shadow-2xl' : 'bg-white border-zinc-200 shadow-xl'
      } rounded-3xl border p-8 min-h-[400px] transition-colors duration-300`}>
        {viewMode === 'CEO' && <CEONarrative data={decision} />}
        {viewMode === 'CFO' && <CFOCapitalView data={decision} />}
        {viewMode === 'COO' && <COOOperationsView data={decision} />}
        {viewMode === 'Risk' && <CROGovernanceView data={decision} />}
      </div>
    </div>
  );
}

/**
 * INTERNAL UI COMPONENTS
 */
function StatCard({ title, value, detail }: { title: string, value: string, detail: string }) {
  const { theme } = useFinancialStore();
  return (
    <div className={`${
      theme === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
    } p-6 rounded-2xl border hover:border-indigo-500/50 transition-all group`}>
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 group-hover:text-indigo-400 transition-colors">
        {title}
      </div>
      <div className={`text-3xl font-mono mb-2 ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
        {value}
      </div>
      <div className="text-[10px] text-zinc-600 italic">{detail}</div>
    </div>
  );
}

function Badge({ label, value, color }: { label: string, value: string, color: string }) {
  return (
    <div className="bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-xl text-center">
      <div className="text-[9px] font-bold text-zinc-600 uppercase mb-1">{label}</div>
      <div className={`text-xs font-bold uppercase ${color}`}>{value}</div>
    </div>
  );
}
