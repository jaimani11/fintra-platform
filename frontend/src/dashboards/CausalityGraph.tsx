import React from "react";

export const CausalityGraph = () => {
  return (
    <div
      style={{
        background: "white",
        padding: 24,
        borderRadius: 12,
        marginTop: 32,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3>Cross-Module Causality</h3>

      <div style={{ marginTop: 16, lineHeight: 1.8 }}>
        <div>Payroll Overtime ↑</div>
        <div>↓</div>
        <div>Labor % ↑</div>
        <div>↓</div>
        <div>Margin ↓</div>
        <div>↓</div>
        <div>Cash Runway ↓</div>
        <div>↓</div>
        <strong>Hiring Freeze Recommended</strong>
      </div>
    </div>
  );
};
