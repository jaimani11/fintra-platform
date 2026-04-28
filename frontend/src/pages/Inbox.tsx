import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://fintra-platform.onrender.com";

type SubDecision = {
  id: number;
  content: string;
  impact_score: number;
  urgency_score: number;
  confidence_score: number;
  roi: { estimated_savings_cents: number };
  explanation: string;
};

type Decision = {
  decision_id: number;
  content: string;
  modules: string[];
  impact_score: number;
  urgency_score: number;
  confidence_score: number;
  priority_score: number;
  roi: {
    estimated_savings_cents: number;
    realized_savings_cents: number | null;
  };
  cost_of_inaction_cents: number;
  explanation: string;
  status: "pending" | "approved" | "rejected";
  updated_at: string;
  signal_trace: {
    module: string;
    issue: string;
    severity: number;
  };
  decisions?: SubDecision[];
  approved_sub_decision_id?: number | null;
  denied_sub_decision_ids?: number[];
};

const MODULE_COLORS: Record<string, { bg: string; text: string }> = {
  payroll:      { bg: "#EEEDFE", text: "#3C3489" },
  accounting:   { bg: "#E6F1FB", text: "#0C447C" },
  sales_tax:    { bg: "#EAF3DE", text: "#27500A" },
  cross_module: { bg: "#FAEEDA", text: "#633806" },
};

function formatCents(cents: number) {
  return `$${(cents / 100).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

function ModuleTag({ module }: { module: string }) {
  const c = MODULE_COLORS[module] ?? { bg: "#27272a", text: "#a1a1aa" };
  return (
    <span
      className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded inline-block mb-1.5"
      style={{ background: c.bg, color: c.text }}
    >
      {module.replace("_", " ")}
    </span>
  );
}

function rankDecisions(decisions: SubDecision[]): SubDecision[] {
  return [...decisions].sort((a, b) => {
    const roiDiff = b.roi.estimated_savings_cents - a.roi.estimated_savings_cents;
    if (roiDiff !== 0) return roiDiff;
    const aSum = a.impact_score + a.urgency_score + a.confidence_score;
    const bSum = b.impact_score + b.urgency_score + b.confidence_score;
    return bSum - aSum;
  });
}

const RANK_LABELS: Record<number, string> = {
  0: "1st",
  1: "2nd",
  2: "3rd",
  3: "4th",
  4: "5th",
};

export default function Inbox() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [expandedIssues, setExpandedIssues] = useState<Record<number, boolean>>({});
  const [expandedReasoning, setExpandedReasoning] = useState<Record<string, boolean>>({});
  const [dismissedDecisions, setDismissedDecisions] = useState<Record<string, boolean>>({});
  const [approvedDecisions, setApprovedDecisions] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInbox();
  }, []);

  async function loadInbox() {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/decisions/generate`,
        {
          prompt: "inbox load",
          modules: ["payroll", "accounting", "sales_tax"],
          revenue: 10000,
          payroll_ratio: 0.7,
          other_burn: 2000,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const data: Decision[] = Array.isArray(response.data) ? response.data : [response.data];
      setDecisions(data);

      // Restore approved/denied state from backend
      const approved: Record<number, number> = {};
      const denied: Record<string, boolean> = {};
      for (const d of data) {
        if (d.approved_sub_decision_id != null) {
          approved[d.decision_id] = d.approved_sub_decision_id;
        }
        for (const subId of d.denied_sub_decision_ids ?? []) {
          denied[`${d.decision_id}-${subId}`] = true;
        }
      }
      setApprovedDecisions(approved);
      setDismissedDecisions(denied);

    } catch (err: any) {
      if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data.detail || "Unknown error"}`);
      } else if (err.request) {
        setError("Network error: Failed to connect to the backend.");
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  function toggleIssue(id: number) {
    setExpandedIssues((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleReasoning(issueId: number, decId: number) {
    const key = `${issueId}-${decId}`;
    setExpandedReasoning((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleApprove(issueId: number, subId: number) {
    try {
      await axios.patch(
        `${BASE_URL}/api/decisions/${issueId}/approve`,
        { sub_decision_id: subId },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch {
      
    }
    setApprovedDecisions((prev) => ({ ...prev, [issueId]: subId }));
  }

  async function handleDeny(issueId: number, subId: number) {
    try {
      await axios.patch(
        `${BASE_URL}/api/decisions/${issueId}/sub/${subId}/deny`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
    } catch {
      
    }
    const key = `${issueId}-${subId}`;
    setDismissedDecisions((prev) => ({ ...prev, [key]: true }));
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold text-white">Inbox</h1>
          <p className="text-zinc-500 text-sm mt-1">
            AI-generated operational risks and actions
          </p>
        </div>
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}
      {loading && <div className="text-zinc-500 text-sm">Detecting issues...</div>}

      {/* LIST */}
      <div className="space-y-4">
        {decisions.map((d) => {
          const mod = d.signal_trace?.module ?? d.modules[0];
          const isOpen = expandedIssues[d.decision_id];
          const approvedSubId = approvedDecisions[d.decision_id];
          const ranked = d.decisions ? rankDecisions(d.decisions) : [];

          const visibleDecisions = approvedSubId != null
            ? ranked.filter((sub) => sub.id === approvedSubId)
            : ranked.filter((sub) => !dismissedDecisions[`${d.decision_id}-${sub.id}`]);

          return (
            <div
              key={d.decision_id}
              className="bg-[#161a22] border border-zinc-800 rounded-2xl p-5 hover:border-zinc-700 transition"
            >
              {/* TOP ROW */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <ModuleTag module={mod} />
                  <div className="text-white font-medium">
                    {d.signal_trace?.issue ?? d.content}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                    {d.modules.join(" • ")}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm text-zinc-300">Priority {d.priority_score}</div>
                </div>
              </div>

              {/* COST OF INACTION */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800">
                <div>
                  <div className="text-xs text-zinc-500 mb-1">Cost of inaction</div>
                  <div className="text-rose-400 text-base font-medium">
                    {formatCents(d.cost_of_inaction_cents)}
                  </div>
                </div>
                <span className="text-xs text-zinc-500 border border-zinc-700 rounded px-2 py-0.5">
                  {approvedSubId != null ? "approved" : d.status}
                </span>
              </div>

              {/* TOGGLE BUTTON */}
              <button
                onClick={() => toggleIssue(d.decision_id)}
                className="mt-3 text-xs text-white"
              >
                {isOpen ? "▲ Hide decisions" : "▼ Generate decisions"}
              </button>

              {/* SUB-DECISIONS */}
              {isOpen && (
                <div className="mt-4 space-y-3">
                  {visibleDecisions.length === 0 && (
                    <div className="text-xs text-zinc-500">All options dismissed.</div>
                  )}
                  {visibleDecisions.map((sub, rankIndex) => {
                    const key = `${d.decision_id}-${sub.id}`;
                    const showReasoning = expandedReasoning[key];
                    const isApproved = approvedSubId === sub.id;
                    const rank = approvedSubId == null ? rankIndex : null;
                    const isTopPick = rank === 0;

                    return (
                      <div
                        key={sub.id}
                        className={`border rounded-xl p-4 transition ${
                          isApproved
                            ? "bg-emerald-950/30 border-emerald-800/50"
                            : "bg-black/30 border-zinc-800"
                        }`}
                      >
                        {/* RANK + RECOMMENDED */}
                        <div className="flex items-center gap-2 mb-2">
                          {rank !== null && (
                            <span className="text-xs text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5">
                              {RANK_LABELS[rank] ?? `${rank + 1}th`}
                            </span>
                          )}
                          {isTopPick && (
                            <span className="text-xs font-medium text-emerald-400 border border-emerald-800 rounded px-1.5 py-0.5">
                              Recommended
                            </span>
                          )}
                          {isApproved && (
                            <span className="text-xs font-medium text-emerald-400 border border-emerald-800 rounded px-1.5 py-0.5">
                              Approved
                            </span>
                          )}
                        </div>

                        <div className="text-white text-sm font-medium">{sub.content}</div>

                        <div className="mt-3">
                          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                            Estimated ROI
                          </div>
                          <div className="text-emerald-400 text-base font-medium">
                            {formatCents(sub.roi.estimated_savings_cents)}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {[
                            ["Impact", sub.impact_score],
                            ["Urgency", sub.urgency_score],
                            ["Confidence", sub.confidence_score],
                          ].map(([label, val]) => (
                            <div
                              key={label}
                              className="bg-zinc-900 border border-zinc-800 rounded-lg p-2"
                            >
                              <div className="text-xs text-zinc-500">{label}</div>
                              <div className="text-white font-medium mt-0.5">{val}/10</div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => toggleReasoning(d.decision_id, sub.id)}
                          className="mt-3 text-xs text-white"
                        >
                          {showReasoning ? "▲ Hide reasoning" : "▼ View reasoning"}
                        </button>

                        {showReasoning && (
                          <div className="mt-3 bg-black/40 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-400 leading-relaxed">
                            {sub.explanation}
                          </div>
                        )}

                        {/* APPROVE / DENY */}
                        {!isApproved && approvedSubId == null && (
                          <div className="flex gap-2 mt-4 pt-3 border-t border-zinc-800">
                            <button
                              onClick={() => handleApprove(d.decision_id, sub.id)}
                              className="flex-1 text-xs font-medium text-emerald-400 border border-emerald-800 rounded-lg py-1.5 hover:bg-emerald-950/50 transition"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleDeny(d.decision_id, sub.id)}
                              className="flex-1 text-xs font-medium text-red-400 border border-red-900 rounded-lg py-1.5 hover:bg-red-950/50 transition"
                            >
                              Deny
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
