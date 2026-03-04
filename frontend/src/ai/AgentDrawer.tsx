import { Link, useLocation } from "react-router-dom";
import { useAISynthesis } from "./useAISynthesis";
import { useFinancialStore } from "../store/useFinancialStore"; // Import your store
import ReportGenerator from "../components/ReportGenerator";

interface AgentDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function AgentDrawer({ open, onClose }: AgentDrawerProps) {
  const ai = useAISynthesis();
  const location = useLocation();
  
  // Connect to the financial store for Simulation Mode status
  const { isSimulationMode, payrollRatio } = useFinancialStore();

  const currentModule = location.pathname.split("/").pop() || "dashboard";

  // Dynamic CEO Insight based on Simulation Mode
  const getCEOInsight = () => {
    if (isSimulationMode) {
      // Logic triggers if the simulated/live ratio is dangerous
      const status = payrollRatio > 0.45 ? "CRITICAL" : "ADVISORY";
      return {
        severity: status,
        text: `Simulation Mode: Warning, if payroll ratio exceeds 45%, runway drops to 14 months.`
      };
    }
    return {
      severity: ai.severity,
      text: ai.severity === "CRITICAL" 
        ? "Capital intervention needed immediately." 
        : "Live Mode: Strategic capital planning is within scalable parameters."
    };
  };

  const ceoData = getCEOInsight();

  const getModuleInsight = () => {
    switch (currentModule) {
      case "payroll":
        return {
          title: "Payroll Analyst",
          insight: "Labor ratio is at 42%. AI suggests auditing overtime in Engineering to protect margins.",
          metric: "42% Ratio"
        };
      case "accounting":
        return {
          title: "GL Controller",
          insight: "3 transactions in 'Operating' require manual reconciliation before month-end.",
          metric: "3 Pending"
        };
      case "compliance":
        return {
          title: "Compliance Officer",
          insight: "SOC2 readiness is at 98%. Missing: Background check documentation for 'User_09'.",
          metric: "98% Ready"
        };
      case "security":
        return {
          title: "Watchdog Engine",
          insight: "Zero PII leaks detected. Monitoring 2 flagged brute-force attempts from external IPs.",
          metric: "Secure"
        };
      case "sales-commission":
        return {
          title: "Revenue Specialist",
          insight: "Average attainment is 72%. 2 reps are trending toward their Q1 accelerators.",
          metric: "72% Attain."
        };
      case "stock-comp":
        return {
          title: "Equity Strategist",
          insight: "Option pool depletion expected in 7 months based on current hiring velocity.",
          metric: "12% Pool"
        };
      default:
        return {
          title: "Strategy Lead",
          insight: "Runway is healthy at 36 months. Scaling parameters are optimal for Q2.",
          metric: "Stable"
        };
    }
  };

  const moduleData = getModuleInsight();

  return (
    <div 
      className={`fixed right-0 top-0 w-[420px] h-full bg-[#161a22] border-l border-zinc-800 p-8 overflow-auto text-white shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-lg font-semibold tracking-tight">Intelligence Layer</div>
          <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
            {/* Conditional Status Indicator */}
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSimulationMode ? 'bg-amber-400' : 'bg-indigo-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isSimulationMode ? 'bg-amber-500' : 'bg-indigo-500'}`}></span>
            </span>
            {isSimulationMode ? "Simulation active" : "Cross-module executive synthesis"}
          </div>
        </div>
        <button 
          onClick={onClose} 
          className="bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full text-zinc-400 hover:text-white transition"
        >
          ✕
        </button>
      </div>

      <div className="space-y-8">
        {/* 1. DYNAMIC MODULE AGENT */}
        <section>
          <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-4">
            Active Module Insight
          </h3>
          <div className="p-5 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-sm">{moduleData.title}</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded uppercase font-bold">
                {moduleData.metric}
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed italic">
              "{moduleData.insight}"
            </p>
          </div>
        </section>

        {/* 2. CORE EXECUTIVE AGENTS */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">
            Global Executive Panel
          </h3>
          
          <AgentCard
            title="CEO Agent"
            severity={ceoData.severity} // Uses dynamic simulation severity
            summary={ceoData.text} // Uses dynamic simulation text
            link="/app/dashboard"
            highlight={isSimulationMode}
          />

          <AgentCard
            title="CFO Agent"
            severity={ai.severity}
            summary={`Runway: ${ai.runway}mo · Net Assets: $${ai.net.toLocaleString()}`}
            link="/app/accounting"
          />

          <AgentCard
            title="Risk Agent"
            severity={ai.severity}
            summary={`Risk Score: ${(ai.riskScore * 100).toFixed(0)}% · Compliance Watchdog Active.`}
            link="/app/compliance"
          />
        </section>

        {/* 3. CHAT INPUT */}
        <div className="pt-4">
          <div className="relative">
            <input 
              placeholder={`Ask the ${moduleData.title}...`}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 pr-12 text-sm outline-none focus:border-indigo-500 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-zinc-600">
              ENT
            </div>
          </div>
        </div>

        {/* 4. EXPORT ACTIONS */}
        <div className="mt-8 pt-6 border-t border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase font-bold mb-4 tracking-widest">
            Export Intelligence
          </p>
          <ReportGenerator />
        </div>
      </div>
    </div>
  );
}

function AgentCard({ title, summary, link, severity, highlight }: any) {
  // Logic for severity colors including a "Simulation Warning" color
  const severityColor = 
    severity === "CRITICAL" ? "text-red-400" : 
    severity === "ADVISORY" ? "text-amber-400" : 
    "text-emerald-400";
  
  return (
    <div className={`p-4 rounded-xl transition-all group border ${
      highlight 
        ? "bg-amber-500/5 border-amber-500/20" 
        : "bg-black/20 border-white/5 hover:border-white/10"
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium">{title}</div>
        <div className={`text-[10px] font-bold uppercase tracking-tighter ${severityColor}`}>
          {severity}
        </div>
      </div>
      <div className="text-xs text-zinc-500 mb-3 leading-snug">
        {summary}
      </div>
      <Link 
        to={link} 
        className={`${highlight ? 'text-amber-400' : 'text-indigo-400'} text-xs font-semibold hover:underline flex items-center gap-1 group`}
      >
        View Data <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  );
}
