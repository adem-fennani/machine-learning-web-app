import requests

url = "http://localhost:8000/api/admin/eligibility"

print("\n" + "="*70)
print("TA ELIGIBILITY PREDICTION TEST")
print("="*70)

try:
    response = requests.get(url)
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✓ Status: {response.status_code} OK\n")
        print("="*70)
        print(" EMPLOYABILITY PREDICTION RESULTS")
        print("="*70)
        print(f"Total students                 : {result['total_students']}")
        print(f"Predicted employable students  : {result['employable_students']}")
        print(f"Employability rate             : {result['employability_rate']:.2f}%")
        print(f"\nMessage: {result['message']}")
        print("="*70)
    else:
        print(f"✗ Error: {response.status_code}")
        print(f"Response: {response.text}")
        
except requests.exceptions.ConnectionError:
    print("✗ Connection Error: Make sure the backend server is running")
    print("  Run: cd backend && uvicorn app.main:app --reload")
except Exception as e:
    print(f"✗ Error: {e}")

print()
