from pydantic import BaseModel, Field
from typing import Dict, List

class SuccessPredictionRequest(BaseModel):
    """Request model for student success prediction."""
    gender: int = Field(..., ge=0, le=1, description="Gender (0=female, 1=male)")
    age: int = Field(..., ge=16, le=100, description="Student age")
    origin_governorate: str = Field(..., description="Governorate of origin")
    baccalaureate_score: float = Field(..., ge=0, le=20, description="Baccalaureate score (0-20)")
    baccalaureate_type: str = Field(..., description="Type of baccalaureate (Sciences, Math, Letters, Tech)")
    enrollment_year: int = Field(..., ge=2000, le=2030, description="Year of enrollment")
    scholarship_status: str = Field(..., description="Scholarship status (Full Scholarship, Partial Scholarship, Self-Funded)")
    campus: str = Field(..., description="Campus name (Tunis Main, Monastir)")
    registration_status: str = Field(default="ACTIVE", description="Registration status")

class SuccessPredictionResponse(BaseModel):
    """Response model for student success prediction."""
    success_prediction: str = Field(..., description="Prediction result (Likely to Succeed or At Risk)")
    success_probability: float = Field(..., ge=0, le=1, description="Success probability (0-1)")
    risk_probability: float = Field(..., ge=0, le=1, description="Risk probability (0-1)")
    confidence: str = Field(..., description="Confidence level (High, Medium, Low)")
    factors: Dict[str, List[str]] = Field(..., description="Contributing factors")
    recommendations: List[str] = Field(..., description="Personalized recommendations")
