from pydantic import BaseModel, Field
from typing import Dict, List

class ProgramRecommendationRequest(BaseModel):
    """Request model for program recommendation."""
    baccalaureate_score: float = Field(..., ge=0, le=20, description="Baccalaureate score (0-20)")
    previous_years_average: float = Field(..., ge=0, le=20, description="Previous years average (0-20)")
    communication_skills_score: int = Field(..., ge=0, le=10, description="Communication skills (0-10)")
    technical_skills_score: int = Field(..., ge=0, le=10, description="Technical skills (0-10)")
    soft_skills_score: int = Field(..., ge=0, le=10, description="Soft skills (0-10)")
    internship_completed: int = Field(..., ge=0, le=1, description="Internship completed (0=no, 1=yes)")
    internship_duration_months: int = Field(default=0, ge=0, description="Internship duration in months")
    projects_completed: int = Field(..., ge=0, description="Number of projects completed")
    portfolio_exists: int = Field(..., ge=0, le=1, description="Portfolio exists (0=no, 1=yes)")
    linkedin_profile: int = Field(..., ge=0, le=1, description="LinkedIn profile (0=no, 1=yes)")
    teaching_interest: int = Field(..., ge=0, le=10, description="Teaching interest level (0-10)")
    final_average: float = Field(..., ge=0, le=20, description="Final average score (0-20)")
    has_scholarship: int = Field(..., ge=0, le=1, description="Has scholarship (0=no, 1=yes)")
    origin_governorate: str = Field(..., description="Governorate of origin")
    baccalaureate_type: str = Field(..., description="Type of baccalaureate")
    scholarship_status: str = Field(..., description="Scholarship status")
    campus: str = Field(..., description="Campus name")
    registration_status: str = Field(..., description="Registration status")
    english_level: str = Field(..., description="English proficiency level (A1, A2, B1, B2, C1)")

class ProgramRecommendationResponse(BaseModel):
    """Response model for program recommendation."""
    recommended_program: str = Field(..., description="Recommended program (STEM, Business, or Preparatory)")
    cluster: int = Field(..., description="Student cluster ID")
    explanation: str = Field(..., description="Explanation for the recommendation")
    confidence: str = Field(..., description="Confidence level (High, Medium, Low)")
    program_details: Dict[str, str] = Field(..., description="Details about the recommended program")
    student_profile: Dict[str, List[str]] = Field(..., description="Student profile analysis")
    alternative_programs: List[str] = Field(..., description="Alternative program suggestions")
