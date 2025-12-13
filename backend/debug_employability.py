import pickle
import sys

try:
    with open('app/models/employability_model(obj6).pkl', 'rb') as f:
        model = pickle.load(f)
    
    print("Model loaded successfully!")
    print(f"Model type: {type(model)}")
    
    if isinstance(model, dict):
        print(f"\nModel keys: {list(model.keys())}")
        for key, value in model.items():
            print(f"\n{key}:")
            print(f"  Type: {type(value)}")
            if hasattr(value, 'classes_'):
                print(f"  Classes: {value.classes_}")
            if hasattr(value, 'feature_names_in_'):
                print(f"  Features: {value.feature_names_in_}")
    else:
        print(f"\nDirect model object")
        if hasattr(model, 'classes_'):
            print(f"Classes: {model.classes_}")
        if hasattr(model, 'feature_names_in_'):
            print(f"Features: {model.feature_names_in_}")
            
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
