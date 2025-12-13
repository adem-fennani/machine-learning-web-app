import pickle
import sys

try:
    with open('app/models/student_clustering_model(obj2).pkl', 'rb') as f:
        model = pickle.load(f)
    
    print("Model loaded successfully!")
    print(f"Model type: {type(model)}")
    
    if isinstance(model, dict):
        print(f"\nModel keys: {list(model.keys())}")
        for key, value in model.items():
            print(f"\n{key}:")
            print(f"  Type: {type(value)}")
            if hasattr(value, 'n_clusters'):
                print(f"  Number of clusters: {value.n_clusters}")
            if hasattr(value, 'cluster_centers_'):
                print(f"  Cluster centers shape: {value.cluster_centers_.shape}")
    else:
        print(f"\nDirect model object: {type(model)}")
        if hasattr(model, 'n_clusters'):
            print(f"Number of clusters: {model.n_clusters}")
        if hasattr(model, 'cluster_centers_'):
            print(f"Cluster centers shape: {model.cluster_centers_.shape}")
    
    # Try to get feature names or other metadata
    if isinstance(model, dict):
        if 'features' in model:
            print(f"\nFeatures: {model['features']}")
        if 'label_encoders' in model:
            print(f"\nLabel encoders: {list(model['label_encoders'].keys())}")
        if 'feature_names' in model:
            print(f"\nFeature names: {model['feature_names']}")
            
except Exception as e:
    print(f"Error loading model: {e}")
    import traceback
    traceback.print_exc()
