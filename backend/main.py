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
# Root Health Check
# --------------------------------------------------

@app.get("/")
def root():
    return {"status": "Fintra backend running"}

# --------------------------------------------------
# Register Routers
# --------------------------------------------------

app.include_router(decisions_router)
