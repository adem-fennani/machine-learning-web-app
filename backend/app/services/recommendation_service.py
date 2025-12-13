"""
Program Recommendation Service
Uses ML model with clustering to recommend academic programs based on student profile.
"""

import joblib
import pandas as pd
import numpy as np
from pathlib import Path
from typing import Dict, Any


class ProgramRecommendationService:
    """Service for recommending programs using ML model and rule-based logic."""
    
    def __init__(self):
        """Initialize the service and load the trained model."""
        self.model_path = Path(__file__).parent.parent / "models" / "program_recommendation_model(obj3).pkl"
        self.model_data = None
        self._load_model()
    
    def _load_model(self):
        """Load the trained model, preprocessor, and cluster model."""
        try:
            self.model_data = joblib.load(self.model_path)
            self.model = self.model_data['classifier']
            self.preprocess = self.model_data['preprocess_pipeline']
            self.kmeans = self.model_data['kmeans_model']
            self.scaler_cluster = self.model_data['cluster_scaler']
            self.numeric_features = self.model_data['numeric_features_with_cluster']
            self.categorical_features = self.model_data['categorical_features']
            self.label_encoder = self.model_data.get('label_encoder', None)
            print(f"✅ Program recommendation model loaded successfully")
        except Exception as e:
            raise RuntimeError(f"Failed to load recommendation model: {str(e)}")
    
    def _compute_engineered_features(self, student_data: Dict[str, Any]) -> Dict[str, Any]:
        """Compute engineered features from raw student data."""
        data = student_data.copy()
        
        # Soft skill strength
        data["soft_skill_strength"] = (
            data["soft_skills_score"] + data["communication_skills_score"]
        )
        
        # Technical strength
        data["technical_strength"] = (
            data["technical_skills_score"] + data["projects_completed"]
        )
        
        # Career score
        data["career_score"] = (
            data["internship_completed"] * 2 +
            data["internship_duration_months"] * 0.3 +
            data["portfolio_exists"] * 2 +
            data["linkedin_profile"]
        )
        
        # Academic strength
        data["academic_strength"] = (
            data["baccalaureate_score"] * 0.4 +
            data["previous_years_average"] * 0.6
        )
        
        # Global strength
        data["global_strength"] = (
            data["academic_strength"] +
            data["technical_strength"] +
            data["soft_skill_strength"]
        )
        
        return data
    
    def _predict_cluster(self, student_data: Dict[str, Any]) -> int:
        """Predict student cluster based on profile."""
        # Features used for clustering
        cluster_features = [
            "academic_strength",
            "technical_strength",
            "soft_skill_strength",
            "career_score",
            "global_strength",
            "final_average"
        ]
        
        # Create dataframe with engineered features
        df_temp = pd.DataFrame([student_data])
        X = df_temp[cluster_features]
        
        # Scale using the cluster scaler
        X_scaled = self.scaler_cluster.transform(X)
        
        # Predict cluster
        cluster = self.kmeans.predict(X_scaled)[0]
        return int(cluster)
    
    def predict(self, student_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Recommend a program based on student profile.
        
        Uses rule-based logic combined with clustering for intelligent recommendations.
        """
        # Compute engineered features
        student_data = self._compute_engineered_features(student_data)
        
        # Predict cluster
        cluster = self._predict_cluster(student_data)
        
        # Rule-based recommendation logic (from notebook)
        
        # RULE 1: PREPARATORY
        if (
            student_data["technical_strength"] < 5 and
            student_data["projects_completed"] < 2 and
            student_data["soft_skill_strength"] < 12 and
            student_data["academic_strength"] > 13
        ):
            recommended = "Preparatory"
            explanation = "Faible technique + faible pratique + fort académique → Préparatoire"
            confidence = "High"
        
        # RULE 2: BUSINESS
        elif student_data["soft_skill_strength"] > 15 or cluster == 2:
            recommended = "Business"
            explanation = "Soft skills élevés / cluster orienté carrière → Business"
            confidence = "High" if student_data["soft_skill_strength"] > 15 else "Medium"
        
        # RULE 3: STEM
        elif student_data["technical_strength"] > 10 or cluster == 1:
            recommended = "STEM"
            explanation = "Profil technique ou cluster technique → STEM"
            confidence = "High" if student_data["technical_strength"] > 10 else "Medium"
        
        # FALLBACK: ML MODEL
        else:
            # Prepare input for ML model
            input_df = pd.DataFrame([student_data])
            input_df["cluster"] = cluster
            
            # Ensure correct column order
            input_df = input_df[self.numeric_features + self.categorical_features]
            
            # Transform using preprocessor
            X_transformed = self.preprocess.transform(input_df)
            
            # Predict
            pred = self.model.predict(X_transformed)[0]
            
            # If model uses label encoding, decode
            if self.label_encoder:
                recommended = self.label_encoder.inverse_transform([pred])[0]
            else:
                recommended = pred
            
            explanation = "Prediction du modèle ML (fallback)"
            confidence = "Medium"
        
        # Analyze student profile
        profile_analysis = self._analyze_profile(student_data)
        
        # Get program details
        program_details = self._get_program_details(recommended)
        
        # Get alternative programs
        alternatives = self._get_alternatives(recommended, student_data)
        
        return {
            "recommended_program": recommended,
            "cluster": cluster,
            "explanation": explanation,
            "confidence": confidence,
            "program_details": program_details,
            "student_profile": profile_analysis,
            "alternative_programs": alternatives
        }
    
    def _analyze_profile(self, student_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze student profile strengths and areas for improvement."""
        strengths = []
        improvements = []
        
        # Academic analysis
        if student_data["academic_strength"] >= 15:
            strengths.append(f"Excellent academic performance ({student_data['academic_strength']:.1f}/20)")
        elif student_data["academic_strength"] < 12:
            improvements.append(f"Academic performance needs improvement ({student_data['academic_strength']:.1f}/20)")
        
        # Technical analysis
        if student_data["technical_strength"] >= 12:
            strengths.append(f"Strong technical profile ({student_data['technical_strength']} points)")
        elif student_data["technical_strength"] < 7:
            improvements.append(f"Develop technical skills and complete more projects")
        
        # Soft skills analysis
        if student_data["soft_skill_strength"] >= 15:
            strengths.append(f"Excellent soft skills ({student_data['soft_skill_strength']}/20)")
        elif student_data["soft_skill_strength"] < 10:
            improvements.append(f"Improve communication and soft skills")
        
        # Career readiness
        if student_data["career_score"] >= 8:
            strengths.append(f"Strong career preparation (internships, portfolio, networking)")
        elif student_data["career_score"] < 4:
            improvements.append(f"Build professional profile (internships, portfolio, LinkedIn)")
        
        return {
            "strengths": strengths,
            "areas_for_improvement": improvements
        }
    
    def _get_program_details(self, program: str) -> Dict[str, str]:
        """Get details about the recommended program."""
        details = {
            "STEM": {
                "name": "STEM Programs",
                "description": "Science, Technology, Engineering & Mathematics",
                "examples": "Computer Science, Cybersecurity, Software Engineering, AI & Data Science",
                "best_for": "Students with strong technical skills and project experience"
            },
            "Business": {
                "name": "Business Programs",
                "description": "Business Management & Marketing",
                "examples": "Digital Marketing, Business Management, International Business",
                "best_for": "Students with excellent soft skills and communication abilities"
            },
            "Preparatory": {
                "name": "Preparatory Classes",
                "description": "Foundation courses for advanced studies",
                "examples": "Preparatory Classes for Engineering Schools",
                "best_for": "Students with strong academic background seeking intensive preparation"
            }
        }
        return details.get(program, {})
    
    def _get_alternatives(self, primary: str, student_data: Dict[str, Any]) -> list:
        """Get alternative program recommendations."""
        alternatives = []
        
        if primary == "STEM":
            if student_data["soft_skill_strength"] > 12:
                alternatives.append("Business (if you want to leverage your communication skills)")
            if student_data["academic_strength"] > 14:
                alternatives.append("Preparatory (for more intensive academic training)")
        
        elif primary == "Business":
            if student_data["technical_strength"] > 8:
                alternatives.append("STEM (you have good technical potential)")
            if student_data["academic_strength"] > 15:
                alternatives.append("Preparatory (your academic strength is exceptional)")
        
        elif primary == "Preparatory":
            if student_data["technical_strength"] > 6:
                alternatives.append("STEM (after building practical skills)")
            if student_data["soft_skill_strength"] > 13:
                alternatives.append("Business (your soft skills are a strong asset)")
        
        return alternatives if alternatives else ["Focus on your recommended program"]


# Singleton instance
_recommendation_service_instance = None

def get_recommendation_service() -> ProgramRecommendationService:
    """Get or create the singleton recommendation service instance."""
    global _recommendation_service_instance
    if _recommendation_service_instance is None:
        _recommendation_service_instance = ProgramRecommendationService()
    return _recommendation_service_instance
