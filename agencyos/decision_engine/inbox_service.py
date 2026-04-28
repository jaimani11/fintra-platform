# Unnecessary file now, enforced in decision_generator.py directly 


from typing import List, Dict, Any


class InboxService:
    """
    Guarantees:
    - max 5 decisions
    - sorted
    - deduped (safety net)
    """

    @staticmethod
    def build_inbox(decisions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:

        seen = set()
        unique = []

        for d in decisions:
            key = d["content"].strip().lower()
            if key in seen:
                continue
            seen.add(key)
            unique.append(d)

        sorted_decisions = sorted(
            unique,
            key=lambda x: x["priority_score"],
            reverse=True
        )

        return sorted_decisions[:5]