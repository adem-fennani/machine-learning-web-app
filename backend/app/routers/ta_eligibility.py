from fastapi import APIRouter, HTTPException
from app.schemas.ta_eligibility import TAEligibilityResponse
from app.services.ta_eligibility_service import ta_eligibility_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.get("/eligibility", response_model=TAEligibilityResponse)
async def get_ta_eligibility():
    """
    Get TA (Teaching Assistant) eligibility predictions for student population
    
    Analyzes all students and predicts who is eligible for TA positions
    based on academic performance, skills, and other criteria.
    
    Returns:
        - total_students: Total number of students analyzed
        - employable_students: Number of students predicted as eligible
        - employability_rate: Percentage of eligible students
        - message: Summary message
    """
    try:
        logger.info("TA eligibility request received")
        
        # Get predictions
        result = ta_eligibility_service.predict_employability()
        
        response = TAEligibilityResponse(
            total_students=result["total_students"],
            employable_students=result["employable_students"],
            employability_rate=result["employability_rate"],
            message=result["message"],
            eligible_students_list=result["eligible_students_list"]
        )
        
        logger.info(f"TA eligibility prediction successful: {result['employability_rate']:.2f}% eligible")
        
        return response
        
    except Exception as e:
        logger.error(f"Error in TA eligibility endpoint: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error during TA eligibility prediction")
