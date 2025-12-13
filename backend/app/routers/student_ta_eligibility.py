from fastapi import APIRouter, HTTPException
from app.schemas.student_ta_eligibility import StudentTAEligibilityRequest, StudentTAEligibilityResponse
from app.services.student_ta_eligibility_service import student_ta_eligibility_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/ta-check", response_model=StudentTAEligibilityResponse)
async def check_student_ta_eligibility(request: StudentTAEligibilityRequest):
    """
    Check TA (Teaching Assistant) eligibility for an individual student
    
    Analyzes student profile including:
    - Academic performance (previous years average)
    - Skills (communication, technical, soft skills)
    - Experience (internships, projects)
    - Professional profile (portfolio, LinkedIn)
    - Teaching interest
    - English proficiency level
    
    Returns:
        - employable: Whether student qualifies for TA positions
        - probability: Confidence score (0-100%)
        - message: Result message
        - recommendations: Personalized improvement suggestions
    """
    try:
        logger.info(f"Student TA eligibility check - Average: {request.previous_years_average}, "
                   f"Skills: C{request.communication_skills_score}/T{request.technical_skills_score}/S{request.soft_skills_score}")
        
        # Convert request to dict
        student_data = request.model_dump()
        
        # Get prediction
        result = student_ta_eligibility_service.predict_student_eligibility(student_data)
        
        response = StudentTAEligibilityResponse(
            employable=result["employable"],
            probability=result["probability"],
            message=result["message"],
            recommendations=result["recommendations"]
        )
        
        logger.info(f"Student TA eligibility check successful: {'Eligible' if result['employable'] else 'Not Eligible'} ({result['probability']:.2f}%)")
        
        return response
        
    except ValueError as e:
        logger.error(f"Validation error in student TA eligibility: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error in student TA eligibility endpoint: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error during TA eligibility check")
