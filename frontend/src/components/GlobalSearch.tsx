import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GlobalSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // FULL SEARCH INDEX
  const searchIndex = [
    { id: 1, name: "Dashboard", path: "/app/dashboard", type: "Executive" },
    { id: 2, name: "Accounting", path: "/app/accounting", type: "Finance" },
    { id: 3, name: "Payroll", path: "/app/payroll", type: "Finance" },
    { id: 4, name: "Budgeting", path: "/app/budgeting", type: "Finance" },
    { id: 5, name: "Revenue Recognition", path: "/app/revenue-recognition", type: "Finance" },
    { id: 6, name: "Sales Tax & Nexus", path: "/app/sales-tax", type: "Tax" },
    { id: 7, name: "Sales Commission", path: "/app/sales-commission", type: "Sales" },
    { id: 8, name: "Stock Comp & Equity", path: "/app/stock-comp", type: "HR" },
    { id: 9, name: "Compliance (SOC2)", path: "/app/compliance", type: "Governance" },
    { id: 10, name: "Security Watchdog", path: "/app/security", type: "System" },
    { id: 11, name: "Settings", path: "/app/settings", type: "System" },
  ];

  const filteredResults = query === "" 
    ? [] 
    : searchIndex.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault(); // Prevents browser search from opening
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl bg-[#161a22] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-zinc-800 flex items-center gap-3">
          <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            autoFocus
            placeholder="Search all Fintra modules..."
            className="w-full bg-transparent text-lg outline-none text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-500">ESC</kbd>
        </div>
        
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredResults.length > 0 ? (
            filteredResults.map(result => (
              <button
                key={result.id}
                onClick={() => {
                  navigate(result.path);
                  setIsOpen(false);
                  setQuery("");
                }}
                className="w-full text-left p-3 hover:bg-indigo-600/20 rounded-xl flex justify-between items-center group transition-all"
              >
                <div>
                  <div className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors">
                    {result.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{result.path}</div>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded border border-zinc-700/50">
                  {result.type}
                </span>
              </button>
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-zinc-500 text-sm">
                {query === "" ? "Type to search across the Control Tower" : "No modules found matching that query"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
