"""Test enrollment forecast endpoint"""
import requests
import json

print("Testing enrollment forecast endpoint...")

# Test with 5 years forecast
data = {"years_ahead": 5}

print(f"\nRequest: {json.dumps(data, indent=2)}\n")

try:
    response = requests.post('http://localhost:8000/api/admin/forecast', json=data)
    print(f"Status Code: {response.status_code}")
    
    if response.status_code == 200:
        result = response.json()
        print(f"\n✅ SUCCESS!")
        print(f"\nTrend: {result['trend_description']}")
        print(f"Total Growth: {result['total_growth']}%")
        print(f"Average Enrollment: {result['average_enrollment']}")
        print(f"\nYearly Forecasts:")
        for forecast in result['forecasts']:
            print(f"  {forecast['year']}: {forecast['predicted_enrollment']:,} students ({forecast['trend']})")
    else:
        print(f"\n❌ ERROR!")
        print(f"Response: {response.text}")
        
except Exception as e:
    print(f"\n❌ EXCEPTION!")
    print(f"Error: {str(e)}")
