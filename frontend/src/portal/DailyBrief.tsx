import React from "react";

export type Decision = {
  id: number;
  status: "pending" | "approved" | "deferred";
  outcome?: "success" | "risk";
  baseImpact?: number;
  createdAt: number;
  approvedAt?: string | null;
};

export const DailyBrief = ({
  decisions,
}: {
  decisions: Decision[];
}) => {
  const pending = decisions.filter(
    (d) => d.status === "pending"
  ).length;

  const approvedToday = decisions.filter(
    (d) =>
      d.status === "approved" &&
      d.approvedAt &&
      new Date(d.approvedAt).toDateString() ===
        new Date().toDateString()
  ).length;

  const riskCount = decisions.filter(
    (d) => d.outcome === "risk"
  ).length;

  const financialDelta = decisions
    .filter((d) => d.status === "approved" && d.baseImpact)
    .reduce((acc, d) => acc + (d.baseImpact || 0), 0);

  const calmMode = pending === 0 && riskCount === 0;

  return (
    <div
      className={`p-6 rounded-xl shadow mb-6 transition-all duration-300 ${
        calmMode
          ? "bg-blue-50 border border-blue-200"
          : "bg-white"
      }`}
    >
      <h2 className="text-lg font-semibold mb-3">
        Executive Brief
      </h2>

      {calmMode ? (
        <p className="text-sm text-blue-700">
          You are operating within risk tolerance.
          No urgent decisions require attention.
        </p>
      ) : (
        <div className="space-y-1 text-sm text-slate-600">
          <p>
            {pending > 0
              ? `${pending} decisions require attention.`
              : "No pending decisions."}
          </p>

          {approvedToday > 0 && (
            <p>{approvedToday} resolved today.</p>
          )}

          {riskCount > 0 && (
            <p className="text-red-600">
              {riskCount} risk outcome(s) detected.
            </p>
          )}

          {financialDelta > 0 && (
            <p className="text-green-600">
              Approved financial impact: $
              {financialDelta.toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
