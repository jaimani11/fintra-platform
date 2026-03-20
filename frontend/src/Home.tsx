import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-slate-900 min-h-screen">
      {/* SIMPLE NAV BAR */}
      <nav className="flex justify-between items-center px-10 py-6 border-b border-slate-100">
        <div className="font-bold text-xl tracking-tight">Fintra</div>
        <div className="flex items-center gap-8">
          <Link to="/products" className="text-sm font-medium text-slate-600 hover:text-slate-900">Products</Link>
          <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-slate-900">Pricing</Link>
          <button 
            onClick={() => navigate("/app/dashboard")}
            className="bg-[#161a22] text-white px-6 py-2 rounded-lg border border-zinc-700 hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            Login
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="py-32 text-center max-w-5xl mx-auto px-6">
        <h1 className="text-6xl font-semibold leading-tight">
          The AI Operating System for Modern Finance
        </h1>

        <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
          Fintra unifies payroll, accounting, budgeting and governance
          into a single executive intelligence layer.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <button
            onClick={() => navigate("/app/dashboard")}
            className="bg-slate-900 text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition-all font-medium"
          >
            Enter Control Tower
          </button>

          <Link
            to="/pricing"
            className="border border-slate-300 px-8 py-4 rounded-xl hover:bg-slate-100 transition-all font-medium"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* AI AGENTS SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-16">
            Multi-Agent Executive Intelligence
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <AgentPreviewCard 
              title="CEO Agent" 
              desc="Strategic capital planning, growth pacing, and executive synthesis." 
              link="/app/dashboard" 
            />
            <AgentPreviewCard 
              title="CFO Agent" 
              desc="Runway modeling, burn diagnostics, and capital timing intelligence." 
              link="/app/accounting" 
            />
            <AgentPreviewCard 
              title="Risk Agent" 
              desc="Cross-module governance detection, compliance exposure, and structural stress." 
              link="/app/compliance" 
            />
          </div>
        </div>
      </section>

      {/* MODULE PREVIEW */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-16">
            Fully Integrated Financial Modules
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            {["Payroll", "Accounting", "Budgeting", "Revenue Recognition", "Sales Tax", "Stock Comp"].map((module) => (
              <Link 
                key={module}
                to={`/app/${module.toLowerCase().replace(" ", "-")}`} 
                className="text-slate-500 hover:text-indigo-600 hover:underline font-medium transition-colors"
              >
                {module}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Small helper component for the Agent Cards
function AgentPreviewCard({ title, desc, link }: { title: string, desc: string, link: string }) {
  const navigate = useNavigate();
  return (
    <div 
      onClick={() => navigate(link)}
      className="p-8 bg-white shadow-sm border border-slate-100 rounded-2xl hover:shadow-xl hover:border-indigo-100 transition-all cursor-pointer group"
    >
      <div className="font-semibold text-lg group-hover:text-indigo-600 transition-colors">{title}</div>
      <p className="mt-4 text-sm text-slate-600 leading-relaxed">{desc}</p>
      <div className="mt-6 text-xs font-bold text-indigo-500 uppercase tracking-widest">Activate Agent →</div>
    </div>
  );
}
