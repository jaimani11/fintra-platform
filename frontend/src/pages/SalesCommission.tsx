import { Card } from "../components/Card";
import { useState } from "react";

export default function SalesCommission() {
  const [dealValue, setDealValue] = useState(50000);
  
  // Logic: Tiered Commission Calculator
  // 0-100k = 10% | 100k+ = 15% (Accelerator)
  const quota = 100000;
  const currentAttainment = 85000;
  const newTotal = currentAttainment + dealValue;
  
  const calculateCommission = (val: number) => {
    if (newTotal <= quota) return val * 0.10;
    if (currentAttainment >= quota) return val * 0.15;
    
    const amountInBaseTier = quota - currentAttainment;
    const amountInAccelerator = val - amountInBaseTier;
    return (amountInBaseTier * 0.10) + (amountInAccelerator * 0.15);
  };

  const leads = [
    { company: "Acme Corp", value: "$120k", stage: "Proposal", heat: "High" },
    { company: "Global Tech", value: "$45k", stage: "Discovery", heat: "Medium" },
    { company: "Starlight Inc", value: "$200k", stage: "Negotiation", heat: "High" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold">Sales Commissions</h1>

      {/* KPI ROW */}
      <div className="grid grid-cols-3 gap-6">
        <Card label="Quota Attainment" value="85%" trend={{ value: 5, isPositive: true }} />
        <Card label="Pending Commissions" value="$12,400" />
        <Card label="Pipeline Weighted Value" value="$450k" />
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Commission Calculator */}
        <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-lg font-medium mb-4">Payout Calculator</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase">New Deal Value</label>
              <input 
                type="number" 
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 mt-1 text-white"
              />
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <div className="text-sm text-emerald-400">Estimated Payout</div>
              <div className="text-3xl font-bold text-white">${calculateCommission(dealValue).toLocaleString()}</div>
              <div className="text-xs text-zinc-500 mt-2">
                Includes 15% accelerator on amounts over $100k quota
              </div>
            </div>
          </div>
        </div>

        {/* Lead Tracker */}
        <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
          <h2 className="text-lg font-medium mb-4">Hot Leads</h2>
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.company} className="flex justify-between items-center p-3 bg-zinc-900/50 rounded-lg border border-zinc-800">
                <div>
                  <div className="text-sm font-medium">{lead.company}</div>
                  <div className="text-xs text-zinc-500">{lead.stage} • {lead.value}</div>
                </div>
                <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                  lead.heat === 'High' ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {lead.heat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
