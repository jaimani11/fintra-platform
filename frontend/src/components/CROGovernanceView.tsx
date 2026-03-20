// src/components/CROGovernanceView.tsx
export default function CROGovernanceView({ data }: { data: any }) {
  const { forecast, priority_score, governance, executive_priority } = data;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Priority Score</div>
          <div className={`text-3xl font-mono ${executive_priority === 'CRITICAL' ? 'text-red-500' : 'text-indigo-400'}`}>
            {priority_score}
          </div>
        </div>
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Governance Status</div>
          <div className="text-sm font-medium text-white uppercase">{governance}</div>
        </div>
      </div>

      <div className="bg-[#161a22] p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 text-center">Risk Forecast Horizon</h3>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(forecast).map(([days, status]: [string, any]) => (
            <div key={days} className="text-center p-4 bg-black/20 rounded-xl border border-white/5">
              <div className="text-[10px] text-zinc-500 font-bold mb-2 uppercase">{days}</div>
              <div className={`text-xs font-bold ${status.includes('Failure') || status.includes('Risk') ? 'text-red-400' : 'text-emerald-400'}`}>
                {status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export function CEONarrative({ data }: { data: any }) {
  return (
    <div className="space-y-6">
      <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl italic text-zinc-300 leading-relaxed whitespace-pre-line">
        {data.executive_summary}
      </div>
      <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
        <h4 className="text-xs font-bold text-zinc-500 uppercase mb-4 tracking-widest">Immediate Action Plan ({data.action_plan.timeline})</h4>
        <div className="space-y-3">
          {data.action_plan.steps.map((s: any) => (
            <div key={s.step} className="flex gap-4 text-sm items-start">
              <span className="text-indigo-400 font-mono">0{s.step}</span>
              <span className="text-zinc-300">{s.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export function CFOCapitalView({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <StatCard title="Avg Runway" value={`${data.projected_runway}m`} />
      <StatCard title="P10 Buffer" value={`${data.p10_runway}m`} />
      <StatCard title="Worst Case" value={`${data.worst_case_runway}m`} color="text-red-400" />
      <div className="col-span-3 p-4 bg-zinc-900 rounded-xl border border-zinc-800 text-center">
        <span className="text-[10px] text-zinc-500 uppercase block mb-1">Recommended Capital Action</span>
        <span className="text-sm font-bold text-indigo-400">{data.capital_strategy}</span>
      </div>
    </div>
  );
}
