from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import success, dropout, recommendation, enrollment, segmentation, ta_eligibility

app = FastAPI(
    title="Stratus ML API",
    description="Machine Learning API for student analytics and predictions",
    version="0.7.0"
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
app.include_router(recommendation.router, prefix="/api/predict", tags=["Program Recommendation"])
app.include_router(enrollment.router, prefix="/api/admin", tags=["Enrollment Forecast"])
app.include_router(segmentation.router, prefix="/api/student", tags=["Student Segmentation"])
app.include_router(ta_eligibility.router, prefix="/api/admin", tags=["TA Eligibility"])

@app.get("/")
async def root():
    return {
        "message": "Stratus ML API",
        "version": "0.7.0",
        "endpoints": {
            "success": "/api/predict/success",
            "dropout": "/api/predict/dropout",
            "recommend": "/api/predict/recommend",
            "enrollment_forecast": "/api/admin/forecast",
            "ta_eligibility": "/api/admin/eligibility",
            "student_segmentation": "/api/student/segment",
            "docs": "/docs"
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
