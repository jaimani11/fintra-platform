import React from 'react';
import { useFinancialStore } from "../store/useFinancialStore";

/**
 * RISK ALERT OVERLAY
 * Renders high-priority system alerts over the entire AppShell.
 */
export default function RiskAlertOverlay() {
  const { notifications, removeNotification, executeMitigation, theme } = useFinancialStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 z-[9999] space-y-4 w-80 pointer-events-none">
      {notifications.map((n) => (
        <div 
          key={n.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-2xl backdrop-blur-xl border animate-in slide-in-from-right-10 duration-300 ${
            theme === 'dark' 
              ? 'bg-red-950/80 border-red-500/30' 
              : 'bg-white border-red-200'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}>
                {n.type} ALERT
              </span>
            </div>
            <button 
              onClick={() => removeNotification(n.id)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className={`text-xs leading-relaxed mb-4 ${
            theme === 'dark' ? 'text-zinc-200' : 'text-zinc-800'
          }`}>
            {n.message}
          </p>
          
          <button 
            onClick={() => executeMitigation(n.id)}
            className="w-full bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold py-2.5 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95"
          >
            EXECUTE MITIGATION
          </button>
        </div>
      ))}
    </div>
  );
}
