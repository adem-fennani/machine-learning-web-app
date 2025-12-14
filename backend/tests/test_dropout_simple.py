"""
Simple test for dropout API using dropout_cells.py approach with obj1.pkl
"""

import requests
import json

# API endpoint
url = "http://localhost:8000/api/predict/dropout"

# Medium Profile Student test case (same as in training)
student_data = {
    "gender": 0,
    "origin_governorate": "Nabeul",
    "baccalaureate_score": 12.0,
    "baccalaureate_type": "Sciences Exp",
    "previous_years_average": 11.0,
    "communication_skills_score": 7,
    "technical_skills_score": 8,
    "soft_skills_score": 7,
    "projects_completed": 3,
    "internship_completed": 1,
    "internship_duration_months": 2,
    "portfolio_exists": 1,
    "linkedin_profile": 0
}

print("=" * 70)
print("TESTING DROPOUT API WITH dropout_cells.py APPROACH")
print("=" * 70)
print("\nTesting with Medium Profile Student...")

try:
    response = requests.post(url, json=student_data)
    
    if response.status_code == 200:
        result = response.json()
        print("\n✓ API Response:")
        print(f"  Prediction: {result.get('dropout_prediction')}")
        print(f"  Dropout Probability: {result.get('dropout_probability'):.3f} ({result.get('dropout_probability')*100:.2f}%)")
        print(f"  Retention Probability: {result.get('retention_probability'):.3f}")
        print(f"  Confidence: {result.get('confidence')}")
        print(f"  Model Used: {result.get('model_used')}")
        print("\n" + "=" * 70)
    else:
        print(f"\n✗ API Error: {response.status_code}")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"\n✗ Connection Error: {str(e)}")
    print("Make sure the backend server is running on http://localhost:8000")
