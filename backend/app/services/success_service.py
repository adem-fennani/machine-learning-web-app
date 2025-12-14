"""
Student Success Prediction Service
Uses Random Forest model to predict student success based on enrollment data.
"""

import joblib
import pandas as pd
from pathlib import Path
from typing import Dict, Any


class SuccessPredictionService:
    """Service for predicting student success using enrollment/demographic data."""
    
    def __init__(self):
        """Initialize the service and load the trained model."""
        self.model_path = Path(__file__).parent.parent / "models" / "student_success_model.pkl"
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
            print(f"Success prediction model loaded: Random Forest")
        except Exception as e:
            raise RuntimeError(f"Failed to load success model: {str(e)}")
    
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
        Predict student success probability.
        
        Args:
            student_data: Dictionary containing:
                - gender: int (0=female, 1=male)
                - age: int
                - origin_governorate: str (e.g., "Tunis", "Sfax")
                - baccalaureate_score: float (0-20)
                - baccalaureate_type: str (e.g., "Sciences", "Math", "Letters", "Tech")
                - enrollment_year: int (e.g., 2024)
                - scholarship_status: str ("Full Scholarship", "Partial Scholarship", "Self-Funded")
                - campus: str ("Tunis Main", "Monastir")
                - registration_status: str (e.g., "ACTIVE", "DUPLICATE_ENTRY")
        
        Returns:
            Dictionary containing:
                - success_prediction: str ("Likely to Succeed" or "At Risk")
                - success_probability: float (0-1)
                - confidence: str ("High", "Medium", "Low")
                - factors: dict with contributing factors
        """
        # Preprocess the input
        X = self.preprocess_input(student_data)
        
        # Get prediction and probability
        prediction = self.model.predict(X)[0]
        probability = self.model.predict_proba(X)[0]
        
        # Success probability (class 1)
        success_prob = probability[1] if len(probability) > 1 else probability[0]
        
        # Determine prediction label
        success_prediction = "Likely to Succeed" if prediction == 1 else "At Risk"
        
        # Determine confidence level
        max_prob = max(probability)
        
        # Debug output
        print(f"Probabilities: [risk={probability[0]:.3f}, success={probability[1]:.3f}]")
        print(f"Max probability: {max_prob:.3f}")
        
        if max_prob >= 0.8:
            confidence = "High"
        elif max_prob >= 0.6:
            confidence = "Medium"
        else:
            confidence = "Low"
        
        print(f"Confidence: {confidence}")
        
        # Analyze contributing factors
        factors = self._analyze_factors(student_data, success_prob)
        
        return {
            "success_prediction": success_prediction,
            "success_probability": round(float(success_prob), 3),
            "risk_probability": round(float(1 - success_prob), 3),
            "confidence": confidence,
            "factors": factors
        }
    
    def _analyze_factors(self, student_data: Dict[str, Any], success_prob: float) -> Dict[str, Any]:
        """
        Analyze which factors contribute to success/risk.
        
        Note: The model predicts High_Performer based on final_average >= 12.
        In the training data, final_average ≈ baccalaureate_score * 0.9 + noise.
        This means a bacc score of ~13.3+ is needed for high performance.
        """
        factors = {
            "positive": [],
            "concerns": [],
            "neutral": []
        }
        
        # Academic strength - adjusted thresholds based on model training
        bacc_score = student_data.get("baccalaureate_score", 0)
        if bacc_score >= 16:
            factors["positive"].append(f"Excellent baccalaureate score ({bacc_score}/20) - Strong predictor of success")
        elif bacc_score >= 14:
            factors["positive"].append(f"Very good baccalaureate score ({bacc_score}/20) - Above success threshold")
        elif bacc_score >= 13.3:
            factors["positive"].append(f"Good baccalaureate score ({bacc_score}/20) - Meets success threshold")
        elif bacc_score >= 12:
            factors["concerns"].append(f"Baccalaureate score ({bacc_score}/20) - Below typical success threshold (13.3+)")
        elif bacc_score >= 10:
            factors["concerns"].append(f"Low baccalaureate score ({bacc_score}/20) - Significant risk factor")
        else:
            factors["concerns"].append(f"Very low baccalaureate score ({bacc_score}/20) - High risk")
        
        # Scholarship status
        scholarship = student_data.get("scholarship_status", "")
        if scholarship == "Full Scholarship":
            factors["positive"].append("Full scholarship support")
        elif scholarship == "Partial Scholarship":
            factors["neutral"].append("Partial scholarship")
        else:
            factors["concerns"].append("Self-funded (no scholarship)")
        
        # Baccalaureate type
        bacc_type = student_data.get("baccalaureate_type", "")
        if bacc_type in ["Sciences", "Math"]:
            factors["positive"].append(f"Strong academic background ({bacc_type})")
        
        # Age factor
        age = student_data.get("age", 0)
        if age <= 20:
            factors["positive"].append("Typical enrollment age")
        elif age > 25:
            factors["concerns"].append("Non-traditional student age")
        
        # Campus
        campus = student_data.get("campus", "")
        if campus:
            factors["neutral"].append(f"Campus: {campus}")
        
        return factors


# Singleton instance
_success_service_instance = None

def get_success_service() -> SuccessPredictionService:
    """Get or create the singleton success prediction service instance."""
    global _success_service_instance
    if _success_service_instance is None:
        _success_service_instance = SuccessPredictionService()
    return _success_service_instance
