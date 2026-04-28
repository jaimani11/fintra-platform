# Running Tests

Recommended:
- pytest

Example:
pytest testing/scenarios

Curl Commands for testing decision generation after the backend is running:

# --------------------------------------------------------
# 1. BASIC GENERATION TEST
# --------------------------------------------------------
curl -X POST http://127.0.0.1:8000/api/decisions/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "optimize payroll, tax leakage, and accounting mismatches",
    "modules": ["payroll", "accounting", "sales_tax"],
    "revenue": 10000,
    "payroll_ratio": 0.7,
    "other_burn": 2000
  }' | jq


# --------------------------------------------------------
# 2. PRIORITY SCORING ORDER TEST
# --------------------------------------------------------
curl -s http://127.0.0.1:8000/api/decisions/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "stress test scoring order",
    "modules": ["payroll", "sales_tax", "accounting"],
    "revenue": 20000,
    "payroll_ratio": 0.6,
    "other_burn": 3000
  }' | jq '.[].priority_score'


# --------------------------------------------------------
# 3. SALES TAX VALIDATION TEST
# --------------------------------------------------------
curl -X POST http://127.0.0.1:8000/api/decisions/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "check tax compliance and remittance gaps",
    "modules": ["sales_tax"],
    "revenue": 50000,
    "payroll_ratio": 0.5,
    "other_burn": 10000
  }' | jq


# --------------------------------------------------------
# 4. DEDUPLICATION STRESS TEST
# --------------------------------------------------------
curl -X POST http://127.0.0.1:8000/api/decisions/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "repeat payroll payroll payroll issues",
    "modules": ["payroll"],
    "revenue": 10000,
    "payroll_ratio": 0.8,
    "other_burn": 1000
  }' | jq


# --------------------------------------------------------
# 5. SINGLE DECISION FETCH TEST (STATE CHECK)
# --------------------------------------------------------
curl http://127.0.0.1:8000/api/decisions/1 | jq


# --------------------------------------------------------
# 6. HEALTH CHECK
# --------------------------------------------------------
curl http://127.0.0.1:8000/api/decisions/health | jq