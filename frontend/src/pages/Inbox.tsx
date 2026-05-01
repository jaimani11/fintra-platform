import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://fintra-platform.onrender.com";

type SubDecision = {
  id: number;
  content: string;
  impact_score: number;
  urgency_score: number;
  confidence_score: number;
  explanation: string | null;
  roi: { estimated_savings_cents: number };
};

type Decision = {
  decision_id: number;
  content: string;
  modules: string[];
  impact_score: number;
  urgency_score: number;
  confidence_score: number;
  priority_score: number;
  roi: { estimated_savings_cents: number; realized_savings_cents: number | null };
  cost_of_inaction_cents: number;
  status: "pending" | "approved" | "rejected";
  updated_at: string;
  signal_trace: { module: string; issue: string; severity: number };
  decisions: SubDecision[];
  approved_sub_decision_id: number | null;
  denied_sub_decision_ids: number[];
};

const MODULE_COLORS: Record<string, { bg: string; text: string }> = {
  payroll:        { bg: "#EEEDFE", text: "#3C3489" },
  accounting:     { bg: "#E6F1FB", text: "#0C447C" },
  sales_tax:      { bg: "#EAF3DE", text: "#27500A" },
  cross_module:   { bg: "#FAEEDA", text: "#633806" },
  budgeting:      { bg: "#FDE8F0", text: "#7C0A3C" },
  commissions:    { bg: "#E8F4FD", text: "#0A4A6E" },
  expenses:       { bg: "#FDF3E8", text: "#6E3A0A" },
  internal_audit: { bg: "#F0E8FD", text: "#3A0A7C" },
  receivables:    { bg: "#E8FDF3", text: "#0A6E3A" },
  revrec:         { bg: "#FDE8E8", text: "#7C0A0A" },
  sentriai:       { bg: "#E8EAFD", text: "#0A1A7C" },
  sitesnap:       { bg: "#F3FDE8", text: "#3A6E0A" },
  stock_comp:     { bg: "#FDF8E8", text: "#6E5A0A" },
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
      {module.replace(/_/g, " ")}
    </span>
  );
}

const RANK_LABELS: Record<number, string> = { 0: "1st", 1: "2nd", 2: "3rd", 3: "4th", 4: "5th" };

export default function Inbox() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loadingDecisions, setLoadingDecisions] = useState<Record<number, boolean>>({});
  const [loadingExplanation, setLoadingExplanation] = useState<Record<string, boolean>>({});
  const [expandedIssues, setExpandedIssues] = useState<Record<number, boolean>>({});
  const [expandedReasoning, setExpandedReasoning] = useState<Record<string, boolean>>({});
  const [approvedDecisions, setApprovedDecisions] = useState<Record<number, number>>({});
  const [dismissedDecisions, setDismissedDecisions] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { loadInbox(); }, []);

  async function loadInbox() {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/decisions/generate`,
        { prompt: "inbox load", modules: [], revenue: 10000, payroll_ratio: 0.7, other_burn: 2000 },
        { headers: { "Content-Type": "application/json" } }
      );
      const data: Decision[] = Array.isArray(response.data) ? response.data : [response.data];
      setDecisions(data);
    } catch (err: any) {
      setError(err.response ? `Server error: ${err.response.status}` : "Network error: Failed to connect.");
    } finally {
      setLoading(false);
    }
  }

  // Sort: active issues first (by priority), approved/fully-dismissed sink to bottom
  function getSortedDecisions() {
    const approved = (id: number) => approvedDecisions[id] != null;
    return [...decisions].sort((a, b) => {
      const aSettled = approved(a.decision_id);
      const bSettled = approved(b.decision_id);
      if (aSettled !== bSettled) return aSettled ? 1 : -1;
      return b.priority_score - a.priority_score;
    });
  }

  const sorted = getSortedDecisions();
  const visible = showAll ? sorted : sorted.slice(0, INITIAL_VISIBLE);
  const hasMore = sorted.length > INITIAL_VISIBLE;

  async function handleToggleIssue(issueId: number, alreadyHasDecisions: boolean) {
    if (expandedIssues[issueId]) {
      setExpandedIssues((prev) => ({ ...prev, [issueId]: false }));
      return;
    }
    setExpandedIssues((prev) => ({ ...prev, [issueId]: true }));
    if (alreadyHasDecisions) return;

    setLoadingDecisions((prev) => ({ ...prev, [issueId]: true }));
    try {
      const response = await axios.post(`${BASE_URL}/api/decisions/${issueId}/decisions`);
      setDecisions((prev) =>
        prev.map((d) => d.decision_id === issueId ? { ...d, decisions: response.data } : d)
      );
    } catch {}
    finally {
      setLoadingDecisions((prev) => ({ ...prev, [issueId]: false }));
    }
  }

  async function handleToggleReasoning(issueId: number, sub: SubDecision) {
    const key = `${issueId}-${sub.id}`;
    if (expandedReasoning[key]) {
      setExpandedReasoning((prev) => ({ ...prev, [key]: false }));
      return;
    }
    if (sub.explanation) {
      setExpandedReasoning((prev) => ({ ...prev, [key]: true }));
      return;
    }
    setLoadingExplanation((prev) => ({ ...prev, [key]: true }));
    setExpandedReasoning((prev) => ({ ...prev, [key]: true }));
    try {
      const response = await axios.post(`${BASE_URL}/api/decisions/${issueId}/decisions/${sub.id}/explain`);
      setDecisions((prev) =>
        prev.map((d) =>
          d.decision_id === issueId
            ? { ...d, decisions: d.decisions.map((s) => s.id === sub.id ? { ...s, explanation: response.data.explanation } : s) }
            : d
        )
      );
    } catch {}
    finally {
      setLoadingExplanation((prev) => ({ ...prev, [key]: false }));
    }
  }

  async function handleApprove(issueId: number, subId: number) {
    try {
      await axios.patch(`${BASE_URL}/api/decisions/${issueId}/approve`, { sub_decision_id: subId });
    } catch {}
    setApprovedDecisions((prev) => ({ ...prev, [issueId]: subId }));
  }

  async function handleDeny(issueId: number, subId: number) {
    try {
      await axios.patch(`${BASE_URL}/api/decisions/${issueId}/sub/${subId}/deny`);
    } catch {}
    setDismissedDecisions((prev) => ({ ...prev, [`${issueId}-${subId}`]: true }));
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold text-white">Inbox</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Operational risks detected from live signals
          </p>
        </div>
        {!loading && decisions.length > 0 && (
          <div className="text-xs text-zinc-500">
            {decisions.length} issue{decisions.length !== 1 ? "s" : ""} detected
          </div>
        )}
      </div>

      {error && <div className="text-red-400 text-sm">{error}</div>}
      {loading && <div className="text-zinc-500 text-sm">Detecting issues...</div>}

      <div className="space-y-4">
        {visible.map((d) => {
          const mod = d.signal_trace?.module ?? d.modules[0];
          const isOpen = !!expandedIssues[d.decision_id];
          const isLoadingDecisions = !!loadingDecisions[d.decision_id];
          const approvedSubId = approvedDecisions[d.decision_id];
          const isSettled = approvedSubId != null;

          const visibleSubs = approvedSubId != null
            ? d.decisions.filter((sub) => sub.id === approvedSubId)
            : d.decisions.filter((sub) => !dismissedDecisions[`${d.decision_id}-${sub.id}`]);

          return (
            <div
              key={d.decision_id}
              className={`border rounded-2xl p-5 transition ${
                isSettled
                  ? "bg-[#0f1610] border-zinc-800 opacity-60"
                  : "bg-[#161a22] border-zinc-800 hover:border-zinc-700"
              }`}
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
                  {isSettled ? "approved" : d.status}
                </span>
              </div>

              {/* TOGGLE */}
              <button
                onClick={() => handleToggleIssue(d.decision_id, d.decisions.length > 0)}
                className="mt-3 text-xs text-white"
              >
                {isOpen ? "▲ Hide decisions" : "▼ Generate decisions"}
              </button>

              {/* SUB-DECISIONS */}
              {isOpen && (
                <div className="mt-4 space-y-3">
                  {isLoadingDecisions && (
                    <div className="text-xs text-zinc-500">Generating options...</div>
                  )}
                  {!isLoadingDecisions && visibleSubs.length === 0 && d.decisions.length > 0 && (
                    <div className="text-xs text-zinc-500">All options dismissed.</div>
                  )}
                  {visibleSubs.map((sub, rankIndex) => {
                    const key = `${d.decision_id}-${sub.id}`;
                    const showReasoning = !!expandedReasoning[key];
                    const isLoadingExp = !!loadingExplanation[key];
                    const isApproved = approvedSubId === sub.id;
                    const rank = approvedSubId == null ? rankIndex : null;

                    return (
                      <div
                        key={sub.id}
                        className={`border rounded-xl p-4 transition ${
                          isApproved
                            ? "bg-emerald-950/30 border-emerald-800/50"
                            : "bg-black/30 border-zinc-800"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {rank !== null && (
                            <span className="text-xs text-zinc-500 border border-zinc-700 rounded px-1.5 py-0.5">
                              {RANK_LABELS[rank] ?? `${rank + 1}th`}
                            </span>
                          )}
                          {rank === 0 && (
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
                          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Estimated ROI</div>
                          <div className="text-emerald-400 text-base font-medium">
                            {formatCents(sub.roi.estimated_savings_cents)}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-3">
                          {([["Impact", sub.impact_score], ["Urgency", sub.urgency_score], ["Confidence", sub.confidence_score]] as const).map(([label, val]) => (
                            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-lg p-2">
                              <div className="text-xs text-zinc-500">{label}</div>
                              <div className="text-white font-medium mt-0.5">{val}/10</div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handleToggleReasoning(d.decision_id, sub)}
                          className="mt-3 text-xs text-white"
                        >
                          {showReasoning ? "▲ Hide reasoning" : "▼ View reasoning"}
                        </button>

                        {showReasoning && (
                          <div className="mt-3 bg-black/40 border border-zinc-800 rounded-lg p-3 text-sm text-zinc-400 leading-relaxed">
                            {isLoadingExp ? "Generating reasoning..." : sub.explanation ?? "Reasoning unavailable."}
                          </div>
                        )}

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

      {/* SEE MORE / LESS */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="text-xs text-zinc-400 hover:text-white border border-zinc-700 rounded-lg px-4 py-2 transition"
          >
            {showAll
              ? "▲ Show less"
              : `▼ See ${sorted.length - INITIAL_VISIBLE} more issue${sorted.length - INITIAL_VISIBLE !== 1 ? "s" : ""}`}
          </button>
        </div>
      )}

    </div>
  );
}
