from fastapi import APIRouter, HTTPException
from app.schemas.dropout import DropoutPredictionRequest, DropoutPredictionResponse
from app.services.dropout_service import get_dropout_service

router = APIRouter()

@router.post("/dropout", response_model=DropoutPredictionResponse)
async def predict_dropout(request: DropoutPredictionRequest):
    """
    Predict student dropout risk using machine learning model.
    Based on enrollment and demographic data.
    """
    try:
        # Get the dropout prediction service
        service = get_dropout_service()
        
        # Convert request to dictionary
        student_data = request.model_dump()
        
        # Debug logging
        print(f"\n=== Dropout API Request Received ===")
        print(f"Baccalaureate Score: {student_data.get('baccalaureate_score')} (type: {type(student_data.get('baccalaureate_score'))})")
        print(f"Full request: {student_data}")
        
        # Get prediction from ML model
        prediction = service.predict(student_data)
        
        print(f"Dropout prediction result: {prediction['dropout_probability']}")
        
        # Generate recommendations
        recommendations = _generate_recommendations(
            prediction["dropout_prediction"],
            prediction["confidence"],
            prediction["factors"]
        )
        
        return DropoutPredictionResponse(
            dropout_prediction=prediction["dropout_prediction"],
            dropout_probability=prediction["dropout_probability"],
            retention_probability=prediction["retention_probability"],
            confidence=prediction["confidence"],
            factors=prediction["factors"],
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Dropout prediction failed: {str(e)}")


def _generate_recommendations(prediction: str, confidence: str, factors: dict) -> list[str]:
    """
    Generate personalized recommendations based on dropout risk prediction.
    """
    recommendations = []
    
    if prediction == "High Risk":
        recommendations.append("URGENT: Immediate intervention required to prevent dropout")
        
        # Check specific concerns
        has_academic_concern = any("average" in concern.lower() or "baccalaureate" in concern.lower() for concern in factors["concerns"])
        has_skills_concern = any("skills" in concern.lower() for concern in factors["concerns"])
        has_projects_concern = any("projects" in concern.lower() for concern in factors["concerns"])
        has_internship_concern = any("internship" in concern.lower() for concern in factors["concerns"])
        has_portfolio_concern = any("portfolio" in concern.lower() for concern in factors["concerns"])
        has_linkedin_concern = any("linkedin" in concern.lower() for concern in factors["concerns"])
        
        if has_academic_concern:
            recommendations.append("CRITICAL: Enroll in intensive academic support programs immediately")
            recommendations.append("Schedule weekly meetings with academic advisor")
            recommendations.append("Access tutoring services for challenging courses")
        
        if has_skills_concern:
            recommendations.append("URGENT: Improve technical and soft skills through workshops and training")
            recommendations.append("Join communication skills development programs")
        
        if has_projects_concern:
            recommendations.append("Start working on projects immediately - aim for at least 4 completed projects")
            recommendations.append("Join project-based learning groups")
        
        if has_internship_concern:
            recommendations.append("CRITICAL: Secure an internship as soon as possible (min 3 months)")
            recommendations.append("Visit career services for internship opportunities")
        
        if has_portfolio_concern:
            recommendations.append("Create a professional portfolio showcasing your work")
        
        if has_linkedin_concern:
            recommendations.append("Create a LinkedIn profile and build your professional network")
        
        recommendations.append("Register for early warning system and progress monitoring")
        recommendations.append("Maintain regular contact with student success center")
        
    elif prediction == "Medium Risk":
        recommendations.append("Moderate risk detected - proactive measures recommended")
        
        has_academic_concern = any("average" in concern.lower() or "baccalaureate" in concern.lower() for concern in factors["concerns"])
        has_skills_concern = any("skills" in concern.lower() for concern in factors["concerns"])
        has_projects_concern = any("projects" in concern.lower() for concern in factors["concerns"])
        
        if has_academic_concern:
            recommendations.append("Strengthen academic skills through tutoring and study groups")
            recommendations.append("Monitor grades closely and seek help early if struggling")
        
        if has_skills_concern:
            recommendations.append("Develop technical and communication skills through workshops")
            recommendations.append("Practice presentation and collaboration skills")
        
        if has_projects_concern:
            recommendations.append("Increase project involvement - aim for 4+ projects")
        
        recommendations.append("Build connections with peers and faculty for support network")
        recommendations.append("Use time management tools to balance coursework effectively")
        recommendations.append("Set clear academic goals and track progress regularly")
        recommendations.append("Utilize campus resources (library, career center, counseling)")
        
    else:  # Low Risk
        if confidence == "High":
            recommendations.append("Excellent retention profile! Keep up the great work")
            recommendations.append("Consider becoming a peer mentor to help at-risk students")
            recommendations.append("Explore leadership opportunities and extracurricular activities")
            recommendations.append("Focus on building skills for career success")
        elif confidence == "Medium":
            recommendations.append("Good retention indicators - maintain your current path")
            recommendations.append("Continue strong academic performance")
            recommendations.append("Stay engaged with campus community")
            recommendations.append("Build professional network through internships and projects")
        else:  # Low confidence
            recommendations.append("Low risk but stay vigilant - maintain consistent effort")
            recommendations.append("Monitor your academic performance each semester")
            recommendations.append("Keep up with coursework and don't fall behind")
            recommendations.append("Use academic resources when needed")
    
    # Add general recommendations
    recommendations.append("Regular check-ins with advisors help catch issues early")
    
    return recommendations
