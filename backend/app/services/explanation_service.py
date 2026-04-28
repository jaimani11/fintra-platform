from backend.app.services.ai_service import AIService


class ExplanationService:

    @staticmethod
    def generate_explanation(decision: dict) -> str:
        """
        AI explanation layer.
        """

        prompt = f"""
            Explain WHY this decision exists in a business system.

            You are NOT creating new strategy.
            You are NOT changing scores.
            You are ONLY justifying existing logic.

            ---

            DECISION:
            {decision.get("content")}

            MODULES:
            {decision.get("modules")}

            SIGNAL TRACE:
            {decision.get("signal_trace")}

            SCORES:
            Impact: {decision.get("impact_score")}
            Urgency: {decision.get("urgency_score")}
            Confidence: {decision.get("confidence_score")}
            Priority: {decision.get("priority_score")}

            ROI (cents):
            {decision.get("roi")}

            Cost of inaction (cents):
            {decision.get("cost_of_inaction_cents")}

            ---

            Write a concise executive justification:
            - why this issue matters
            - why it is ranked this high
            - what business risk it represents
            - CFO-level clarity
            """

        return AIService.generate_text(prompt, max_tokens=220)