import { useState } from "react";
import { motion } from "framer-motion";

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  const workspace = annual ? 199 : 249;
  const seat = annual ? 29 : 39;

  return (
    <div className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h1 className="text-4xl font-bold mb-6">
          Pricing Built for Operators
        </h1>

        <p className="text-slate-600 max-w-2xl mx-auto">
          Fintra is priced per workspace, per module, and per seat.
          The Decision Operating System is included in every tier.
        </p>

        {/* Billing Toggle */}
        <div className="mt-10 flex justify-center items-center gap-4 text-sm">
          <span className={!annual ? "font-semibold" : ""}>
            Monthly
          </span>

          <button
            onClick={() => setAnnual(!annual)}
            className="bg-slate-300 w-14 h-7 rounded-full relative transition"
          >
            <div
              className={`bg-white w-6 h-6 rounded-full absolute top-0.5 transition-all ${
                annual ? "left-7" : "left-0.5"
              }`}
            />
          </button>

          <span className={annual ? "font-semibold" : ""}>
            Annual (20% off)
          </span>
        </div>

        {/* Pricing Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">

          {/* Workspace Base */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-10 rounded-xl shadow-md text-left"
          >
            <h2 className="text-xl font-semibold mb-4">
              Workspace Base
            </h2>
            <p className="text-3xl font-bold mb-6">
              ${workspace}/mo
            </p>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>✓ Decision Inbox</li>
              <li>✓ Executive Snapshot</li>
              <li>✓ Decision Discipline Score</li>
              <li>✓ Role-Based Views</li>
              <li>✓ Immutable Audit Logs</li>
            </ul>
          </motion.div>

          {/* Modules */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-10 rounded-xl shadow-md text-left border-2 border-blue-600"
          >
            <h2 className="text-xl font-semibold mb-4">
              Modules
            </h2>
            <p className="text-3xl font-bold mb-6">
              Custom
            </p>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>✓ Payroll Intelligence</li>
              <li>✓ Revenue & Margin Modeling</li>
              <li>✓ Expense Leakage Detection</li>
              <li>✓ Compliance Packs</li>
              <li>✓ Sales Commission Modeling</li>
            </ul>
            <p className="mt-6 text-xs text-slate-500">
              Select only the workflows your business requires.
            </p>
          </motion.div>

          {/* Seats */}
          <motion.div
            whileHover={{ y: -6 }}
            className="bg-white p-10 rounded-xl shadow-md text-left"
          >
            <h2 className="text-xl font-semibold mb-4">
              Per Seat
            </h2>
            <p className="text-3xl font-bold mb-6">
              ${seat}/mo
            </p>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>✓ Founder</li>
              <li>✓ CFO</li>
              <li>✓ Operations</li>
              <li>✓ Compliance</li>
              <li>✓ Role-based filtering</li>
            </ul>
          </motion.div>

        </div>

        {/* Enterprise Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-4">
            Enterprise
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto">
            Custom deployment, workspace isolation,
            dedicated support, and advanced governance controls.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
