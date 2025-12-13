"""Enrollment Forecast Service"""

import joblib
import numpy as np
from pathlib import Path
from typing import Dict, Any, List


_service_instance = None


def get_enrollment_service():
    """Get or create enrollment service singleton."""
    global _service_instance
    if _service_instance is None:
        _service_instance = EnrollmentForecastService()
    return _service_instance


class EnrollmentForecastService:
    """Service for forecasting student enrollment using time series model."""
    
    def __init__(self):
        """Initialize the service and load the trained model."""
        self.model_path = Path(__file__).parent.parent / "models" / "student_enrollment_forecast_model(obj4).pkl"
        self.model_data = None
        self._load_model()
    
    def _load_model(self):
        """Load the trained time series model."""
        try:
            self.model_data = joblib.load(self.model_path)
            self.model = self.model_data['model']
            self.model_type = self.model_data['model_type']
            self.train_years = self.model_data['train_years']
            self.metrics = self.model_data.get('metrics', {})
            print(f"✅ Enrollment forecast model loaded: {self.model_type}")
        except Exception as e:
            raise RuntimeError(f"Failed to load enrollment model: {str(e)}")
    
    def forecast(self, years_ahead: int = 5) -> Dict[str, Any]:
        """Generate enrollment forecast for specified years."""
        # Get the last training year
        last_year = max(self.train_years)
        
        # Generate future years
        future_years = np.array([last_year + i for i in range(1, years_ahead + 1)])
        
        # Create polynomial features for prediction
        X_future = future_years.reshape(-1, 1)
        
        # Predict enrollments
        predictions = self.model.predict(X_future)
        
        # Round to integers (can't have fractional students)
        predictions = np.round(predictions).astype(int)
        
        # Ensure non-negative predictions
        predictions = np.maximum(predictions, 0)
        
        # Build forecast list with trends
        forecasts = []
        for i, (year, enrollment) in enumerate(zip(future_years, predictions)):
            # Determine trend
            if i == 0:
                trend = "stable"
            else:
                prev_enrollment = predictions[i-1]
                diff_pct = ((enrollment - prev_enrollment) / prev_enrollment) * 100
                if diff_pct > 2:
                    trend = "increasing"
                elif diff_pct < -2:
                    trend = "decreasing"
                else:
                    trend = "stable"
            
            forecasts.append({
                "year": int(year),
                "predicted_enrollment": int(enrollment),
                "trend": trend
            })
        
        # Calculate overall statistics
        first_prediction = predictions[0]
        last_prediction = predictions[-1]
        total_growth = ((last_prediction - first_prediction) / first_prediction) * 100 if first_prediction > 0 else 0
        average_enrollment = int(np.mean(predictions))
        
        # Generate trend description
        if total_growth > 10:
            trend_desc = f"Strong growth trend: enrollment expected to increase by {total_growth:.1f}% over the next {years_ahead} years."
        elif total_growth > 2:
            trend_desc = f"Moderate growth trend: enrollment expected to increase by {total_growth:.1f}% over the next {years_ahead} years."
        elif total_growth < -10:
            trend_desc = f"Declining trend: enrollment expected to decrease by {abs(total_growth):.1f}% over the next {years_ahead} years."
        elif total_growth < -2:
            trend_desc = f"Slight decline: enrollment expected to decrease by {abs(total_growth):.1f}% over the next {years_ahead} years."
        else:
            trend_desc = f"Stable enrollment: minimal change ({total_growth:+.1f}%) expected over the next {years_ahead} years."
        
        return {
            "forecasts": forecasts,
            "total_growth": round(total_growth, 2),
            "average_enrollment": average_enrollment,
            "trend_description": trend_desc,
            "model_info": {
                "model_type": self.model_type,
                "training_period": f"{min(self.train_years)}-{max(self.train_years)}",
                "metrics": self.metrics
            }
        }
