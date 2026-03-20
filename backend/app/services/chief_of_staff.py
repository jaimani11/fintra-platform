from app.services.monte_carlo import run_monte_carlo
from app.services.agents import cfo_agent, coo_agent, risk_agent

class ChiefOfStaffService:

    @staticmethod
    def synthesize(
        modules,
        revenue,
        payroll_ratio,
        other_burn
    ):

        base_risk = sum(
            m["risk_score"] for m in modules
        ) / len(modules)

        severity = ChiefOfStaffService.determine_severity(base_risk)

        simulation = run_monte_carlo(
            revenue,
            payroll_ratio,
            other_burn
        )

        avg_runway = simulation["avg_runway"]
        worst_runway = simulation["worst_runway"]

        cfo = cfo_agent(modules)
        coo = coo_agent(modules)
        risk = risk_agent(base_risk)

        decision = {
            "executive_priority": severity,
            "priority_score": round(base_risk, 2),
            "projected_runway": avg_runway,
            "worst_case_runway": worst_runway,
            "capital_strategy": cfo["capital_recommendation"],
            "operational_strategy": coo["operations_adjustment"],
            "governance": risk["governance_flag"]
        }

        return decision

    @staticmethod
    def determine_severity(score: float):
        if score > 0.9:
            return "CRITICAL"
        if score > 0.7:
            return "HIGH"
        if score > 0.5:
            return "MODERATE"
        return "LOW"
