import React from "react";

const mockDecisions = [
  {
    title: "Cross-functional business risk detected",
    priority: 9,
    status: "pending",
    cross: true,
  },
  {
    title: "Follow up on overdue invoice",
    priority: 8,
    status: "pending",
  },
  {
    title: "Review payroll overtime anomaly",
    priority: 7,
    status: "pending",
  },
  {
    title: "Prepare audit evidence",
    priority: 6,
    status: "pending",
  },
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
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <strong>{d.title}</strong>

              {d.cross && (
                <span
                  style={{
                    color: "#dc2626",
                    fontSize: 11,
                    fontWeight: 600,
                    marginLeft: 8,
                  }}
                >
                  CROSS-MODULE
                </span>
              )}
            </div>

            <div style={{ fontSize: 12, opacity: 0.6 }}>
              Status: {d.status}
            </div>
          </div>

          <div style={{ fontSize: 13 }}>
            Priority: {d.priority}
          </div>
        </div>
      ))}
    </div>
  );
};
