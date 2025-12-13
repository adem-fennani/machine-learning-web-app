from pydantic import BaseModel, Field, ConfigDict
from typing import List

class TAEligibilityResponse(BaseModel):
    """Response model for TA eligibility check"""
    model_config = ConfigDict(protected_namespaces=())
    
    total_students: int = Field(..., description="Total number of students analyzed")
    employable_students: int = Field(..., description="Number of students predicted as employable")
    employability_rate: float = Field(..., description="Percentage of employable students")
    message: str = Field(..., description="Summary message")
