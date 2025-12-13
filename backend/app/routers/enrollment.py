from fastapi import APIRouter, HTTPException
from app.schemas.enrollment import EnrollmentForecastRequest, EnrollmentForecastResponse
from app.services.enrollment_service import get_enrollment_service

router = APIRouter()

@router.post("/forecast", response_model=EnrollmentForecastResponse)
async def forecast_enrollment(request: EnrollmentForecastRequest):
    """
    Forecast student enrollment for upcoming years using time series model.
    Uses polynomial regression to predict enrollment trends.
    """
    try:
        service = get_enrollment_service()
        
        print(f"\n=== Enrollment Forecast Request ===")
        print(f"Years ahead: {request.years_ahead}")
        
        # Get forecast
        forecast_data = service.forecast(request.years_ahead)
        
        print(f"Forecast generated for {len(forecast_data['forecasts'])} years")
        print(f"Total growth: {forecast_data['total_growth']}%")
        
        return EnrollmentForecastResponse(**forecast_data)
        
    except Exception as e:
        import traceback
        print(f"\n❌ ERROR in enrollment forecast:")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Forecast failed: {str(e)}")
