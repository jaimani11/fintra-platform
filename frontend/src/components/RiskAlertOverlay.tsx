import React from 'react';
import { useFinancialStore } from "../store/useFinancialStore";

export default function RiskAlertOverlay() {
  const { notifications, removeNotification, executeMitigation } = useFinancialStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[100] space-y-4 w-80">
      {notifications.map((n) => (
        <div 
          key={n.id}
          className="bg-[#1a0b0b] border border-red-900/50 p-4 rounded-2xl shadow-2xl backdrop-blur-xl animate-in slide-in-from-right-10"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">System Risk</span>
            </div>
            <button onClick={() => removeNotification(n.id)} className="text-zinc-600 hover:text-white text-xs">✕</button>
          </div>
          
          <p className="text-xs text-zinc-200 leading-relaxed">{n.message}</p>
          
          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => executeMitigation(n.id)}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2 rounded-lg transition-colors"
            >
              EXECUTE MITIGATION
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
