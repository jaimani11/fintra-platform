import { useState } from "react";

import { analyzePayroll } from "../engine/payroll";
import { analyzeBudget } from "../engine/budgeting";
import { synthesize } from "../engine/chiefOfStaff";

export const DemoConsole = () => {
  const [input, setInput] = useState(
    JSON.stringify(
      {
        revenue: 200000,
        payrollRatio: 0.42,
        otherBurn: 60000
      },
      null,
      2
    )
  );

  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runEngine = () => {
    try {
      setError(null);

      const parsed = JSON.parse(input);

      const { revenue, payrollRatio, otherBurn } = parsed;

      const payroll = revenue * payrollRatio;
      const totalBurn = payroll + otherBurn;

      // Run individual modules
      const payrollSIP = analyzePayroll(revenue, payrollRatio);
      const budgetSIP = analyzeBudget(revenue, totalBurn);

      // Synthesize executive decision
      const executive = synthesize([
        payrollSIP,
        budgetSIP
      ]);

      setOutput({
        modules: {
          payroll: payrollSIP,
          budgeting: budgetSIP
        },
        executive
      });

    } catch (err: any) {
      setError("Invalid JSON input");
      setOutput(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-8 py-20">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-semibold mb-12">
          Chief of Staff Engine Console
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* INPUT */}
          <div>
            <div className="text-sm text-zinc-400 mb-3">
              Structured Input (Operational Snapshot)
            </div>

            <textarea
              className="w-full h-[500px] bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-sm font-mono focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* OUTPUT */}
          <div>
            <div className="text-sm text-zinc-400 mb-3">
              AI Executive Output
            </div>

            <div className="w-full h-[500px] bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-sm font-mono overflow-auto">
              {error && (
                <div className="text-red-500">{error}</div>
              )}

              {!error && output && (
                <pre>
                  {JSON.stringify(output, null, 2)}
                </pre>
              )}

              {!error && !output && (
                <div className="text-zinc-500">
                  Processed output will appear here.
                </div>
              )}
            </div>
          </div>

        </div>

        <button
          onClick={runEngine}
          className="mt-10 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:opacity-80 transition"
        >
          Run Chief of Staff Engine
        </button>

      </div>

    </div>
  );
};
