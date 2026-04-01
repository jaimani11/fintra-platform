import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";

import MarketingLayout from "./MarketingLayout";
import { App as PortalApp } from "./portal/App"; // keep if you still use it

// Marketing pages
import Home from "./Home";
import Products from "./Products";
import Pricing from "./Pricing";
import About from "./About";
import Signup from "./Signup";
import { DemoConsole } from "./demo/DemoConsole";

// App OS (Control Tower)
import AppShell from "./layout/AppShell";
import Dashboard from "./pages/Dashboard";
import Payroll from "./pages/Payroll";
import Accounting from "./pages/Accounting";
import Budgeting from "./pages/Budgeting";
import RevenueRecognition from "./pages/RevenueRecognition";
import SalesTax from "./pages/SalesTax";
import SalesCommission from "./pages/SalesCommission";
import StockComp from "./pages/StockComp";
import HumanResources from "./pages/HumanResources";
import Compliance from "./pages/Compliance";
import Security from "./pages/Security";
import Settings from "./pages/Settings";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ========================= */}
          {/* MARKETING SITE (PUBLIC)   */}
          {/* ========================= */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/demo" element={<DemoConsole />} />
          </Route>

          {/* ========================= */}
          {/* CONTROL TOWER (PROTECTED) */}
          {/* ========================= */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            {/* Default /app -> /app/dashboard */}
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />

            {/* Core Finance */}
            <Route path="payroll" element={<Payroll />} />
            <Route path="accounting" element={<Accounting />} />
            <Route path="budgeting" element={<Budgeting />} />
            <Route path="revenue-recognition" element={<RevenueRecognition />} />
            <Route path="sales-tax" element={<SalesTax />} />
            <Route path="sales-commission" element={<SalesCommission />} />
            <Route path="stock-comp" element={<StockComp />} />

            {/* People + Governance */}
            <Route path="human-resources" element={<HumanResources />} />
            <Route path="compliance" element={<Compliance />} />
            <Route path="security" element={<Security />} />

            {/* System */}
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* ========================= */}
          {/* Legacy Portal (OPTIONAL)  */}
          {/* ========================= */}
          {/* If you still need the old portal, keep this. Otherwise delete it. */}
          <Route
            path="/portal/*"
            element={
              <ProtectedRoute>
                <PortalApp />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRouter;
