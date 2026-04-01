import { useState } from "react";

const samplePayroll = {
  workspace_id: "ws_001",
  module: "payroll",
  total_payroll: 184000,
  revenue: 520000,
  labor_ratio: 0.354,
  threshold: 0.32
};

export const DemoConsole = () => {
  const [input, setInput] = useState(JSON.stringify(samplePayroll, null, 2));
  const [output, setOutput] = useState<any>(null);

  const process = () => {
    const parsed = JSON.parse(input);

    const laborRatio = parsed.labor_ratio;
    const threshold = parsed.threshold;

    if (laborRatio > threshold) {
      setOutput({
        decision_id: 92,
        category: "financial",
        severity: "high",
        title: "Labor ratio exceeded threshold",
        impact_chain: [
          "Payroll",
          "Labor %",
          "Margin",
          "Cash Runway"
        ],
        financial_exposure: Math.round(
          parsed.total_payroll * (laborRatio - threshold)
        ),
        recommended_action: "Reduce overtime next period",
        response_deadline_hours: 48
      });
    } else {
      setOutput({
        message: "No material risk detected."
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-6xl mx-auto">

      <h2 className="text-xl font-semibold mb-6">
        Chief of Staff Demo Engine
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        <textarea
          className="border rounded-lg p-4 text-sm font-mono h-96"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="border rounded-lg p-4 bg-slate-50 text-sm font-mono h-96 overflow-auto">
          {output ? JSON.stringify(output, null, 2) : "Processed output will appear here"}
        </div>

      </div>

      <button
        onClick={process}
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg"
      >
        Process Through Chief of Staff
      </button>

    </div>
  );
};
