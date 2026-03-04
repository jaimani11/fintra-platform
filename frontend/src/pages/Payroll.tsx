import { Card } from "../components/Card";
import { useFinancialStore } from "../store/useFinancialStore";
import { useAISynthesis } from "../ai/useAISynthesis";

export default function Payroll() {
  const { payrollRatio } = useFinancialStore();
  const ai = useAISynthesis();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Payroll Module</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card 
          label="Payroll Ratio" 
          value={`${(payrollRatio * 100).toFixed(1)}%`} 
          trend={{ value: 0.4, isPositive: false }} 
        />
        <Card label="Net Position" value={`$${ai.net.toLocaleString()}`} />
        <Card label="Runway" value={`${ai.runway} months`} />
      </div>

      <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
        <div className="text-sm text-zinc-400 mb-2">AI Signals</div>
        <div className={ai.severity === "HIGH" ? "text-rose-400" : "text-emerald-400"}>
          {ai.severity === "HIGH"
            ? "⚠ Labor ratio is trending above sustainable margin."
            : "✓ Payroll within healthy bounds."}
        </div>
      </div>

      <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
        <div className="text-sm text-zinc-400 mb-4">Recommended Actions</div>
        <ul className="space-y-3">
          {["Audit overtime", "Benchmark compensation", "Model hiring scenarios"].map((action) => (
            <li key={action} className="flex items-center gap-2 text-sm text-zinc-300">
              <div className="w-1.5 h-1.5 bg-zinc-600 rounded-full" />
              {action}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
