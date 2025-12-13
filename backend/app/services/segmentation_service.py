import pickle
import pandas as pd
import numpy as np
from pathlib import Path
import logging

logger = logging.getLogger(__name__)

class SegmentationService:
    _instance = None
    _initialized = False
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SegmentationService, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not self._initialized:
            self._load_models()
            self._initialized = True
    
    def _load_models(self):
        """Load the clustering model components"""
        try:
            model_path = Path(__file__).parent.parent / "models" / "student_clustering_model(obj2).pkl"
            
            # Since the pickle file appears to be corrupted, we'll create the model structure
            # based on the notebook code. In production, you should re-save the model properly.
            logger.warning(f"Model file at {model_path} may be corrupted. Using fallback model structure.")
            
            # For now, create dummy components that match the expected structure
            # TODO: Re-save the model from the notebook using pickle.dump()
            from sklearn.cluster import KMeans
            from sklearn.preprocessing import StandardScaler, LabelEncoder
            
            self.kmeans_model = None  # Will be loaded when model is fixed
            self.scaler = None
            self.governorate_encoder = None
            self.program_encoder = None
            
            # Cluster interpretations from the notebook
            self.cluster_interpretations = {
                0: "Middle Tier / Partial Scholarship",
                1: "Low Academic Level / Self-Funded",
                2: "High Performer / High Scholarship Access"
            }
            
            # Cluster characteristics (based on typical patterns)
            self.cluster_characteristics = {
                0: {
                    "typical_bac_score_range": "12-15",
                    "common_scholarship": "Partial Scholarship",
                    "description": "Students with moderate academic performance, typically receiving partial financial support"
                },
                1: {
                    "typical_bac_score_range": "10-12",
                    "common_scholarship": "Self-Funded",
                    "description": "Students with lower academic scores, generally self-funded or minimal scholarship support"
                },
                2: {
                    "typical_bac_score_range": "15-20",
                    "common_scholarship": "Full Scholarship",
                    "description": "High-achieving students with strong academic records, often receiving full scholarships"
                }
            }
            
            logger.info("Segmentation model components initialized (fallback mode)")
            
        except Exception as e:
            logger.error(f"Error loading segmentation model: {e}")
            raise
    
    def _encode_scholarship(self, status: str) -> dict:
        """One-hot encode scholarship status"""
        return {
            "scholarship_status_Full Scholarship": 1 if status == "Full Scholarship" else 0,
            "scholarship_status_Partial Scholarship": 1 if status == "Partial Scholarship" else 0,
            "scholarship_status_Self-Funded": 1 if status == "Self-Funded" else 0
        }
    
    def _predict_cluster_fallback(self, bac_score: float, scholarship_status: str) -> int:
        """
        Fallback prediction logic based on observed patterns from notebook
        This is a temporary solution until the model file is fixed
        """
        # Rule-based cluster assignment based on baccalaureate score and scholarship
        if bac_score >= 15 and scholarship_status == "Full Scholarship":
            return 2  # High Performer
        elif bac_score < 12 or scholarship_status == "Self-Funded":
            return 1  # Low Academic Level / Self-Funded
        else:
            return 0  # Middle Tier
    
    def segment_student(
        self,
        baccalaureate_score: float,
        scholarship_status: str,
        origin_governorate: str,
        chosen_program: str
    ) -> dict:
        """
        Segment a student into one of three clusters
        
        Returns:
            dict with cluster, cluster_name, and cluster_characteristics
        """
        try:
            # Validate scholarship status
            valid_statuses = ["Full Scholarship", "Partial Scholarship", "Self-Funded"]
            if scholarship_status not in valid_statuses:
                raise ValueError(f"Invalid scholarship_status. Must be one of: {valid_statuses}")
            
            # TODO: Once model is fixed, use actual model prediction
            # For now, use fallback rule-based logic
            cluster = self._predict_cluster_fallback(baccalaureate_score, scholarship_status)
            
            logger.info(f"Student segmented into cluster {cluster}: {self.cluster_interpretations[cluster]}")
            
            return {
                "cluster": cluster,
                "cluster_name": self.cluster_interpretations[cluster],
                "cluster_characteristics": self.cluster_characteristics[cluster]
            }
            
        except Exception as e:
            logger.error(f"Error in student segmentation: {e}")
            raise


# Singleton instance
segmentation_service = SegmentationService()
