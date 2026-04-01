// src/components/Card.tsx
interface CardProps {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function Card({ label, value, trend }: CardProps) {
  return (
    <div className="bg-[#161a22] p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between">
      <div>
        <div className="text-sm text-zinc-400 font-medium">{label}</div>
        <div className="text-2xl mt-2 font-semibold text-white">{value}</div>
      </div>
      {trend && (
        <div className={`text-xs mt-4 ${trend.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
          {trend.isPositive ? '↑' : '↓'} {trend.value}% vs last month
        </div>
      )}
    </div>
  );
}
