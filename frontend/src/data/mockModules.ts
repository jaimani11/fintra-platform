import { SIP } from "../types";

export const mockModules: SIP[] = [
  {
    module: "payroll",
    risk_score: 0.75, // Triggers "Hiring Freeze" in COO mode
    financial_exposure: 120000,
    recommended_actions: ["Review tax withholding", "Audit benefits enrollment"]
  },
  {
    module: "accounting",
    risk_score: 0.3,
    financial_exposure: 45000,
    recommended_actions: ["Reconcile Q1 accounts"]
  },
  {
    module: "fairtix_resale",
    risk_score: 0.85, // Triggers "Board Notification" in Risk mode
    financial_exposure: 250000,
    recommended_actions: ["Activate bot mitigation", "Flag high-volume resellers"]
  }
];
