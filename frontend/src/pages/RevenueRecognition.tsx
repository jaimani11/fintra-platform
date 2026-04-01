import { Card } from "../components/Card";

export default function RevenueRecognition() {
  const totalContractValue = 1200000;
  const recognizedYTD = 450000;
  const deferredBalance = totalContractValue - recognizedYTD;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Revenue Recognition</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card 
          label="Recognized (YTD)" 
          value={`$${(recognizedYTD / 1000).toFixed(0)}k`} 
          trend={{ value: 12, isPositive: true }} 
        />
        <Card label="Deferred Revenue" value={`$${(deferredBalance / 1000).toFixed(0)}k`} />
        <Card label="Contract Liabilities" value="$142,000" />
      </div>

      <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
        <div className="text-sm text-zinc-400 mb-2">ASC 606 Status</div>
        <div className="flex items-center gap-3">
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[37.5%]" />
          </div>
          <span className="text-xs font-mono">37.5% Vested</span>
        </div>
        <p className="text-sm text-zinc-500 mt-4">
          Performance obligations are being tracked against 14 active Enterprise contracts.
        </p>
      </div>
    </div>
  );
}
