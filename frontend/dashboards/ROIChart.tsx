import React from "react";

export const ROIChart = () => {
  const data = {
    estimated: 42000,
    realized: 18000,
  };

  return (
    <div style={{ background: "white", padding: 20, borderRadius: 8 }}>
      <h3>ROI Summary</h3>
      <p>Estimated Savings: ${data.estimated / 100}</p>
      <p>Realized Savings: ${data.realized / 100}</p>
    </div>
  );
};
