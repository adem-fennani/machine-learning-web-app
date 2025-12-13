from pydantic import BaseModel, Field
from typing import List, Dict, Any


class EnrollmentForecastRequest(BaseModel):
    """Request model for enrollment forecast."""
    years_ahead: int = Field(
        default=5,
        ge=1,
        le=10,
        description="Number of years to forecast (1-10)"
    )


class YearlyForecast(BaseModel):
    """Individual year forecast."""
    year: int
    predicted_enrollment: int
    trend: str  # "increasing", "decreasing", "stable"


class EnrollmentForecastResponse(BaseModel):
    """Response model for enrollment forecast."""
    model_config = {"protected_namespaces": ()}
    
    forecasts: List[YearlyForecast]
    total_growth: float  # Percentage growth over forecast period
    average_enrollment: int
    trend_description: str
    model_info: Dict[str, Any]
