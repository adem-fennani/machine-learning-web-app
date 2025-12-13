"""
Student Dropout Risk Prediction Service
Uses machine learning model to predict student dropout risk based on enrollment data.
"""

import joblib
import pandas as pd
from pathlib import Path
from typing import Dict, Any


class DropoutPredictionService:
    """Service for predicting student dropout risk using enrollment/demographic data."""
    
    def __init__(self):
        """Initialize the service and load the trained model."""
        self.model_path = Path(__file__).parent.parent / "models" / "dropout_risk_model(obj1).pkl"
        self.model_data = None
        self._load_model()
    
    def _load_model(self):
        """Load the trained model and preprocessors."""
        try:
            self.model_data = joblib.load(self.model_path)
            self.model = self.model_data['model']
            self.scaler = self.model_data['scaler']
            self.train_columns = self.model_data['train_columns']
            self.numeric_cols = self.model_data['numeric_cols']
            print(f"✅ Dropout prediction model loaded successfully")
        except Exception as e:
            raise RuntimeError(f"Failed to load dropout model: {str(e)}")
    
    def preprocess_input(self, student_data: Dict[str, Any]) -> pd.DataFrame:
        """
        Preprocess student input data to match the training format.
        
        Args:
            student_data: Dictionary containing student enrollment information
            
        Returns:
            DataFrame with preprocessed features matching training format
        """
        # Create DataFrame from input
        df = pd.DataFrame([student_data])
        
        # Handle numeric columns
        for col in self.numeric_cols:
            if col in df.columns:
                df[col] = df[col].astype(float)
        
        # One-hot encode categorical variables
        df_encoded = pd.get_dummies(df, drop_first=True)
        
        # Ensure all training columns exist (add missing with 0)
        for col in self.train_columns:
            if col not in df_encoded.columns:
                df_encoded[col] = 0
        
        # Keep only training columns in the correct order
        df_encoded = df_encoded[self.train_columns]
        
        # Scale numeric features
        numeric_indices = [self.train_columns.index(col) for col in self.numeric_cols if col in self.train_columns]
        if numeric_indices:
            df_encoded.iloc[:, numeric_indices] = self.scaler.transform(df_encoded.iloc[:, numeric_indices])
        
        return df_encoded
    
    def predict(self, student_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Predict student dropout risk probability.
        
        Args:
            student_data: Dictionary containing:
                - gender: int (0=female, 1=male)
                - origin_governorate: str (e.g., "Tunis", "Sfax")
                - baccalaureate_score: float (0-20)
                - baccalaureate_type: str (e.g., "Sciences Exp", "Math", "Letters", "Tech")
                - previous_years_average: float (0-20)
                - communication_skills_score: int (0-10)
                - technical_skills_score: int (0-10)
                - soft_skills_score: int (0-10)
                - projects_completed: int
                - internship_completed: int (0 or 1)
                - internship_duration_months: int
                - portfolio_exists: int (0 or 1)
                - linkedin_profile: int (0 or 1)
        
        Returns:
            Dictionary containing:
                - dropout_prediction: str ("Low Risk", "Medium Risk", "High Risk")
                - dropout_probability: float (0-1)
                - retention_probability: float (0-1)
                - confidence: str ("High", "Medium", "Low")
                - factors: dict with contributing factors
        """
        # Preprocess the input
        X = self.preprocess_input(student_data)
        
        # Get prediction and probability
        prediction = self.model.predict(X)[0]
        probability = self.model.predict_proba(X)[0]
        
        # Dropout probability (class 1 indicates dropout risk)
        dropout_prob = probability[1] if len(probability) > 1 else probability[0]
        
        # Determine prediction label based on dropout probability
        if dropout_prob < 0.3:
            dropout_prediction = "Low Risk"
        elif dropout_prob < 0.6:
            dropout_prediction = "Medium Risk"
        else:
            dropout_prediction = "High Risk"
        
        # Determine confidence level
        max_prob = max(probability)
        if max_prob >= 0.8:
            confidence = "High"
        elif max_prob >= 0.6:
            confidence = "Medium"
        else:
            confidence = "Low"
        
        # Analyze contributing factors
        factors = self._analyze_factors(student_data, dropout_prob)
        
        return {
            "dropout_prediction": dropout_prediction,
            "dropout_probability": round(float(dropout_prob), 3),
            "retention_probability": round(float(1 - dropout_prob), 3),
            "confidence": confidence,
            "factors": factors
        }
    
    def _analyze_factors(self, student_data: Dict[str, Any], dropout_prob: float) -> Dict[str, Any]:
        """
        Analyze which factors contribute to dropout risk or retention.
        Based on the model's dropout criteria.
        """
        factors = {
            "positive": [],
            "concerns": [],
            "neutral": []
        }
        
        # Previous years average - KEY INDICATOR
        prev_avg = student_data.get("previous_years_average", 0)
        if prev_avg >= 14:
            factors["positive"].append(f"Excellent academic performance ({prev_avg}/20)")
        elif prev_avg >= 10:
            factors["positive"].append(f"Good academic performance ({prev_avg}/20)")
        else:
            factors["concerns"].append(f"Low previous years average ({prev_avg}/20) - High dropout risk")
        
        # Baccalaureate score
        bacc_score = student_data.get("baccalaureate_score", 0)
        if bacc_score >= 14:
            factors["positive"].append(f"Strong baccalaureate score ({bacc_score}/20)")
        elif bacc_score >= 11:
            factors["neutral"].append(f"Adequate baccalaureate score ({bacc_score}/20)")
        else:
            factors["concerns"].append(f"Low baccalaureate score ({bacc_score}/20) - Risk factor")
        
        # Technical skills
        tech_skills = student_data.get("technical_skills_score", 0)
        if tech_skills >= 8:
            factors["positive"].append(f"Strong technical skills ({tech_skills}/10)")
        elif tech_skills > 6:
            factors["neutral"].append(f"Adequate technical skills ({tech_skills}/10)")
        else:
            factors["concerns"].append(f"Weak technical skills ({tech_skills}/10) - Needs improvement")
        
        # Communication skills
        comm_skills = student_data.get("communication_skills_score", 0)
        if comm_skills >= 8:
            factors["positive"].append(f"Strong communication skills ({comm_skills}/10)")
        elif comm_skills > 5:
            factors["neutral"].append(f"Adequate communication skills ({comm_skills}/10)")
        else:
            factors["concerns"].append(f"Weak communication skills ({comm_skills}/10) - Risk factor")
        
        # Soft skills
        soft_skills = student_data.get("soft_skills_score", 0)
        if soft_skills >= 8:
            factors["positive"].append(f"Strong soft skills ({soft_skills}/10)")
        elif soft_skills > 6:
            factors["neutral"].append(f"Adequate soft skills ({soft_skills}/10)")
        else:
            factors["concerns"].append(f"Weak soft skills ({soft_skills}/10) - Risk factor")
        
        # Projects
        projects = student_data.get("projects_completed", 0)
        if projects >= 4:
            factors["positive"].append(f"Good project portfolio ({projects} projects)")
        elif projects > 1:
            factors["neutral"].append(f"Some projects completed ({projects})")
        else:
            factors["concerns"].append(f"Few projects completed ({projects}) - Risk factor")
        
        # Internship
        internship = student_data.get("internship_completed", 0)
        duration = student_data.get("internship_duration_months", 0)
        if internship == 1 and duration >= 3:
            factors["positive"].append(f"Completed internship ({duration} months)")
        elif internship == 1:
            factors["neutral"].append(f"Short internship ({duration} months)")
        else:
            factors["concerns"].append("No internship completed - Risk factor")
        
        # Portfolio
        portfolio = student_data.get("portfolio_exists", 0)
        if portfolio == 1:
            factors["positive"].append("Has professional portfolio")
        else:
            factors["concerns"].append("No portfolio - Risk factor")
        
        # LinkedIn
        linkedin = student_data.get("linkedin_profile", 0)
        if linkedin == 1:
            factors["positive"].append("Active LinkedIn profile")
        else:
            factors["concerns"].append("No LinkedIn profile - Risk factor")
        
        return factors


# Singleton instance
_dropout_service_instance = None

def get_dropout_service() -> DropoutPredictionService:
    """Get or create the singleton dropout prediction service instance."""
    global _dropout_service_instance
    if _dropout_service_instance is None:
        _dropout_service_instance = DropoutPredictionService()
    return _dropout_service_instance
