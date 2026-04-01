import { Card } from "../components/Card";

export default function Accounting() {
  const accounts = [
    { name: "Operating Account", balance: "$450,200", status: "Reconciled" },
    { name: "Payroll Reserve", balance: "$120,000", status: "Pending (2)" },
    { name: "Tax Savings", balance: "$85,000", status: "Reconciled" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">General Ledger & Accounting</h1>

      <div className="grid grid-cols-3 gap-6">
        <Card label="Cash on Hand" value="$655,200" trend={{ value: 4.2, isPositive: true }} />
        <Card label="Accounts Payable" value="$12,300" />
        <Card label="Accounts Receivable" value="$84,000" />
      </div>

      {/* Reconciliation Watchdog */}
      <div className="bg-[#161a22] rounded-2xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Account Reconciliation</h2>
            <p className="text-sm text-zinc-400">Status of connected bank feeds</p>
          </div>
          <button className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg transition">
            Sync All Feeds
          </button>
        </div>
        <div className="divide-y divide-zinc-800">
          {accounts.map((acc) => (
            <div key={acc.name} className="p-4 px-6 flex items-center justify-between">
              <div className="text-sm font-medium">{acc.name}</div>
              <div className="flex items-center gap-6">
                <div className="text-sm text-zinc-300 font-mono">{acc.balance}</div>
                <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                  acc.status.includes('Pending') ? 'bg-amber-500/10 text-amber-400' : 'bg-emerald-500/10 text-emerald-400'
                }`}>
                  {acc.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
