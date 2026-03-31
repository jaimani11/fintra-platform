import { useEffect, useState } from "react";
import { Card } from "../components/Card";

interface NexusState {
  state: string;
  revenue: number;
  threshold: number;
  status: "Active" | "Approaching" | "Safe" | "Error";
}

export default function SalesTax() {
  // Hardcoded revenue & thresholds
  const [nexusStates, setNexusStates] = useState<NexusState[]>([
    { state: "California", revenue: 120000, threshold: 100000, status: "Safe" },
    { state: "New York", revenue: 95000, threshold: 100000, status: "Safe" },
    { state: "Texas", revenue: 480000, threshold: 500000, status: "Safe" }, 
  ]);

  // Fetch backend analysis to determine status
  useEffect(() => {
    async function fetchStatus() {
      const updatedStates = await Promise.all(
        nexusStates.map(async (s) => {
          try {
            const res = await fetch("/api/analyze", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                org_id: "ORG001",
                jurisdiction: s.state,
                period_start: "2026-01-01",
                period_end: "2026-03-31",
                tax_collected: s.revenue * 0.1, // placeholder
                tax_remitted: s.revenue * 0.08, // placeholder
                total_sales: s.revenue,
                transaction_count: 50, // placeholder
              }),
            });

            const data = await res.json();

            // Determine status from backend issues/warnings
            let status: "Active" | "Approaching" | "Safe" | "Error" = "Safe";
            if (data.issues && data.issues.length > 0) status = "Active";
            else if (data.warnings && data.warnings.length > 0) status = "Approaching";

            return { ...s, status };
          } catch (err) {
            return { ...s, status: "Error" };
          }
        })
      );

      setNexusStates(updatedStates);
    }

    fetchStatus();
  }, []);

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
            {nexusStates.map((item) => (
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
                        : item.status === "Safe"
                        ? "bg-zinc-800 text-zinc-400"
                        : "bg-red-600/20 text-red-500"
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