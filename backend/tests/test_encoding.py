"""
Check what happens with categorical encoding
"""

import pandas as pd

student_data = {
    "gender": 0,
    "origin_governorate": "Nabeul",
    "baccalaureate_score": 12.0,
    "baccalaureate_type": "Sciences Exp",
}

df = pd.DataFrame([student_data])

print("BEFORE converting to string:")
print(df.dtypes)
print("\nOne-hot with drop_first=True:")
encoded1 = pd.get_dummies(df, drop_first=True)
print(f"Columns: {list(encoded1.columns)}")

print("\n" + "="*70)

df['gender'] = df['gender'].astype(str)
df['origin_governorate'] = df['origin_governorate'].astype(str)
df['baccalaureate_type'] = df['baccalaureate_type'].astype(str)

print("\nAFTER converting to string:")
print(df.dtypes)
print("\nOne-hot with drop_first=True:")
encoded2 = pd.get_dummies(df, drop_first=True)
print(f"Columns: {list(encoded2.columns)}")
