from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import hashlib
import json
import uuid

# Import routers
from backend.decisions.routes import router as decisions_router

# --------------------------------------------------
# Create app
# --------------------------------------------------

app = FastAPI(title="Fintra API")
audit_database = [] # database mock for now to store logs
# --------------------------------------------------
# CORS Configuration
# --------------------------------------------------


# This is commented out due to trouble getting it to connect, despite correct url and connections
#app.add_middleware(
#    CORSMiddleware,
#    allow_origins=[
#        "http://localhost:5173",
#        "http://localhost:3000",
#        "https://fyntraworks.com",
#        "https://www.fyntraworks.com"
#    ],
#    allow_credentials=True,
#    allow_methods=["*"],
#    allow_headers=["*"],
#)

# This is the temporary solution to the above problem. It is NOT ideal for production. 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
# audit service draft
class audit_service:
    @staticmethod
    def logging_action(user_role: str, action_type: str, module: str, evidence: dict, output: str, trace_id: str = None):
        timestamp = datetime.now().isoformat() # time of log
        trace = trace_id if trace_id else f"TRACE-{uuid.uuid4().hex[:6].upper()}" #the trace chain
        combined_string = f"{timestamp}-{module}-{output}"
        id = hashlib.md5(combined_string.encode()).hexdigest()[:8] # keeping logs unique
        new_log = { #artifact
            "log_id": f"LOG-{id.upper()}", "trace_id": trace, "user": user_role, "time": timestamp, "module": module, "action": action_type, "data": evidence, "output": output
        }
        audit_database.append(new_log)
        return trace
def compliance_limit(investor_type: str, amount: float):
    if amount < 0:
        return {"signal": "error", "message": "amount cant be negative"}
    REG_CF_MAX = 2000.0 # random threshold
    if investor_type.lower() == "non accredited" and amount > REG_CF_MAX:
        return {
            "signal": "Red flag", "rule": "Reg CF limit past", "action": "Put into audit trail"
        }
    return {"signal": "Green", "rule": "Compliant"}
    
@app.get("/compliance/signal")
def compliance_signal(status: str = "non accredited", amount: float = 0.0):
    data_output = compliance_limit(status, amount)
    trace = audit_service.logging_action( #compliance signals logged
        user_role="System", module="Compliance", action_type="Checking limit of investor", evidence={"status": status, "amount": amount}, output=data_output["signal"]
    )
    return {
        "data": data_output, "trace_id": trace
    }
# --------------------------------------------------
# epic 7 story with the sales tax exposure stuff
# --------------------------------------------------
def sales_tax_exposure(state: str, revenue: float, transactions: int):
    # nexus threshold placeholder
    REVENUE_LIMIT = 100000.0
    TRANSACTIONS_LIMIT = 200
    close_to_limit = revenue >= (REVENUE_LIMIT * 0.75) or transactions >= (TRANSACTIONS_LIMIT * 0.75)
    over_the_limit = revenue >= REVENUE_LIMIT or transactions >= TRANSACTIONS_LIMIT
    if over_the_limit:
        return {"status": "CRITICAL", "msg": f"nexus threshold past in {state}. Should check on that."}
    elif close_to_limit:
        return {"status": "WARNING", "msg": f"getting close ot nexus in {state}."}
    return {"status": "CLEAR", "msg": "no tax exposure yet"}
@app.get("/governance/history")
def get_governance_history():
    return {
        "organization": "Fintra", "logs": len(audit_database), "history": audit_database[::-1] #from mock database
    }
@app.get("/governance/trace/{trace_id}")
def get_trace_chain(trace_id: str):
    chain = [log for log in audit_database if log.get("trace_id") == trace_id]
    return {
        "trace_id": trace_id, "count_of_events": len(chain), "chain": chain #chain of events
    }
@app.get("/governance/approvals")
def get_approval_history():
    approval = [log for log in audit_database if log["output"] in ["CRITICAL", "WARNING", "Red flag"]]
    return {
        "count_of_reviews": len(approval), "history": approval
    }
@app.get("/tax/exposure")
def get_sales_tax_exposure(state: str = "AZ", revenue: float = 0.0, transactions: int = 0): # getting the alerts as an owner
    data_output = sales_tax_exposure(state, revenue, transactions)
    trace = audit_service.logging_action( # givign trace id
        user_role="System", module="Sales Tax", action_type="Checking if nexus exposed or not", evidence={"revenue": revenue, "transactions": transactions, "state": state}, output=data_output["status"]
    )
    return {
        "data": data_output, "trace_id": trace
    }
# --------------------------------------------------
# Root Health Check
# --------------------------------------------------

@app.get("/")
def root():
    return {"status": "Fintra backend running"}

# --------------------------------------------------
# Register Routers
# --------------------------------------------------

app.include_router(decisions_router)
