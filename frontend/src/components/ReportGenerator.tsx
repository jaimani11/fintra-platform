// src/components/ReportGenerator.tsx
import { useAISynthesis } from "../ai/useAISynthesis";

export default function ReportGenerator() {
  const ai = useAISynthesis();

  const handleDownload = () => {
    // In a real app, you'd use a library like jspdf or a server-side route
    console.log("Generating Executive Report...", {
      date: new Date().toLocaleDateString(),
      metrics: { runway: ai.runway, net: ai.net, risk: ai.riskScore },
      aiSummary: "All systems nominal. Burn rate optimized for 36-month runway."
    });
    alert("Executive Report Generated. Check console for data payload.");
  };

  return (
    <button 
      onClick={handleDownload}
      className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200 transition-all shadow-lg"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download Executive PDF
    </button>
  );
}
