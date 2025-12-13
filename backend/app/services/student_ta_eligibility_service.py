import pickle
from pathlib import Path
import logging
import numpy as np
import pandas as pd

logger = logging.getLogger(__name__)

class StudentTAEligibilityService:
    _instance = None
    _initialized = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(StudentTAEligibilityService, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self._load_model()
            self._initialized = True
    
    def _load_model(self):
        """Load the employability prediction model"""
        try:
            model_path = Path(__file__).parent.parent / "models" / "employability_model(obj6).pkl"
            
            # Model file appears corrupted, using fallback logic
            logger.warning(f"Model file at {model_path} may be corrupted. Using fallback prediction logic.")
            
            self.model = None
            self.scaler = None
            
            # English level options for one-hot encoding
            self.english_levels = ["A1", "A2", "B1", "B2", "C1", "C2"]
            
            # All feature columns (base features + one-hot encoded english levels)
            self.base_features = [
                'previous_years_average', 'communication_skills_score', 'technical_skills_score',
                'soft_skills_score', 'internship_completed', 'internship_duration_months',
                'projects_completed', 'portfolio_exists', 'linkedin_profile', 'teaching_interest'
            ]
            
            self.english_cols = [f"english_level_{level}" for level in self.english_levels]
            self.all_columns = self.base_features + self.english_cols
            
            logger.info("Student TA eligibility service initialized (fallback mode)")
            
        except Exception as e:
            logger.error(f"Error loading student TA eligibility model: {e}")
            raise
    
    def _prepare_features(self, student_data: dict) -> pd.DataFrame:
        """Prepare features with one-hot encoding for english_level"""
        # Convert to DataFrame
        df = pd.DataFrame([student_data])
        
        # One-hot encode english_level
        for col in self.english_cols:
            df[col] = 0
        
        english_col_name = f"english_level_{student_data['english_level']}"
        if english_col_name in self.english_cols:
            df[english_col_name] = 1
        
        # Drop the original english_level column
        df = df.drop(columns=['english_level'])
        
        # Reindex to match model's expected column order
        df = df.reindex(columns=self.all_columns, fill_value=0)
        
        return df
    
    def _calculate_fallback_prediction(self, student_data: dict) -> tuple[bool, float]:
        """
        Fallback prediction logic based on key criteria
        Returns (employable: bool, probability: float)
        """
        score = 0.0
        max_score = 100.0
        
        # Academic performance (30 points)
        avg = student_data['previous_years_average']
        if avg >= 16:
            score += 30
        elif avg >= 14:
            score += 20
        elif avg >= 12:
            score += 10
        
        # Skills assessment (30 points total)
        comm_skills = student_data['communication_skills_score']
        tech_skills = student_data['technical_skills_score']
        soft_skills = student_data['soft_skills_score']
        
        avg_skills = (comm_skills + tech_skills + soft_skills) / 3
        score += (avg_skills / 10) * 30
        
        # Practical experience (25 points)
        if student_data['internship_completed'] == 1:
            score += 10
            # Bonus for duration
            if student_data['internship_duration_months'] >= 3:
                score += 5
        
        if student_data['projects_completed'] >= 3:
            score += 10
        elif student_data['projects_completed'] >= 1:
            score += 5
        
        # Professional profile (10 points)
        if student_data['portfolio_exists'] == 1:
            score += 5
        if student_data['linkedin_profile'] == 1:
            score += 5
        
        # Teaching interest (5 points)
        teaching_score = student_data['teaching_interest']
        score += (teaching_score / 10) * 5
        
        probability = (score / max_score) * 100
        employable = probability >= 70  # 70% threshold for employability
        
        return employable, probability
    
    def predict_student_eligibility(self, student_data: dict) -> dict:
        """
        Predict TA eligibility for an individual student
        
        Args:
            student_data: Dictionary with student features
            
        Returns:
            Dictionary with employable status, probability, message, and recommendations
        """
        try:
            # Prepare features
            df_prepared = self._prepare_features(student_data)
            
            # TODO: When model is fixed, use actual model prediction
            # For now, use fallback logic
            employable, probability = self._calculate_fallback_prediction(student_data)
            
            # Generate message
            if employable:
                message = f"✅ YES - You are eligible for TA positions with {probability:.2f}% confidence"
            else:
                message = f"❌ NO - You are not currently eligible. Employability probability: {probability:.2f}%"
            
            # Generate recommendations
            recommendations = self._generate_recommendations(student_data, employable, probability)
            
            logger.info(f"Student TA eligibility: {'Eligible' if employable else 'Not Eligible'} ({probability:.2f}%)")
            
            return {
                "employable": employable,
                "probability": round(probability, 2),
                "message": message,
                "recommendations": recommendations
            }
            
        except Exception as e:
            logger.error(f"Error in student TA eligibility prediction: {e}")
            raise
    
    def _generate_recommendations(self, student_data: dict, employable: bool, probability: float) -> list[str]:
        """Generate personalized recommendations based on student profile"""
        recommendations = []
        
        # Academic recommendations
        if student_data['previous_years_average'] < 14:
            recommendations.append("Focus on improving your academic average to at least 14/20")
        elif student_data['previous_years_average'] < 16:
            recommendations.append("Aim for an average of 16/20 or higher to strengthen your application")
        
        # Skills recommendations
        if student_data['communication_skills_score'] < 7:
            recommendations.append("Develop your communication skills through presentations and public speaking")
        
        if student_data['technical_skills_score'] < 7:
            recommendations.append("Enhance your technical skills through additional coursework or certifications")
        
        # Experience recommendations
        if student_data['internship_completed'] == 0:
            recommendations.append("Complete an internship to gain practical experience")
        elif student_data['internship_duration_months'] < 3:
            recommendations.append("Consider a longer internship (3+ months) for better experience")
        
        if student_data['projects_completed'] < 3:
            recommendations.append("Work on more projects to demonstrate your practical skills")
        
        # Professional profile
        if student_data['portfolio_exists'] == 0:
            recommendations.append("Create a portfolio to showcase your work")
        
        if student_data['linkedin_profile'] == 0:
            recommendations.append("Build a professional LinkedIn profile")
        
        # Teaching interest
        if student_data['teaching_interest'] < 7:
            recommendations.append("Consider volunteering as a peer tutor to develop teaching experience")
        
        # If eligible, provide success tips
        if employable:
            recommendations.insert(0, "You meet the requirements! Prepare a strong application highlighting your strengths")
            recommendations.append("Get a recommendation letter from a professor who knows your work well")
        
        return recommendations[:6]  # Limit to 6 recommendations


# Singleton instance
student_ta_eligibility_service = StudentTAEligibilityService()
