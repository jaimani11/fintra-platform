import React from "react";

export const PriorityChart = () => {
  const data = [
    { label: "High", value: 4 },
    { label: "Medium", value: 3 },
    { label: "Low", value: 2 },
  ];

  return (
    <div style={{ background: "white", padding: 20, borderRadius: 8 }}>
      <h3>Decision Priority Breakdown</h3>
      {data.map((d) => (
        <div key={d.label} style={{ marginTop: 8 }}>
          {d.label}: {d.value}
        </div>
      ))}
    </div>
  );
};
