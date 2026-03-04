import { Card } from "../components/Card";
import { useAISynthesis } from "../ai/useAISynthesis";
import DashboardChart from "../components/DashboardChart";

export default function Dashboard() {
  const ai = useAISynthesis();

  return (
    <div className="space-y-8">
      {/* HEADER: GLOBAL STATUS & WATCHDOG */}
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-semibold text-white">Executive Overview</h2>
          <p className="text-zinc-500 text-sm mt-1">Real-time financial integrity monitor</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-zinc-500 uppercase font-bold tracking-widest">System Health</div>
          <div className="text-emerald-400 text-sm font-medium flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Watchdog: Active
          </div>
        </div>
      </header>

      {/* TOP LEVEL KPIS */}
      <div className="grid grid-cols-3 gap-6">
        <Card 
          label="Total Runway" 
          value={`${ai.runway} Months`} 
          trend={{ value: 2, isPositive: true }} 
        />
        <Card 
          label="Net Position" 
          value={`$${ai.net.toLocaleString()}`} 
        />
        <Card 
          label="Security Risk" 
          value="Low" 
          trend={{ value: 0.1, isPositive: true }} 
        />
      </div>

      {/* TREND VISUALIZATION: CASH VS BURN */}
      <div className="bg-[#161a22] p-1 rounded-2xl border border-zinc-800">
        <DashboardChart />
      </div>

      {/* CROSS-MODULE SNAPSHOTS */}
      <div className="grid grid-cols-2 gap-6">
        
        {/* Compliance & Security Snapshot */}
        <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Integrity Snapshots</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Compliance (SOC2)</span>
              <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">98% PASS</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tax Nexus Risk</span>
              <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded">1 STATE NEAR LIMIT</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">AI Hallucination Rate</span>
              <span className="text-xs text-zinc-400 bg-zinc-800 px-2 py-1 rounded">&lt; 0.01%</span>
            </div>
          </div>
        </div>

        {/* Sales & Burn Snapshot */}
        <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">Growth & Efficiency</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg. Quota Attainment</span>
              <span className="text-sm font-mono text-zinc-300">72%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Payroll Ratio</span>
              <span className="text-sm font-mono text-rose-400">42% (High)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Monthly Burn</span>
              <span className="text-sm font-mono text-zinc-300">$124,000</span>
            </div>
          </div>
        </div>

      </div>

      {/* AI STRATEGY BLOCK */}
      <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden">
        {/* Subtle background glow for AI effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full -mr-16 -mt-16" />
        
        <h3 className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <span className="w-1 h-3 bg-blue-500 rounded-full" />
          AI Executive Summary
        </h3>
        <p className="text-zinc-300 leading-relaxed z-10 relative">
          Financial health is <b>Stable</b>. While payroll costs have ticked up 2% this month, the upcoming 
          revenue recognition from the Starlight Inc. contract will offset burn. Suggesting a 
          <b> neutral </b> stance on new OpEx until Q3.
        </p>
      </div>
    </div>
  );
}
