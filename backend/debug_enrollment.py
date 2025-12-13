"""Debug script to check enrollment forecast model structure"""
import joblib
from pathlib import Path

model_path = Path(__file__).parent / "app" / "models" / "student_enrollment_forecast_model(obj4).pkl"

print("Loading enrollment forecast model...")
try:
    model_data = joblib.load(model_path)
    
    print("\n✅ Model loaded successfully!")
    print("\nModel keys:")
    for key in model_data.keys():
        print(f"  - {key}")
    
    if 'features' in model_data:
        print(f"\nFeatures: {model_data['features']}")
    
    if 'model_type' in model_data:
        print(f"\nModel Type: {model_data['model_type']}")
        
    if 'notes' in model_data:
        print(f"\nNotes: {model_data['notes']}")
        
except Exception as e:
    print(f"\n❌ Error loading model: {e}")
    import traceback
    traceback.print_exc()
