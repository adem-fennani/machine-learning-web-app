import requests

# Test case: Medium Profile Student (from training script)
test_student = {
    "gender": 0,  # Female
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
    "linkedin_profile": 1
}

print("=" * 70)
print("TESTING API WITH FRESHLY TRAINED MODEL")
print("=" * 70)

try:
    response = requests.post(
        "http://localhost:8000/api/predict/dropout",
        json=test_student
    )
    
    if response.status_code == 200:
        result = response.json()
        print(f"\nAPI Response:")
        print(f"  Prediction: {result['dropout_prediction']}")
        print(f"  Dropout Probability: {result['dropout_probability']:.3f} ({result['dropout_probability']*100:.2f}%)")
        print(f"  Retention Probability: {result['retention_probability']:.3f}")
        print(f"  Confidence: {result['confidence']}")
        
        print(f"\n" + "=" * 70)
        print("COMPARISON")
        print("=" * 70)
        print(f"Training script output: 23.08%")
        print(f"API response: {result['dropout_probability']*100:.2f}%")
        
        if abs(result['dropout_probability']*100 - 23.08) < 1:
            print("\n✓ SUCCESS! API matches training script perfectly!")
        else:
            print(f"\n✗ Mismatch detected")
            print(f"  Difference: {abs(result['dropout_probability']*100 - 23.08):.2f}%")
    else:
        print(f"ERROR: {response.status_code}")
        print(response.text)
        
except Exception as e:
    print(f"ERROR: {e}")
