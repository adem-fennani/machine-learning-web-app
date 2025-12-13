from pydantic import BaseModel, Field, ConfigDict

class SegmentationRequest(BaseModel):
    """Request model for student segmentation"""
    model_config = ConfigDict(protected_namespaces=())
    
    baccalaureate_score: float = Field(..., ge=0, le=20, description="Baccalaureate score (0-20)")
    scholarship_status: str = Field(..., description="Scholarship status: Full Scholarship, Partial Scholarship, or Self-Funded")
    origin_governorate: str = Field(..., description="Student's origin governorate")
    chosen_program: str = Field(..., description="Chosen academic program")


class SegmentationResponse(BaseModel):
    """Response model for student segmentation"""
    model_config = ConfigDict(protected_namespaces=())
    
    cluster: int = Field(..., description="Assigned cluster number (0-2)")
    cluster_name: str = Field(..., description="Human-readable cluster interpretation")
    scholarship_status: str
    baccalaureate_score: float
    origin_governorate: str
    chosen_program: str
    cluster_characteristics: dict = Field(..., description="Characteristics of the assigned cluster")
