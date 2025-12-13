"""Debug script to check model structure"""
import joblib
from pathlib import Path

model_path = Path(__file__).parent / "app" / "models" / "program_recommendation_model(obj3).pkl"

print("Loading model...")
model_data = joblib.load(model_path)

print("\nModel keys:")
for key in model_data.keys():
    print(f"  - {key}")

print("\nNumeric features:")
print(model_data['numeric_features_with_cluster'])

print("\nCategorical features:")
print(model_data['categorical_features'])

print("\nPreprocessor steps:")
if hasattr(model_data['preprocess'], 'transformers_'):
    for name, transformer, columns in model_data['preprocess'].transformers_:
        print(f"  {name}: {columns}")
