// Core interface for Fintra & FairTix modules
export interface SIP {
  module: string;
  risk_score: number;
  financial_exposure: number;
  recommended_actions: string[];
  impact_chain: string[]; // Add this line to fix TS2353
  analysis: string;       // Fixes TS2353
}

// Interface for the Executive Decision Engine
export interface Decision {
  id: number;
  priority: number;
  status: "pending" | "approved" | "deferred"; // Strict types to fix TS2322
  category: string;
  responseTime?: number;
}

// The output from your Chief of Staff synthesis
export interface ExecutiveDecision {
  executive_priority: string;
  priority_score: number;
  projected_runway: number;
  worst_case_runway: number;
  p10_runway: number;
  capital_strategy: string;
  operational_strategy: string;
  governance: string;
  forecast: Record<string, string>;
  action_plan: {
    timeline: string;
    steps: Array<{ step: number; action: string; owner: string }>;
  };
  executive_summary: string;
}
