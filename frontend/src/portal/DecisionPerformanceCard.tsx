import React from "react";

export const DecisionPerformanceCard = ({ score = 82 }) => {
  return (
    <div
      style={{
        background: "white",
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
      <h3>Decision Discipline Score</h3>
      <p style={{ fontSize: 32, fontWeight: 600 }}>{score}%</p>
      <p style={{ fontSize: 13, opacity: 0.6 }}>
        Based on response speed and outcome quality
      </p>
    </div>
  );
};
