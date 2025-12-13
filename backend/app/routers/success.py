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
        
        # Debug logging
        print(f"\n=== API Request Received ===")
        print(f"Baccalaureate Score: {student_data.get('baccalaureate_score')} (type: {type(student_data.get('baccalaureate_score'))})")
        print(f"Full request: {student_data}")
        
        # Get prediction from ML model
        prediction = service.predict(student_data)
        
        print(f"Prediction result: {prediction['success_probability']}")
        
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
    """
    Generate personalized recommendations based on prediction.
    
    Note: The model uses final_average >= 12 as success threshold.
    Since final_average ≈ baccalaureate_score * 0.9, students need
    a bacc score of ~13.3+ to be predicted as high performers.
    """
    recommendations = []
    
    if prediction == "At Risk":
        recommendations.append("🚨 Early intervention recommended")
        
        # Check specific concerns
        has_score_concern = any("score" in concern.lower() for concern in factors["concerns"])
        has_scholarship_concern = any("scholarship" in concern.lower() for concern in factors["concerns"])
        has_age_concern = any("age" in concern.lower() for concern in factors["concerns"])
        
        if has_score_concern:
            recommendations.append("📚 Priority: Academic strengthening - Your baccalaureate score is the strongest predictor of success")
            recommendations.append("🎯 Target: Work towards final average ≥ 12/20 (requires strong consistent performance)")
            recommendations.append("👨‍🏫 Enroll in intensive academic support and tutoring programs")
        
        if has_scholarship_concern:
            recommendations.append("💰 Apply for financial aid and scholarships to reduce financial stress")
        
        if has_age_concern:
            recommendations.append("🤝 Connect with peer support groups and non-traditional student resources")
        
        recommendations.append("📊 Schedule regular meetings with academic advisor for progress monitoring")
        recommendations.append("📖 Utilize all available tutoring and study resources")
        recommendations.append("⏰ Develop strong time management and study habits early")
        
    else:  # Likely to Succeed
        if confidence == "High":
            recommendations.append("✅ Excellent profile! Your academic foundation predicts strong success")
            recommendations.append("🌟 Consider leadership and mentoring opportunities to help at-risk peers")
            recommendations.append("🎓 Explore advanced coursework and research projects")
            recommendations.append("🏆 Aim for honors and academic excellence programs")
        elif confidence == "Medium":
            recommendations.append("👍 Good profile with solid success indicators")
            recommendations.append("📈 Maintain consistent academic performance to stay above 12/20 threshold")
            recommendations.append("💼 Build practical skills through internships and projects")
            recommendations.append("🔄 Stay engaged with coursework to maintain your trajectory")
        else:  # Low confidence
            recommendations.append("⚠️ Borderline prediction - consistent effort is critical")
            recommendations.append("📊 Monitor your academic performance closely each semester")
            recommendations.append("👨‍🏫 Maintain regular contact with academic advisors")
            recommendations.append("🎯 Focus on maintaining grades above the 12/20 success threshold")
    
    # Add general recommendations
    recommendations.append("🌐 Build professional network and LinkedIn presence")
    recommendations.append("🏢 Participate in campus activities and clubs for holistic development")
    
    return recommendations
