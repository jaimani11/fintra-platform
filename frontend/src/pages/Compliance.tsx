import { Card } from "../components/Card";

export default function Compliance() {
  const controls = [
    { name: "MFA Enabled", status: "Pass", system: "Google Workspace" },
    { name: "Background Checks", status: "Warning", system: "Checkr" },
    { name: "Encrypted Databases", status: "Pass", system: "AWS" },
    { name: "Employee Training", status: "Pass", system: "Internal" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Compliance</h1>
        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
          SOC2 Ready
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card label="Overall Trust Score" value="98.2%" trend={{ value: 2.1, isPositive: true }} />
        <Card label="Tests Passing" value="142 / 145" />
        <Card label="Evidence Uploads" value="28" />
      </div>

      <div className="bg-[#161a22] rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-medium">Automated Control Monitoring</h2>
        </div>
        <div className="divide-y divide-zinc-800">
          {controls.map((control) => (
            <div key={control.name} className="p-4 px-6 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">{control.name}</div>
                <div className="text-xs text-zinc-500">{control.system}</div>
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                control.status === 'Pass' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
              }`}>
                {control.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
