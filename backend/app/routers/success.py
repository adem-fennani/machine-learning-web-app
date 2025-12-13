from fastapi import APIRouter, HTTPException
from app.schemas.success import SuccessPredictionRequest, SuccessPredictionResponse
from app.services.success_service import get_success_service

router = APIRouter()

@router.post("/success", response_model=SuccessPredictionResponse)
async def predict_success(request: SuccessPredictionRequest):
    """
    Predict student success using Random Forest model.
    Based on enrollment and demographic data.
    """
    try:
        # Get the success prediction service
        service = get_success_service()
        
        # Convert request to dictionary
        student_data = request.model_dump()
        
        # Get prediction from ML model
        prediction = service.predict(student_data)
        
        # Generate recommendations
        recommendations = _generate_recommendations(
            prediction["success_prediction"],
            prediction["confidence"],
            prediction["factors"]
        )
        
        return SuccessPredictionResponse(
            success_prediction=prediction["success_prediction"],
            success_probability=prediction["success_probability"],
            risk_probability=prediction["risk_probability"],
            confidence=prediction["confidence"],
            factors=prediction["factors"],
            recommendations=recommendations
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


def _generate_recommendations(prediction: str, confidence: str, factors: dict) -> list[str]:
    """Generate personalized recommendations based on prediction."""
    recommendations = []
    
    if prediction == "At Risk":
        recommendations.append("🚨 Early intervention recommended")
        
        if factors["concerns"]:
            for concern in factors["concerns"]:
                if "scholarship" in concern.lower():
                    recommendations.append("💰 Apply for financial aid and scholarships")
                if "score" in concern.lower():
                    recommendations.append("📚 Enroll in academic support programs")
                if "age" in concern.lower():
                    recommendations.append("🤝 Connect with peer support groups")
        
        recommendations.append("👨‍🏫 Schedule regular meetings with academic advisor")
        recommendations.append("📖 Utilize tutoring and study resources")
        recommendations.append("🎯 Set clear academic goals with milestone tracking")
        
    else:  # Likely to Succeed
        if confidence == "High":
            recommendations.append("✅ Excellent profile! Continue your strong performance")
            recommendations.append("🌟 Consider leadership and mentoring opportunities")
            recommendations.append("🎓 Explore advanced coursework and research projects")
        elif confidence == "Medium":
            recommendations.append("👍 Good profile with room for growth")
            recommendations.append("📈 Focus on maintaining consistent academic performance")
            recommendations.append("💼 Build skills through internships and projects")
        else:  # Low confidence
            recommendations.append("⚠️ Monitor progress closely")
            recommendations.append("🔄 Stay engaged with academic advisors")
            recommendations.append("📊 Track performance metrics regularly")
    
    # Add general recommendations
    recommendations.append("🌐 Build professional network and LinkedIn presence")
    recommendations.append("🏢 Participate in campus activities and clubs")
    
    return recommendations
