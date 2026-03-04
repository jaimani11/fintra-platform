export interface SIP {
  module: string;
  risk_score: number; // 0 to 1
  financial_exposure: number;
  impact_chain: string[];
  analysis: string;
  recommended_actions: string[];
}
