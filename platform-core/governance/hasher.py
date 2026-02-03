import hashlib
import json

def hash_decision(decision):
    payload = {
        "id": decision.id,
        "org_id": decision.org_id,
        "title": decision.title,
        "approved_by": decision.approved_by,
        "status": decision.status,
    }
    encoded = json.dumps(payload, sort_keys=True).encode()
    return hashlib.sha256(encoded).hexdigest()
