from pydantic import BaseModel, Field, ConfigDict

class StudentTAEligibilityRequest(BaseModel):
    """Request model for individual student TA eligibility check"""
    model_config = ConfigDict(protected_namespaces=())
    
    previous_years_average: float = Field(..., ge=0, le=20, description="Previous years average score (0-20)")
    communication_skills_score: int = Field(..., ge=0, le=10, description="Communication skills (0-10)")
    technical_skills_score: int = Field(..., ge=0, le=10, description="Technical skills (0-10)")
    soft_skills_score: int = Field(..., ge=0, le=10, description="Soft skills (0-10)")
    internship_completed: int = Field(..., ge=0, le=1, description="Internship completed (0=No, 1=Yes)")
    internship_duration_months: int = Field(..., ge=0, description="Internship duration in months")
    projects_completed: int = Field(..., ge=0, description="Number of projects completed")
    portfolio_exists: int = Field(..., ge=0, le=1, description="Portfolio exists (0=No, 1=Yes)")
    linkedin_profile: int = Field(..., ge=0, le=1, description="LinkedIn profile (0=No, 1=Yes)")
    teaching_interest: int = Field(..., ge=0, le=10, description="Teaching interest level (0-10)")
    english_level: str = Field(..., description="English level: A1, A2, B1, B2, C1, C2")


class StudentTAEligibilityResponse(BaseModel):
    """Response model for individual student TA eligibility check"""
    model_config = ConfigDict(protected_namespaces=())
    
    employable: bool = Field(..., description="Whether student is employable as TA")
    probability: float = Field(..., description="Probability of employability (0-100%)")
    message: str = Field(..., description="Result message")
    recommendations: list[str] = Field(..., description="Recommendations for improvement")
