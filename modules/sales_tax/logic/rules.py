# New File: rules.py
# Description: This is a dictionary containing the nexus rules for each state in the US.

NEXUS_RULES = {
    "CA": {"sales_threshold": 100000, "transaction_threshold": 200, "under_remittance_threshold": 500},
    "TX": {"sales_threshold": 500000, "transaction_threshold": None, "under_remittance_threshold": 1000},
    "NY": {"sales_threshold": 500000, "transaction_threshold": 100, "under_remittance_threshold": 750},
}