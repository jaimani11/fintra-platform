iport React from "react";
import { GovernancePanel } from "../admin-center/GovernancePanel";
import { ModuleManager } from "../admin-center/ModuleManager";
import { ROIChart } from "../dashboards/ROIChart";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";
import { DecisionInbox } from "./DecisionInbox";
import { PriorityChart } from "../dashboards/PriorityChart";

export const App = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          background: "#0f172a",
          color: "white",
          padding: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: 4 }}>Fintra</h2>
        <p style={{ opacity: 0.7, fontSize: 14 }}>Unified Platform</p>

        <nav style={{ marginTop: 40 }}>
          {["Dashboard", "Decisions", "Modules", "Reports"].map((item) => (
            <div
              key={item}
              style={{
                padding: "10px 0",
                cursor: "pointer",
                opacity: 0.85,
              }}
            >
              {item}
            </div>
          ))}
        </nav>

        <div style={{ marginTop: "auto", opacity: 0.6, fontSize: 12 }}>
          AI Chief of Staff
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          padding: 32,
          background: "#f8fafc",
          overflowY: "auto",
        }}
      >
        <h1 style={{ marginBottom: 6 }}>Chief of Staff Brief</h1>
        <p style={{ color: "#475569", marginBottom: 24 }}>
          What needs your attention today
        </p>
         <WorkspaceSwitcher />

        {/* Decision Inbox */}
        <DecisionInbox />

        {/* Charts */}
         <div style={{ marginTop: 32 }}>
             <ModuleManager />
         </div>
         <div style={{ marginTop: 32 }}>
              <ROIChart />
         </div>
         <div style={{ marginTop: 32 }}>
               <GovernancePanel />
         </div>
        <div style={{ marginTop: 32 }}>
          <PriorityChart />
        </div>
      </main>
    </div>
  );
};
