import { useFinancialStore } from "../store/useFinancialStore";

export default function TopNav({ onOpenAI }: { onOpenAI: () => void }) {
  const { theme, toggleTheme } = useFinancialStore();

  const handleOpenSearch = () => {
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <nav className={`h-16 border-b flex items-center justify-between px-8 backdrop-blur-md transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0f1117]/50 border-zinc-800 text-white' 
        : 'bg-white/70 border-zinc-200 text-zinc-900 shadow-sm'
    }`}>
      <div className="flex items-center gap-4">
        <span className={`text-xs font-bold uppercase tracking-widest ${
          theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400'
        }`}>
          Control Tower
        </span>
        
        <button
          onClick={handleOpenSearch}
          className={`flex items-center gap-2 border px-3 py-1.5 rounded-md text-xs transition-colors ${
            theme === 'dark' 
              ? 'bg-zinc-800/50 hover:bg-zinc-800 border-zinc-700 text-zinc-400' 
              : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-600'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search...
          <kbd className={`ml-2 font-sans text-[10px] px-1.5 py-0.5 rounded border ${
            theme === 'dark' ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-300'
          }`}>⌘K</kbd>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-colors border text-lg ${
            theme === 'dark' 
              ? 'hover:bg-zinc-800 border-zinc-700' 
              : 'hover:bg-zinc-100 border-zinc-300'
          }`}
          title="Toggle Light/Dark Mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <button 
          onClick={onOpenAI}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          Open AI Control
        </button>
      </div>
    </nav>
  );
}
