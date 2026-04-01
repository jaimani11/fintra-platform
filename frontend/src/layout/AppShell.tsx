import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import AgentDrawer from "../ai/AgentDrawer";
import GlobalSearch from "../components/GlobalSearch";
import ExecutiveOverview from "../pages/ExecutiveOverview"; 
import RiskAlertOverlay from "./RiskAlertOverlay"; 
import { useFinancialStore } from "../store/useFinancialStore";

/**
 * APP SHELL
 * The primary layout wrapper. Manages global states like:
 * - Risk Notifications (Overlay)
 * - AI Agent Drawer
 * - Navigation & Dashboard Synthesis
 */
export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const { theme } = useFinancialStore();

  // Determine if we are on the main dashboard route to show the Executive View
  const isDashboard = location.pathname === "/app/dashboard";

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-300 ${
      theme === 'dark' 
        ? 'dark bg-[#0f1117] text-white' 
        : 'light bg-zinc-50 text-zinc-900'
    }`}>
      {/* 1. Global Utilities & Notifications */}
      <RiskAlertOverlay /> 
      <GlobalSearch />
      
      {/* 2. Persistent Sidebar (includes Live Venture Stream) */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* 3. Top Navigation */}
        <TopNav onOpenAI={() => setDrawerOpen(true)} />

        {/* 4. Main Content Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-7xl mx-auto">
            {/* SYNTHESIS INTERCEPTION: 
                If the path is /app/dashboard, we mount the ExecutiveOverview directly.
                For all other routes (/app/accounting, etc.), we use the Router Outlet.
            */}
            {isDashboard ? <ExecutiveOverview /> : <Outlet />}
          </div>
        </main>
      </div>

      {/* 5. AI Interaction Layer */}
      <AgentDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
