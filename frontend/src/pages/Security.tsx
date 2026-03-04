import { Card } from "../components/Card";
import { useAISynthesis } from "../ai/useAISynthesis";

export default function Security() {
  const ai = useAISynthesis();

  const securityLogs = [
    { event: "PII Scrubbing", status: "Active", impact: "0 leaks" },
    { event: "Model Hallucination Check", status: "Passing", impact: "< 0.1%" },
    { event: "Prompt Injection Shield", status: "Active", impact: "Blocked 2" },
    { event: "Data Access Audit", status: "Verified", impact: "Internal only" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">AI Security Watchdog</h1>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-bold">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          SYSTEM SECURE
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card label="AI Accuracy Rate" value="99.9%" trend={{ value: 0.2, isPositive: true }} />
        <Card label="Blocked Anomalies" value="14" />
        <Card label="Data Latency" value="240ms" />
      </div>

      {/* Watchdog Status */}
      <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
        <div className="text-sm text-zinc-400 mb-4">Guardrail Monitoring</div>
        <div className="space-y-4">
          {securityLogs.map((log) => (
            <div key={log.event} className="flex items-center justify-between p-3 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
              <div>
                <div className="text-sm font-medium text-white">{log.event}</div>
                <div className="text-xs text-zinc-500">{log.impact}</div>
              </div>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-400/5 px-2 py-1 rounded">
                {log.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-2xl">
        <div className="text-sm text-rose-400 font-medium mb-2">Integrity Alert</div>
        <p className="text-sm text-zinc-300">
          The Watchdog detected a high-variance forecast in the <b>Budgeting Module</b>. 
          AI results were suppressed and re-routed for human verification to ensure accuracy.
        </p>
      </div>
    </div>
  );
}
