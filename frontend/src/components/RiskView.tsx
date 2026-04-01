// src/components/RiskView.tsx
import { useFinancialStore } from "../store/useFinancialStore";

export default function RiskView() {
  const { isSimulationMode, simulatedRevenue, revenue } = useFinancialStore();
  const activeRevenue = isSimulationMode ? simulatedRevenue : revenue;

  // Mocked anomaly detection logic from FairTix resale data
  const resaleAnomalies = activeRevenue < 100000 ? 5 : 1; 

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 gap-6">
        {/* STRUCTURAL INTEGRITY SCORE */}
        <div className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Structural Integrity</div>
          <div className="text-3xl font-mono text-emerald-400">94/100</div>
          <p className="text-[10px] text-zinc-600 mt-4 leading-relaxed">
            Measures combined health of SOC2 compliance and cash-to-burn ratios.
          </p>
        </div>

        {/* ANOMALY WATCHDOG */}
        <div className={`p-6 rounded-2xl border transition-colors ${resaleAnomalies > 3 ? 'bg-red-500/5 border-red-500/20' : 'bg-zinc-900/50 border-zinc-800'}`}>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">FairTix Resale Watchdog</div>
          <div className={`text-3xl font-mono ${resaleAnomalies > 3 ? 'text-red-400' : 'text-white'}`}>
            {resaleAnomalies} Anomalies
          </div>
          <p className="text-[10px] text-zinc-600 mt-4 leading-relaxed">
            Detecting potential scalping bot clusters in the secondary market.
          </p>
        </div>
      </div>

      {/* COMPLIANCE & LEGAL EXPOSURE */}
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">Legal & Compliance Exposure</h3>
        <div className="space-y-4">
          <ComplianceRow label="Tax Nexus (Florida)" status="Good" detail="No litigation flags detected." />
          <ComplianceRow label="SOC2 Readiness" status="98%" detail="Missing: Background check docs for 'User_09'." />
          <ComplianceRow label="Equity Compliance" status="Stable" detail="Option pool healthy for 7 months." />
        </div>
      </div>
    </div>
  );
}

function ComplianceRow({ label, status, detail }: any) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-zinc-800/50 last:border-0">
      <div>
        <div className="text-xs font-semibold text-white">{label}</div>
        <div className="text-[10px] text-zinc-500 mt-1">{detail}</div>
      </div>
      <div className="text-xs font-mono text-indigo-400">{status}</div>
    </div>
  );
}
