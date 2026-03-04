import React, { useMemo } from "react";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { DecisionInbox } from "./DecisionInbox";
import { DecisionScore } from "./DecisionScore";

import { ModuleManager } from "../admin-center/ModuleManager";
import { GovernancePanel } from "../admin-center/GovernancePanel";

import { ROIChart } from "../dashboards/ROIChart";
import { PriorityChart } from "../dashboards/PriorityChart";

// 1. Import the Decision type to ensure status literal compliance
import { Decision } from "../types"; 

/**
 * FIXED: Explicitly typed as Decision[] to resolve TS2322.
 * This ensures "pending", "approved", and "deferred" are treated as 
 * specific allowed literals rather than generic strings.
 */
const mockDecisions: Decision[] = [
  {
    id: 1,
    priority: 9,
    status: "pending",
    category: "financial",
  },
  {
    id: 2,
    priority: 8,
    status: "approved",
    responseTime: 1200,
    category: "financial",
  },
  {
    id: 3,
    priority: 7,
    status: "deferred",
    category: "compliance",
  },
];

export const App = () => {
  const decisions = mockDecisions;

  // Compute counts for the Summary Bar
  const pendingCount = useMemo(
    () => decisions.filter((d) => d.status === "pending").length,
    [decisions]
  );

  const highRiskCount = useMemo(
    () =>
      decisions.filter(
        (d) =>
          d.priority > 7 &&
          (d.category === "financial" || d.category === "compliance")
      ).length,
    [decisions]
  );

  return (
    <div className="flex h-screen font-sans bg-slate-50 text-slate-900">
      
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <div>
          <h2 className="text-xl font-semibold">Fintra</h2>
          <p className="text-xs text-slate-400 mt-1">
            Unified Platform
          </p>
        </div>

        <nav className="mt-10 space-y-3 text-sm">
          {[
            "Dashboard",
            "Decisions",
            "Modules",
            "Reports",
            "Governance",
          ].map((item) => (
            <div
              key={item}
              className="hover:text-blue-400 cursor-pointer transition"
            >
              {item}
            </div>
          ))}
        </nav>

        <div className="mt-auto text-xs text-slate-500">
          AI Chief of Staff
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        
        {/* Sticky Executive Header */}
        <div className="sticky top-0 z-20 bg-slate-50 pb-6">
          <WorkspaceSwitcher />

          <div className="mt-6 mb-6">
            <h1 className="text-2xl font-semibold">
              Today at Fintra
            </h1>
            <p className="text-slate-500 text-sm">
              Chief of Staff Brief — What needs your attention
            </p>
          </div>

          {/* Summary Bar */}
          <div className="bg-white shadow rounded-xl p-4 flex justify-between text-sm">
            <div>
              <span className="font-medium">
                Pending:
              </span>{" "}
              {pendingCount}
            </div>

            <div>
              <span className="font-medium">
                High Risk:
              </span>{" "}
              {highRiskCount}
            </div>
          </div>

          {/* Cross-Module Alert Logic */}
          {highRiskCount > 2 && (
            <div className="mt-4 bg-red-100 text-red-700 p-4 rounded-xl text-sm animate-pulse border border-red-200">
              Cross-module financial & compliance risk detected.
              Immediate executive attention recommended.
            </div>
          )}
        </div>

        {/* Executive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          
          {/* Main Column: Decision Flow & Charts */}
          <div className="lg:col-span-2 space-y-6">
            <DecisionInbox />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PriorityChart />
              <ROIChart />
            </div>
          </div>

          {/* Right Column: Scoring & Governance */}
          <div className="space-y-6">
            {/* decisions prop now matches Decision[] type exactly */}
            <DecisionScore decisions={decisions} />
            <ModuleManager />
            <GovernancePanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
