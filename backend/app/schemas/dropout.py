from pydantic import BaseModel, Field
from typing import Dict, List

class DropoutPredictionRequest(BaseModel):
    """Request model for student dropout risk prediction."""
    gender: int = Field(..., ge=0, le=1, description="Gender (0=female, 1=male)")
    origin_governorate: str = Field(..., description="Governorate of origin")
    baccalaureate_score: float = Field(..., ge=0, le=20, description="Baccalaureate score (0-20)")
    baccalaureate_type: str = Field(..., description="Type of baccalaureate (Sciences Exp, Math, Letters, Tech)")
    previous_years_average: float = Field(..., ge=0, le=20, description="Previous years average score (0-20)")
    communication_skills_score: int = Field(..., ge=0, le=10, description="Communication skills score (0-10)")
    technical_skills_score: int = Field(..., ge=0, le=10, description="Technical skills score (0-10)")
    soft_skills_score: int = Field(..., ge=0, le=10, description="Soft skills score (0-10)")
    projects_completed: int = Field(..., ge=0, description="Number of projects completed")
    internship_completed: int = Field(..., ge=0, le=1, description="Internship completed (0=no, 1=yes)")
    internship_duration_months: int = Field(default=0, ge=0, description="Internship duration in months")
    portfolio_exists: int = Field(..., ge=0, le=1, description="Portfolio exists (0=no, 1=yes)")
    linkedin_profile: int = Field(..., ge=0, le=1, description="LinkedIn profile exists (0=no, 1=yes)")

class DropoutPredictionResponse(BaseModel):
    """Response model for student dropout risk prediction."""
    dropout_prediction: str = Field(..., description="Prediction result (Low Risk, Medium Risk, or High Risk)")
    dropout_probability: float = Field(..., ge=0, le=1, description="Dropout probability (0-1)")
    retention_probability: float = Field(..., ge=0, le=1, description="Retention probability (0-1)")
    confidence: str = Field(..., description="Confidence level (High, Medium, Low)")
    factors: Dict[str, List[str]] = Field(..., description="Contributing factors")
    recommendations: List[str] = Field(..., description="Personalized recommendations")
