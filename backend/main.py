from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from decisions.routes import router as decisions_router

# --------------------------------------------------
# Create app
# --------------------------------------------------

app = FastAPI(title="Fintra API")

# --------------------------------------------------
# CORS Configuration
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# --------------------------------------------------
# sprint 3 work in progress
# --------------------------------------------------
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
    return compliance_limit(status, amount)
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
@app.get("/tax/exposure")
def get_sales_tax_exposure(state: str = "AZ", revenue: float = 0.0, transactions: int = 0): # getting the alerts as an owner
    return sales_tax_exposure(state, revenue, transactions)
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
