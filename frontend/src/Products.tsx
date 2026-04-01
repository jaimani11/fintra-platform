

const Products = () => {
  return (
    <div className="section">
      <div className="container">

        <h1 className="text-4xl font-semibold">
          Fintra Platform
        </h1>

        <p className="mt-6 text-slate-600 max-w-3xl">
          Fintra unifies payroll, accounting, budgeting,
          compliance, and revenue into a single
          decision intelligence layer.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-16">

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Core Systems
            </h2>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Payroll & Labor Ratio Monitoring</li>
              <li>• Accounting & Close Drift Detection</li>
              <li>• Budget vs Actual Variance Tracking</li>
              <li>• Revenue Recognition Signals</li>
              <li>• Sales Tax & Compliance Exposure</li>
              <li>• Expense Leakage Detection</li>
              <li>• Commission Plan Modeling</li>
              <li>• Audit & Governance Signals</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">
              Intelligence Layer
            </h2>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>AI Chief of Staff</li>
              <li>Cross-Module Risk Detection</li>
              <li>Execution Guardrails</li>
              <li>Decision Discipline Scoring</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;
