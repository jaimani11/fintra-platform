import { Card } from "../components/Card";

export default function StockComp() {
  // Logic: Dilution & Pool Math
  const totalSharesOutstanding = 10000000;
  const optionPoolRemaining = 1200000;
  const totalFullyDiluted = totalSharesOutstanding + optionPoolRemaining;
  
  const poolPostMoneyPercent = (optionPoolRemaining / totalFullyDiluted) * 100;

  const vestingSchedules = [
    { holder: "Engineering Lead", grants: "40,000", vested: "10,000", nextCliff: "Oct 2026", status: "Active" },
    { holder: "Product Manager", grants: "25,000", vested: "2,500", nextCliff: "Jan 2027", status: "Active" },
    { holder: "Sales VP", grants: "80,000", vested: "60,000", nextCliff: "N/A", status: "Fully Vested" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Equity & Stock Comp</h1>

      {/* KPI ROW */}
      <div className="grid grid-cols-3 gap-6">
        <Card 
          label="Option Pool Remaining" 
          value={`${poolPostMoneyPercent.toFixed(2)}%`} 
          trend={{ value: 1.2, isPositive: false }} 
        />
        <Card label="Total Shares FD" value={totalFullyDiluted.toLocaleString()} />
        <Card label="Exercise Value (Est.)" value="$4.2M" />
      </div>

      {/* Dilution Alert */}
      <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-amber-400 font-medium text-sm">Pool Depletion Warning</div>
            <div className="text-zinc-300 mt-1">At current hiring rates, the option pool will be exhausted in <b>7 months</b>.</div>
          </div>
          <button className="bg-amber-500 text-black px-4 py-2 rounded-lg text-sm font-bold">
            Model Refresh
          </button>
        </div>
      </div>

      {/* Vesting Table */}
      <div className="bg-[#161a22] rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-lg font-medium">Vesting Schedules</h2>
          <p className="text-sm text-zinc-400">Tracking 4-year standard cliffs and monthly vesting</p>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs text-zinc-500 uppercase border-b border-zinc-800">
              <th className="px-6 py-4">Stakeholder</th>
              <th className="px-6 py-4">Total Grant</th>
              <th className="px-6 py-4">Vested to Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {vestingSchedules.map((item, idx) => (
              <tr key={idx} className="text-sm">
                <td className="px-6 py-4 text-white font-medium">{item.holder}</td>
                <td className="px-6 py-4 text-zinc-300">{item.grants}</td>
                <td className="px-6 py-4 text-zinc-300">{item.vested}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    item.status === 'Fully Vested' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
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
