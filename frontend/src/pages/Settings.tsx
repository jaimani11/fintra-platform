import React from "react";
import { useFinancialStore } from "../store/useFinancialStore";

export default function Settings() {
  const { theme, toggleTheme } = useFinancialStore();

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold text-white">Settings</h2>
        <p className="text-zinc-500 mt-2">Manage your Fintra environment and preferences.</p>
      </header>

      <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8">
        <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">Appearance</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white font-medium">Interface Theme</div>
            <div className="text-xs text-zinc-500 mt-1">Switch between dark and light mode for the Control Tower.</div>
          </div>
          
          <button 
            onClick={toggleTheme}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl transition-all border border-zinc-700"
          >
            {/* FIXED: Changed the closing </div> to </span> */}
            <span className="text-xs font-bold uppercase text-white">
              {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
