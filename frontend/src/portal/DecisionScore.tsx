import React from "react";

export type Decision = {
  id: number;
  status: "pending" | "approved" | "deferred";
  responseTime?: number;
  outcome?: "success" | "risk";
};

export const DecisionScore = ({
  decisions,
}: {
  decisions: Decision[];
}) => {
  const rawScore = decisions.reduce((acc, d) => {
    // Fast approvals = elite discipline
    if (
      d.status === "approved" &&
      d.responseTime &&
      d.responseTime < 3600
    )
      return acc + 10;

    // Standard approval
    if (d.status === "approved") return acc + 5;

    // Deferred penalty
    if (d.status === "deferred") return acc - 2;

    // Risk outcome penalty
    if (d.outcome === "risk") return acc - 5;

    return acc;
  }, 50);

  const score = Math.max(0, Math.min(100, rawScore));

  // Visual color logic
  const scoreColor =
    score >= 75
      ? "text-green-600"
      : score >= 50
      ? "text-blue-600"
      : score >= 30
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-sm text-slate-500 mb-2">
        Decision Discipline Score
      </h3>

      <div className={`text-3xl font-bold ${scoreColor}`}>
        {score}
      </div>

      <div className="text-xs text-slate-400 mt-2">
        Higher = faster, higher-quality decisions with lower risk.
      </div>
    </div>
  );
};
