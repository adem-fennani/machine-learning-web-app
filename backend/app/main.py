from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import success, dropout

app = FastAPI(
    title="Stratus ML API",
    description="Machine Learning API for student analytics and predictions",
    version="0.2.0"
)

# CORS - Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Active routers
app.include_router(success.router, prefix="/api/predict", tags=["Success Prediction"])
app.include_router(dropout.router, prefix="/api/predict", tags=["Dropout Prediction"])

@app.get("/")
async def root():
    return {
        "message": "Stratus ML API",
        "version": "0.2.0",
        "endpoints": {
            "success": "/api/predict/success",
            "dropout": "/api/predict/dropout",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
