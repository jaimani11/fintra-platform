import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { useFinancialStore } from "../store/useFinancialStore";

interface NexusState {
  state: string;
  revenue: number;
  threshold: number;
  status: "Safe" | "Approaching" | "Active";
}

export default function SalesTax() {
  const { addNotification } = useFinancialStore();
  const [nexusStates, setNexusStates] = useState<NexusState[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch backend data
  useEffect(() => {
    async function fetchNexusData() {
      try {
        const response = await fetch("/api/sales_tax"); // Backend endpoint
        if (!response.ok) throw new Error("Failed to fetch sales tax data");
        const data: NexusState[] = await response.json();
        setNexusStates(data);

        // Trigger notifications for Active/Approaching states
        data.forEach((state) => {
          if (state.status === "Active" || state.status === "Approaching") {
            addNotification({
              id: `nexus-${state.state}`,
              type: state.status === "Active" ? "CRITICAL" : "INFO",
              message: `${state.state} is ${state.status} for economic nexus!`,
            });
          }
        });

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchNexusData();
  }, [addNotification]);

  // Loading state
  if (loading) return <div>Loading Sales Tax Data...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Sales Tax & Nexus</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card label="Tax Collected (YTD)" value="$42,390" />
        <Card label="Active Jurisdictions" value={nexusStates.filter(s => s.status === "Active").length.toString()} />
        <Card label="Pending Filings" value={nexusStates.filter(s => s.status === "Approaching").length.toString()} />
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
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    item.status === 'Active' ? 'bg-rose-500/20 text-rose-400' :
                    item.status === 'Approaching' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-zinc-800 text-zinc-400'
                  }`}>
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