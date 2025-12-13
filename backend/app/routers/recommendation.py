from fastapi import APIRouter, HTTPException
from app.schemas.recommendation import ProgramRecommendationRequest, ProgramRecommendationResponse
from app.services.recommendation_service import get_recommendation_service

router = APIRouter()

@router.post("/recommend", response_model=ProgramRecommendationResponse)
async def recommend_program(request: ProgramRecommendationRequest):
    """
    Recommend an academic program using ML model with clustering.
    Based on comprehensive student profile including academic, technical, and soft skills.
    """
    try:
        # Get the recommendation service
        service = get_recommendation_service()
        
        # Convert request to dictionary
        student_data = request.model_dump()
        
        # Debug logging
        print(f"\n=== Program Recommendation Request ===")
        print(f"Academic Strength: Bacc={student_data.get('baccalaureate_score')}, Avg={student_data.get('previous_years_average')}")
        print(f"Technical: {student_data.get('technical_skills_score')}, Projects={student_data.get('projects_completed')}")
        print(f"Soft Skills: {student_data.get('soft_skills_score')}, Comm={student_data.get('communication_skills_score')}")
        
        # Get recommendation from ML model
        recommendation = service.predict(student_data)
        
        print(f"Recommendation: {recommendation['recommended_program']} (Cluster {recommendation['cluster']})")
        
        return ProgramRecommendationResponse(
            recommended_program=recommendation["recommended_program"],
            cluster=recommendation["cluster"],
            explanation=recommendation["explanation"],
            confidence=recommendation["confidence"],
            program_details=recommendation["program_details"],
            student_profile=recommendation["student_profile"],
            alternative_programs=recommendation["alternative_programs"]
        )
        
    except Exception as e:
        import traceback
        print(f"\n❌ ERROR in recommendation:")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Recommendation failed: {str(e)}")
