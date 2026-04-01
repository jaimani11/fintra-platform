import React, { useMemo, useState } from "react";

export type Decision = {
  id: number;
  title: string;
  status: "pending" | "approved" | "deferred";
  createdAt: number;
  approvedAt?: string | null;
  responseTime?: number;
  outcome?: "success" | "risk";
  category?: "financial" | "compliance" | "growth";
};

export const DecisionHistory = ({
  decisions,
}: {
  decisions: Decision[];
}) => {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "approved" | "deferred"
  >("all");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "financial" | "compliance" | "growth"
  >("all");

  const completed = decisions.filter(
    (d) => d.status !== "pending"
  );

  const filtered = useMemo(() => {
    return completed
      .filter((d) =>
        d.title.toLowerCase().includes(query.toLowerCase())
      )
      .filter((d) =>
        statusFilter === "all"
          ? true
          : d.status === statusFilter
      )
      .filter((d) =>
        categoryFilter === "all"
          ? true
          : d.category === categoryFilter
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [completed, query, statusFilter, categoryFilter]);

  return (
    <div className="bg-white p-6 rounded-xl shadow mt-6">
      <h3 className="font-semibold mb-4">
        Decision History
      </h3>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          className="border p-2 rounded text-sm flex-1"
          placeholder="Search decisions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          className="border p-2 rounded text-sm"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as any)
          }
        >
          <option value="all">All Status</option>
          <option value="approved">Approved</option>
          <option value="deferred">Deferred</option>
        </select>

        <select
          className="border p-2 rounded text-sm"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as any)
          }
        >
          <option value="all">All Categories</option>
          <option value="financial">Financial</option>
          <option value="compliance">Compliance</option>
          <option value="growth">Growth</option>
        </select>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <p className="text-sm text-slate-500">
          No matching decisions found.
        </p>
      )}

      {/* Decision List */}
      <div className="space-y-3">
        {filtered.map((d) => (
          <div
            key={d.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <div className="font-medium text-sm">
                {d.title}
              </div>

              <div className="text-xs text-slate-500 mt-1">
                {d.status} •{" "}
                {new Date(d.createdAt).toLocaleDateString()}
              </div>
            </div>

            {d.outcome && (
              <div
                className={`text-xs px-3 py-1 rounded-full font-semibold ${
                  d.outcome === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {d.outcome === "success"
                  ? "SUCCESS"
                  : "RISK"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
