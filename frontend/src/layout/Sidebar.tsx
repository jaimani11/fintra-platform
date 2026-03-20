import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useFinancialStore } from "../store/useFinancialStore";

export default function Sidebar() {
  const { 
    theme,
    isSimulationMode, 
    simulatedRevenue, setSimulatedRevenue,
    resetToLive,
    triggerShock,
    viewMode,
    setViewMode,
    addNotification 
  } = useFinancialStore();

  const [ticker, setTicker] = useState<{ label: string, amount: string, isAnomaly: boolean }[]>([]);

  // VENTURE STREAM ENGINE: Monitors FairTix, Fintra Hub, and Endless Moments
  useEffect(() => {
    const ventures = ["FairTix", "Fintra Hub", "Endless Moments"];
    const interval = setInterval(() => {
      const isAnomaly = Math.random() > 0.85; 
      const newSale = {
        label: ventures[Math.floor(Math.random() * ventures.length)],
        amount: (Math.random() * 800 + 20).toFixed(2),
        isAnomaly
      };

      setTicker(prev => [newSale, ...prev].slice(0, 3));

      if (isAnomaly) {
        addNotification({
          id: Date.now().toString(),
          type: 'CRITICAL',
          message: `High-risk anomaly in ${newSale.label}. Potential structural failure detected.`
        });
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, [addNotification]);

  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      isActive 
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
        : theme === 'dark' 
          ? "text-zinc-400 hover:bg-zinc-800 hover:text-white" 
          : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
    }`;

  return (
    <aside className={`w-72 flex flex-col h-screen sticky top-0 border-r transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0d1117] border-zinc-800' : 'bg-white border-zinc-200'
    }`}>
      
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-8 mt-8 mb-10">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white italic shadow-lg shadow-indigo-600/20">F</div>
        <span className={`text-xl font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>Fintra</span>
      </div>

      <div className="flex-1 space-y-8 overflow-y-auto px-4 custom-scrollbar">
        {/* EXECUTIVE MODES */}
        <section className="space-y-2">
          <h3 className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-2">Executive View</h3>
          <div className="grid grid-cols-2 gap-2">
            {['CEO', 'CFO', 'COO', 'Risk'].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`py-2 rounded-lg text-[10px] font-bold border transition-all ${
                  viewMode === mode 
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-md" 
                    : theme === 'dark' 
                      ? "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700" 
                      : "bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </section>

        {/* OPERATIONS MODULES - FULLY RESTORED */}
        <section className="space-y-1">
          <h3 className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-2">Operations</h3>
          <NavLink to="/app/dashboard" className={getLinkClass}>Dashboard</NavLink>
          <NavLink to="/app/accounting" className={getLinkClass}>Accounting</NavLink>
          <NavLink to="/app/payroll" className={getLinkClass}>Payroll</NavLink>
          <NavLink to="/app/budgeting" className={getLinkClass}>Budgeting</NavLink>
        </section>

        {/* GOVERNANCE - FULLY RESTORED */}
        <section className="space-y-1">
          <h3 className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-2">Governance</h3>
          <NavLink to="/app/compliance" className={getLinkClass}>Compliance</NavLink>
          <NavLink to="/app/sales-tax" className={getLinkClass}>Sales Tax</NavLink>
          <NavLink to="/app/security" className={getLinkClass}>Security</NavLink>
        </section>

        {/* SIMULATION PANEL */}
        <div className={`p-4 rounded-2xl border transition-all duration-300 ${
          isSimulationMode 
            ? "bg-amber-500/5 border-amber-500/20 shadow-inner" 
            : theme === 'dark' ? "bg-zinc-900/30 border-zinc-800" : "bg-zinc-50 border-zinc-200"
        }`}>
          <h3 className={`text-[10px] font-bold uppercase tracking-widest mb-4 ${isSimulationMode ? "text-amber-500" : "text-zinc-500"}`}>
            Simulation {isSimulationMode && "• Active"}
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-[10px] mb-2 text-zinc-500">
                <span>REVENUE</span>
                <span className={theme === 'dark' ? 'text-zinc-300' : 'text-zinc-700'}>${simulatedRevenue.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="0" max="1000000" step="10000"
                value={simulatedRevenue}
                disabled={!isSimulationMode}
                onChange={(e) => setSimulatedRevenue(Number(e.target.value))}
                className="w-full accent-amber-500 h-1 bg-zinc-300 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer disabled:opacity-30"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={resetToLive} className="flex-1 py-2 text-[9px] font-bold text-zinc-500 border border-zinc-300 dark:border-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">RESET</button>
              <button onClick={triggerShock} className="flex-1 py-2 text-[9px] font-bold text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors">SHOCK</button>
            </div>
          </div>
        </div>
      </div>

      {/* VENTURE STREAM TICKER */}
      <div className={`p-6 border-t transition-colors duration-300 ${
        theme === 'dark' ? 'border-zinc-800 bg-black/20' : 'border-zinc-200 bg-zinc-50'
      }`}>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Venture Stream</span>
        </div>
        <div className="space-y-4">
          {ticker.map((sale, i) => (
            <div key={i} className="animate-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-400 font-medium uppercase tracking-tighter">{sale.label}</span>
                <span className="text-zinc-500 font-mono opacity-50 text-[8px]">LIVE</span>
              </div>
              <div className={`text-sm font-mono font-bold mt-0.5 ${
                sale.isAnomaly ? 'text-red-500 animate-pulse' : 'text-emerald-500'
              }`}>
                {sale.isAnomaly ? '⚠️ RISK FLAG' : `+$${sale.amount}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
