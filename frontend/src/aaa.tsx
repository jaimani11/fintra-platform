import { useState } from "react";
import { motion } from "framer-motion";

type Scenario = "payroll" | "revenue" | "expense" | null;

const scenarios = {
  payroll: {
    title: "Labor Ratio Breach",
    severity: "High",
    color: "text-red-400",
    exposure: 32400,
    impact: ["Payroll", "Gross Margin", "Runway"],
    decision:
      "Freeze hiring and reduce overtime within 48 hours to protect 1.2 months of runway.",
  },
  revenue: {
    title: "Revenue Timing Risk",
    severity: "Medium",
    color: "text-yellow-400",
    exposure: 18200,
    impact: ["Revenue", "Compliance", "Board Reporting"],
    decision:
      "Adjust ASC 606 recognition schedule and notify controller before quarter close.",
  },
  expense: {
    title: "Vendor Cost Anomaly",
    severity: "Medium",
    color: "text-yellow-400",
    exposure: 24600,
    impact: ["Expense", "Margin", "Cash Flow"],
    decision:
      "Initiate vendor renegotiation workflow and audit historical overcharges.",
  },
};

export default function Home() {
  const [scenario, setScenario] = useState<Scenario>(null);

  const current = scenario ? scenarios[scenario] : null;

  return (
    <div className="bg-black text-white">

      {/* ================= HERO ================= */}
      <section className="py-32 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-6xl font-semibold leading-tight">
            Run your company
            <br />
            on measured decisions.
          </h1>

          <p className="mt-8 text-slate-400 text-lg max-w-2xl mx-auto">
            Fintra is an AI Chief of Staff that detects operational risk,
            models financial impact, and enforces execution discipline
            across your entire business.
          </p>

        </div>
      </section>

      {/* ================= LIVE DECISION ENGINE ================= */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12">

            {/* LEFT: SCENARIO SELECTOR */}
            <div>
              <div className="text-sm text-slate-500 uppercase tracking-wider mb-6">
                Live Simulation
              </div>

              <h2 className="text-3xl font-semibold mb-10">
                AI Chief of Staff
              </h2>

              <div className="space-y-4">

                <button
                  onClick={() => setScenario("payroll")}
                  className="w-full text-left border border-slate-700 rounded-xl px-6 py-4 hover:border-white transition"
                >
                  Payroll exceeds labor ratio
                </button>

                <button
                  onClick={() => setScenario("revenue")}
                  className="w-full text-left border border-slate-700 rounded-xl px-6 py-4 hover:border-white transition"
                >
                  Revenue recognition timing risk
                </button>

                <button
                  onClick={() => setScenario("expense")}
                  className="w-full text-left border border-slate-700 rounded-xl px-6 py-4 hover:border-white transition"
                >
                  Expense leakage anomaly
                </button>

              </div>
            </div>

            {/* RIGHT: DECISION OUTPUT */}
            <motion.div
              key={scenario}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 min-h-[420px]"
            >
              {!current && (
                <div className="text-slate-500">
                  Select a scenario to simulate executive decision output.
                </div>
              )}

              {current && (
                <div className="space-y-6">

                  {/* Severity */}
                  <div className={`text-xs uppercase tracking-widest ${current.color}`}>
                    {current.severity} Severity
                  </div>

                  {/* Title */}
                  <div className="text-2xl font-semibold">
                    {current.title}
                  </div>

                  {/* Exposure */}
                  <div>
                    <div className="text-slate-400 text-sm">
                      Financial Exposure
                    </div>
                    <div className="text-3xl font-semibold">
                      ${current.exposure.toLocaleString()}
                    </div>
                  </div>

                  {/* Impact Chain */}
                  <div>
                    <div className="text-slate-400 text-sm mb-2">
                      Impact Cascade
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      {current.impact.map((item) => (
                        <div
                          key={item}
                          className="px-3 py-1 bg-slate-800 rounded-lg text-sm"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decision */}
                  <div className="pt-6 border-t border-slate-800">
                    <div className="text-slate-400 text-sm mb-2">
                      AI Recommendation
                    </div>
                    <div className="text-white">
                      {current.decision}
                    </div>
                  </div>

                </div>
              )}

            </motion.div>

          </div>

        </div>
      </section>

      {/* ================= CREDIBILITY SECTION ================= */}
      <section className="py-24 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-slate-400">

          <div>
            <div className="text-white font-semibold mb-4">
              Detect
            </div>
            Cross-module anomaly detection across payroll, revenue,
            expense, and compliance systems.
          </div>

          <div>
            <div className="text-white font-semibold mb-4">
              Prioritize
            </div>
            Risk-weighted exposure modeling tied directly to runway,
            margin, and board reporting.
          </div>

          <div>
            <div className="text-white font-semibold mb-4">
              Enforce
            </div>
            Execution guardrails, approvals, and decision discipline
            scoring built in.
          </div>

        </div>
      </section>

    </div>
  );
}
