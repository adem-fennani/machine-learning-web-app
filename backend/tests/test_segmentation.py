import requests
import json

# Test endpoint
url = "http://localhost:8000/api/student/segment"

# Test cases from the user's examples
test_students = [
    {
        "name": "Elite AI Candidate",
        "baccalaureate_score": 18.5,
        "scholarship_status": "Full Scholarship",
        "origin_governorate": "Tunis",
        "chosen_program": "Cybersecurity"
    },
    {
        "name": "Strong Tech Profile",
        "baccalaureate_score": 14.5,
        "scholarship_status": "Partial Scholarship",
        "origin_governorate": "Sousse",
        "chosen_program": "Preparatory Classes"
    },
    {
        "name": "Business-Oriented",
        "baccalaureate_score": 11.0,
        "scholarship_status": "Partial Scholarship",
        "origin_governorate": "Nabeul",
        "chosen_program": "Civil Engineering"
    },
    {
        "name": "Low Academic Level",
        "baccalaureate_score": 10.1,
        "scholarship_status": "Self-Funded",
        "origin_governorate": "Gafsa",
        "chosen_program": "Business Management"
    }
]

print("\n" + "="*70)
print("STUDENT SEGMENTATION API TEST")
print("="*70)

for student in test_students:
    name = student.pop("name")
    
    print(f"\n{'-'*70}")
    print(f"Testing: {name}")
    print(f"{'-'*70}")
    
    try:
        response = requests.post(url, json=student)
        
        if response.status_code == 200:
            result = response.json()
            print(f"✓ Status: {response.status_code} OK")
            print(f"\nStudent Profile:")
            print(f"  • Baccalaureate Score: {result['baccalaureate_score']}")
            print(f"  • Scholarship Status: {result['scholarship_status']}")
            print(f"  • Origin Governorate: {result['origin_governorate']}")
            print(f"  • Chosen Program: {result['chosen_program']}")
            print(f"\nSegmentation Result:")
            print(f"  • Cluster: {result['cluster']}")
            print(f"  • Classification: {result['cluster_name']}")
            print(f"\nCluster Characteristics:")
            chars = result['cluster_characteristics']
            print(f"  • Typical Bac Score Range: {chars['typical_bac_score_range']}")
            print(f"  • Common Scholarship: {chars['common_scholarship']}")
            print(f"  • Description: {chars['description']}")
        else:
            print(f"✗ Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("✗ Connection Error: Make sure the backend server is running")
        print("  Run: cd backend && uvicorn app.main:app --reload")
        break
    except Exception as e:
        print(f"✗ Error: {e}")

print(f"\n{'='*70}\n")
