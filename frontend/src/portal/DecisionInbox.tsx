import React, { useState } from "react";

export type Decision = {
  id: number;
  title: string;
  priority: number;
  status: "pending" | "approved" | "deferred";
  createdAt: number;
  approvedAt?: string | null;
  responseTime?: number;
  cross?: boolean;
  baseImpact?: number;
  outcome?: "success" | "risk";
  reason?: string;
  category?: "financial" | "compliance" | "growth";
};

const MAX_VISIBLE = 5;

const initialDecisions: Decision[] = [
  {
    id: 1,
    title: "Cross-functional business risk detected",
    priority: 9,
    status: "pending",
    cross: true,
    baseImpact: 8000,
    category: "financial",
    reason:
      "Margin compression detected across payroll and revenue modules.",
    createdAt: Date.now(),
  },
  {
    id: 2,
    title: "Follow up on overdue invoice",
    priority: 8,
    status: "pending",
    baseImpact: 5000,
    category: "financial",
    reason:
      "Invoice 45 days overdue. Cash flow exposure increasing.",
    createdAt: Date.now(),
  },
  {
    id: 3,
    title: "Review payroll overtime anomaly",
    priority: 7,
    status: "pending",
    baseImpact: 6500,
    category: "compliance",
    reason:
      "Overtime spike may breach labor cost target threshold.",
    createdAt: Date.now(),
  },
  {
    id: 4,
    title: "Prepare audit evidence",
    priority: 6,
    status: "pending",
    baseImpact: 3000,
    category: "compliance",
    reason:
      "Quarterly compliance deadline approaching.",
    createdAt: Date.now(),
  },
  {
    id: 5,
    title: "Vendor contract auto-renewal detected",
    priority: 5,
    status: "pending",
    baseImpact: 4200,
    category: "growth",
    reason:
      "Vendor cost increase projected next quarter.",
    createdAt: Date.now(),
  },
  {
    id: 6,
    title: "Low-risk compliance reminder",
    priority: 2,
    status: "pending",
    baseImpact: 1200,
    category: "compliance",
    reason:
      "Non-critical reporting deadline in 14 days.",
    createdAt: Date.now(),
  },
];

const SimulationSlider = ({
  baseImpact = 5000,
}: {
  baseImpact?: number;
}) => {
  const [days, setDays] = useState(0);
  const projectedImpact = baseImpact * (1 + days * 0.05);

  return (
    <div style={{ marginTop: 12 }}>
      <input
        type="range"
        min={0}
        max={30}
        value={days}
        onChange={(e) => setDays(Number(e.target.value))}
        style={{ width: "100%" }}
      />
      <div style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>
        Delay: {days} days → Projected impact: $
        {projectedImpact.toFixed(0)}
      </div>
    </div>
  );
};

export const DecisionInbox = () => {
  const [decisions, setDecisions] =
    useState<Decision[]>(initialDecisions);
  const [loading, setLoading] = useState(false);

  const sorted = [...decisions].sort(
    (a, b) => b.priority - a.priority
  );
  const visible = sorted.slice(0, MAX_VISIBLE);
  const suppressed = sorted.length - visible.length;

  const updateDecision = async (
    id: number,
    status: "approved" | "deferred"
  ) => {
    const now = new Date();
    const decision = decisions.find((d) => d.id === id);
    if (!decision) return;

    const responseTime = Math.floor(
      (now.getTime() - decision.createdAt) / 1000
    );

    setLoading(true);

    try {
      const res = await fetch("/api/decisions/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision_id: id,
          status,
          approved_at:
            status === "approved" ? now.toISOString() : null,
          response_time_seconds: responseTime,
        }),
      });

      if (!res.ok) throw new Error("Backend failed");

      setDecisions((prev) =>
        prev.map((d) =>
          d.id === id
            ? {
                ...d,
                status,
                approvedAt:
                  status === "approved"
                    ? now.toLocaleString()
                    : null,
                responseTime,
                outcome:
                  status === "approved"
                    ? Math.random() > 0.3
                      ? "success"
                      : "risk"
                    : undefined,
              }
            : d
        )
      );
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update decision.");
    } finally {
      setLoading(false);
    }
  };

  if (visible.length === 0) {
    return (
      <div
        style={{
          background: "white",
          padding: 40,
          borderRadius: 14,
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 20 }}>All clear.</h2>
        <p style={{ marginTop: 8, opacity: 0.6 }}>
          No urgent decisions today.
        </p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2 style={{ marginBottom: 16 }}>Top Decisions</h2>

      {visible.map((d) => (
        <div
          key={d.id}
          style={{
            background: "white",
            padding: 20,
            borderRadius: 14,
            marginBottom: 18,
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.05)",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.2s ease",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
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

              <div
                style={{
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Priority: {d.priority}
              </div>

              {d.category && (
                <div
                  style={{
                    fontSize: 11,
                    marginTop: 4,
                    opacity: 0.6,
                  }}
                >
                  Category: {d.category}
                </div>
              )}

              {d.reason && (
                <div
                  style={{
                    fontSize: 12,
                    marginTop: 6,
                    color: "#475569",
                  }}
                >
                  {d.reason}
                </div>
              )}

              {d.approvedAt && (
                <div
                  style={{
                    fontSize: 11,
                    marginTop: 4,
                  }}
                >
                  Approved at {d.approvedAt}
                </div>
              )}

              {d.responseTime !== undefined && (
                <div
                  style={{
                    fontSize: 11,
                  }}
                >
                  Responded in {d.responseTime} seconds
                </div>
              )}
            </div>

            {d.outcome && (
              <div
                style={{
                  padding: "6px 10px",
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  background:
                    d.outcome === "success"
                      ? "#dcfce7"
                      : "#fee2e2",
                  color:
                    d.outcome === "success"
                      ? "#166534"
                      : "#991b1b",
                }}
              >
                {d.outcome === "success"
                  ? "SUCCESS"
                  : "RISK"}
              </div>
            )}
          </div>

          {d.status === "pending" && (
            <>
              <SimulationSlider
                baseImpact={d.baseImpact}
              />

              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  gap: 10,
                }}
              >
                <button
                  disabled={loading}
                  onClick={() =>
                    updateDecision(
                      d.id,
                      "approved"
                    )
                  }
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "none",
                    background: loading
                      ? "#94a3b8"
                      : "#0f172a",
                    color: "white",
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  {loading
                    ? "Updating..."
                    : "Approve"}
                </button>

                <button
                  disabled={loading}
                  onClick={() =>
                    updateDecision(
                      d.id,
                      "deferred"
                    )
                  }
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border:
                      "1px solid #cbd5e1",
                    background: "white",
                    cursor: loading
                      ? "not-allowed"
                      : "pointer",
                  }}
                >
                  Defer
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      {suppressed > 0 && (
        <div
          style={{
            fontSize: 12,
            opacity: 0.6,
          }}
        >
          {suppressed} low-impact decisions suppressed.
        </div>
      )}
    </div>
  );
};
