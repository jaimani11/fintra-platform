import React from "react";

const mockDecisions = [
  { title: "Follow up on overdue invoice", priority: 8, status: "pending" },
  { title: "Review payroll overtime anomaly", priority: 7, status: "pending" },
  { title: "Prepare audit evidence", priority: 6, status: "pending" },
];

export const DecisionInbox = () => {
  return (
    <div style={{ marginTop: 20 }}>
      {mockDecisions.map((d, i) => (
        <div
          key={i}
          style={{
            background: "white",
            padding: 16,
            borderRadius: 8,
            marginBottom: 12,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <strong>{d.title}</strong>
            <div style={{ fontSize: 12, opacity: 0.6 }}>Status: {d.status}</div>
          </div>
          <div>Priority: {d.priority}</div>
        </div>
      ))}
    </div>
  );
};
