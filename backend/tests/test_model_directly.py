"""
Direct test of obj1.pkl model using the dropout_cells.py approach
"""

import joblib
import pandas as pd
from pathlib import Path

# Load model
model_path = Path("app/models/obj1.pkl")
print(f"Loading model from: {model_path}")
model_package = joblib.load(model_path)

model = model_package["model"]
scaler = model_package["scaler"]
train_columns = model_package["train_columns"]
numeric_columns = model_package["numeric_columns"]

print(f"Model loaded: {type(model).__name__}")
print(f"Numeric columns: {numeric_columns}")
print(f"Train columns count: {len(train_columns)}")

# Medium Profile Student test case
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

print("\n" + "="*70)
print("TESTING MEDIUM PROFILE STUDENT")
print("="*70)

# Convert input to DataFrame
df = pd.DataFrame([student_data])
print(f"\n1. Input DataFrame shape: {df.shape}")
print(f"   Columns: {list(df.columns)}")

# Ensure categorical columns are strings for proper one-hot encoding
df['gender'] = df['gender'].astype(str)
df['origin_governorate'] = df['origin_governorate'].astype(str)
df['baccalaureate_type'] = df['baccalaureate_type'].astype(str)
print(f"\n2. Converted categoricals to strings")

# Scale numeric features
df[numeric_columns] = scaler.transform(df[numeric_columns])
print(f"\n3. After scaling numeric features")
print(f"   Scaled columns: {numeric_columns}")

# One-hot encoding
df_encoded = pd.get_dummies(df, drop_first=True)
print(f"\n4. After one-hot encoding: {df_encoded.shape}")
print(f"   Encoded columns count: {len(df_encoded.columns)}")

# Align columns with training
df_aligned = df_encoded.reindex(columns=train_columns, fill_value=0)
print(f"\n5. After alignment: {df_aligned.shape}")
print(f"   Final shape matches training columns: {df_aligned.shape[1] == len(train_columns)}")

# Prediction
prediction = model.predict(df_aligned)[0]
probability = model.predict_proba(df_aligned)[0][1]

print("\n" + "="*70)
print("PREDICTION RESULTS")
print("="*70)
print(f"Prediction: {prediction}")
print(f"Dropout Probability: {probability:.4f} ({probability*100:.2f}%)")
print(f"Retention Probability: {1-probability:.4f} ({(1-probability)*100:.2f}%)")

# Determine risk level
if probability >= 0.7:
    risk = "High Risk"
elif probability >= 0.4:
    risk = "Medium Risk"
else:
    risk = "Low Risk"

print(f"Risk Level: {risk}")
print("="*70)
