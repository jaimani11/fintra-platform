// src/components/DashboardChart.tsx
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Bar, ComposedChart 
} from 'recharts';

const data = [
  { month: 'Oct', cash: 980000, burn: 110000 },
  { month: 'Nov', cash: 870000, burn: 115000 },
  { month: 'Dec', cash: 755000, burn: 140000 },
  { month: 'Jan', cash: 640000, burn: 120000 },
  { month: 'Feb', cash: 520000, burn: 125000 },
];

export default function DashboardChart() {
  return (
    <div className="h-[350px] w-full bg-[#161a22] p-6 rounded-2xl border border-zinc-800">
      <h3 className="text-sm font-medium text-zinc-400 mb-6 uppercase tracking-wider">
        Cash Position vs. Burn Rate
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data}>
          <defs>
            <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#71717a" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            stroke="#71717a" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
            itemStyle={{ fontSize: '12px' }}
          />
          <Area 
            type="monotone" 
            dataKey="cash" 
            stroke="#6366f1" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorCash)" 
          />
          <Bar dataKey="burn" barSize={30} fill="#3f3f46" radius={[6, 6, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
