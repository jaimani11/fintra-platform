import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { motion } from "framer-motion";

const MarketingLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen flex flex-col">

      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight hover:opacity-80 transition"
          >
            Fintra
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm">

            {/* ================= PRODUCTS MEGA MENU ================= */}
            <div className="relative group hidden md:block">
              <button className="hover:text-slate-900 transition font-medium">
                Products
              </button>

              <div className="absolute left-0 mt-6 w-[640px] bg-white shadow-2xl rounded-2xl p-8 opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none group-hover:pointer-events-auto border border-slate-200">

                <div className="grid grid-cols-2 gap-10">

                  {/* LEFT COLUMN */}
                  <div>
                    <div className="text-xs uppercase text-slate-400 mb-4 tracking-wider">
                      Core Systems
                    </div>

                    <div className="flex flex-col gap-4 text-sm">

                      <Link to="/app/payroll" className="hover:text-blue-600 transition">
                        Payroll
                      </Link>

                      <Link to="/app/accounting" className="hover:text-blue-600 transition">
                        Accounting
                      </Link>

                      <Link to="/app/budgeting" className="hover:text-blue-600 transition">
                        Budgeting
                      </Link>

                      <Link to="/app/revenue-recognition" className="hover:text-blue-600 transition">
                        Revenue Recognition
                      </Link>

                      <Link to="/app/sales-tax" className="hover:text-blue-600 transition">
                        Sales Tax
                      </Link>

                      <Link to="/app/sales-commission" className="hover:text-blue-600 transition">
                        Sales Commission
                      </Link>

                      <Link to="/app/stock-comp" className="hover:text-blue-600 transition">
                        Stock Compensation
                      </Link>

                      <Link to="/app/compliance" className="hover:text-blue-600 transition">
                        Compliance
                      </Link>

                      <Link to="/app/security" className="hover:text-blue-600 transition">
                        Security
                      </Link>

                      <Link to="/app/human-resources" className="hover:text-blue-600 transition">
                        Human Resources
                      </Link>

                    </div>
                  </div>

                  {/* RIGHT COLUMN */}
                  <div>
                    <div className="text-xs uppercase text-slate-400 mb-4 tracking-wider">
                      Intelligence Layer
                    </div>

                    <div className="flex flex-col gap-4 text-sm">

                      <Link to="/app/dashboard" className="hover:text-blue-600 transition font-medium">
                        AI Chief of Staff
                      </Link>

                      <Link to="/app/dashboard" className="hover:text-blue-600 transition">
                        Cross-Module Risk Detection
                      </Link>

                      <Link to="/app/dashboard" className="hover:text-blue-600 transition">
                        Execution Guardrails
                      </Link>

                      <Link to="/app/dashboard" className="hover:text-blue-600 transition">
                        Decision Discipline Scoring
                      </Link>

                    </div>
                  </div>

                </div>
              </div>
            </div>

            <Link to="/pricing" className="hover:text-blue-600 transition">
              Pricing
            </Link>

            <Link to="/about" className="hover:text-blue-600 transition">
              About
            </Link>

            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:opacity-80 transition"
            >
              Start Free Trial
            </Link>

            <Link
              to="/app"
              className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition shadow-sm"
            >
              Login
            </Link>

          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden px-6 pb-6 flex flex-col gap-4 text-sm border-t border-slate-200 bg-white"
          >
            <Link to="/pricing" onClick={() => setOpen(false)}>
              Pricing
            </Link>

            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>

            <Link to="/signup" onClick={() => setOpen(false)}>
              Start Free Trial
            </Link>

            <Link
              to="/app"
              onClick={() => setOpen(false)}
              className="bg-slate-900 text-white px-4 py-2 rounded-lg w-fit"
            >
              Login
            </Link>
          </motion.div>
        )}
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 mt-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10 text-sm text-slate-600">

          <div>
            <div className="font-semibold text-slate-900 mb-3">
              Fintra
            </div>
            <p className="text-xs leading-relaxed">
              AI-native Decision Operating System for modern businesses.
            </p>
          </div>

          <div>
            <div className="font-semibold text-slate-900 mb-3">
              Product
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/pricing" className="hover:text-slate-900">
                Pricing
              </Link>
              <Link to="/app/security" className="hover:text-slate-900">
                Security
              </Link>
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-900 mb-3">
              Company
            </div>
            <div className="flex flex-col gap-2">
              <Link to="/about" className="hover:text-slate-900">
                About
              </Link>
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-900 mb-3">
              Contact
            </div>
            <p className="text-xs">
              hello@fintra.ai
            </p>
          </div>

        </div>

        <div className="text-center text-xs text-slate-400 pb-8">
          © {new Date().getFullYear()} Fintra. All rights reserved.
        </div>
      </footer>

    </div>
  );
};

export default MarketingLayout;
