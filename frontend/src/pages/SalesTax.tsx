import { Card } from "../components/Card";

export default function SalesTax() {
  // Hardcoded revenue & thresholds
  const nexusStates = [
    { state: "California", revenue: 120000, threshold: 100000 },
    { state: "New York", revenue: 85000, threshold: 100000 },
    { state: "Texas", revenue: 480000, threshold: 500000 }, 
  ];

  // Calculate status dynamically
  const calculatedStates = nexusStates.map((item) => {
    let status: "Active" | "Approaching" | "Safe";
    if (item.revenue >= item.threshold) status = "Active";
    else if (item.revenue >= item.threshold * 0.9) status = "Approaching";
    else status = "Safe";

    return { ...item, status };
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Sales Tax & Nexus</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card label="Tax Collected (YTD)" value="$42,390" />
        <Card label="Active Jurisdictions" value="14" />
        <Card label="Pending Filings" value="3" />
      </div>

      <div className="bg-[#161a22] rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-medium">Nexus Watchlist</h2>
          <p className="text-sm text-zinc-400">States approaching economic tax thresholds</p>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-zinc-500 uppercase border-b border-zinc-800">
              <th className="px-6 py-4">State</th>
              <th className="px-6 py-4">Revenue</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {calculatedStates.map((item) => (
              <tr key={item.state} className="text-sm">
                <td className="px-6 py-4 text-white font-medium">{item.state}</td>
                <td className="px-6 py-4 text-zinc-300">${item.revenue.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      item.status === "Active"
                        ? "bg-rose-500/20 text-rose-400"
                        : item.status === "Approaching"
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}