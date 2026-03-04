import React from "react";

/**
 * 1. CEO STRATEGIC NARRATIVE
 */
export function CEONarrative({ data }: { data: any }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl italic text-zinc-300 leading-relaxed whitespace-pre-line shadow-inner">
        {data.executive_summary}
      </div>
      
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <h4 className="text-xs font-bold text-zinc-500 uppercase mb-4 tracking-widest flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
          Immediate Action Plan ({data.action_plan.timeline})
        </h4>
        <div className="space-y-4">
          {data.action_plan.steps.map((s: any) => (
            <div key={s.step} className="flex gap-4 text-sm items-start group">
              <span className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                0{s.step}
              </span>
              <span className="text-zinc-300 group-hover:text-white transition-colors">{s.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * 2. CFO CAPITAL STRATEGY
 */
export function CFOCapitalView({ data }: { data: any }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-3 gap-4">
        <StatCard title="Avg Runway" value={`${data.projected_runway}m`} />
        <StatCard title="P10 Buffer" value={`${data.p10_runway}m`} />
        <StatCard title="Worst Case" value={`${data.worst_case_runway}m`} color="text-red-400" />
      </div>
      
      <div className="p-6 bg-zinc-900/80 rounded-2xl border border-indigo-500/30 text-center shadow-lg">
        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em] block mb-2">
          Recommended Capital Action
        </span>
        <span className="text-lg font-bold text-indigo-400">
          {data.capital_strategy}
        </span>
      </div>
    </div>
  );
}

/**
 * 3. COO OPERATIONS VIEW
 */
export function COOOperationsView({ data }: { data: any }) {
  const isFreeze = data.operational_strategy.toLowerCase().includes("freeze");

  return (
    <div className="bg-zinc-900/50 p-10 rounded-2xl border border-zinc-800 text-center animate-in zoom-in-95 duration-500">
      <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border-2 ${isFreeze ? 'border-red-500/20 bg-red-500/5' : 'border-emerald-500/20 bg-emerald-500/5'}`}>
        <div className={`w-4 h-4 rounded-full animate-pulse ${isFreeze ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_15_129,0.5)]'}`} />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Operational Integrity</h3>
      <p className={`text-sm font-medium uppercase tracking-widest ${isFreeze ? 'text-red-400' : 'text-emerald-400'}`}>
        {data.operational_strategy}
      </p>
      <p className="text-zinc-500 text-xs mt-4 max-w-xs mx-auto leading-relaxed">
        Hiring velocity and department spend are adjusted based on real-time risk scores.
      </p>
    </div>
  );
}

/**
 * 4. CRO (RISK) GOVERNANCE VIEW
 * FIXED: Changed from 'export default' to 'export function'
 */
export function CROGovernanceView({ data }: { data: any }) {
  const { forecast, priority_score, governance, executive_priority } = data;

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Priority Score</div>
          <div className={`text-3xl font-mono ${executive_priority === 'CRITICAL' ? 'text-red-500' : 'text-indigo-400'}`}>
            {priority_score}
          </div>
        </div>
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Governance Status</div>
          <div className="text-sm font-bold text-white uppercase tracking-tighter">{governance}</div>
        </div>
      </div>

      <div className="bg-[#161a22] p-8 rounded-3xl border border-zinc-800 shadow-2xl">
        <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em] mb-8 text-center">Risk Forecast Horizon</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(forecast).map(([days, status]: [string, any]) => (
            <div key={days} className="text-center p-5 bg-black/40 rounded-2xl border border-white/5 group hover:border-indigo-500/30 transition-all">
              <div className="text-[10px] text-zinc-600 font-bold mb-3 uppercase tracking-widest">{days}</div>
              <div className={`text-[11px] font-bold leading-tight ${status.toLowerCase().includes('failure') || status.toLowerCase().includes('risk') || status.toLowerCase().includes('stress') ? 'text-red-400' : 'text-emerald-500'}`}>
                {status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * HELPER: STAT CARD
 */
function StatCard({ title, value, color = "text-white" }: { title: string, value: string, color?: string }) {
  return (
    <div className="bg-[#161a22] p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">{title}</div>
      <div className={`text-2xl font-mono font-bold ${color}`}>{value}</div>
    </div>
  );
}
