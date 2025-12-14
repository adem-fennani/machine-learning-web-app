"""Test script for recommendation endpoint"""
import requests
import json

# Sample student data
data = {
    'baccalaureate_score': 15.5,
    'previous_years_average': 14.2,
    'communication_skills_score': 7,
    'technical_skills_score': 8,
    'soft_skills_score': 6,
    'internship_completed': 1,
    'internship_duration_months': 3,
    'projects_completed': 5,
    'portfolio_exists': 1,
    'linkedin_profile': 1,
    'teaching_interest': 4,
    'final_average': 14.8,
    'has_scholarship': 0,
    'origin_governorate': 'Tunis',
    'baccalaureate_type': 'Science',
    'scholarship_status': 'None',
    'campus': 'Ariana',
    'registration_status': 'Registered',
    'english_level': 'B2'
}

print("Testing recommendation endpoint...")
print(f"Request data: {json.dumps(data, indent=2)}\n")

try:
    response = requests.post('http://localhost:8000/api/predict/recommend', json=data)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"Recommended Program: {result['recommended_program']}")
        print(f"Cluster: {result['cluster']}")
        print(f"Confidence: {result['confidence']}")
        print(f"Explanation: {result['explanation']}")
    else:
        print(f"\n❌ ERROR!")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"\n❌ EXCEPTION!")
    print(f"Error: {str(e)}")
