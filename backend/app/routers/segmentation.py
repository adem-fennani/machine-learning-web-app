from fastapi import APIRouter, HTTPException
from app.schemas.segmentation import SegmentationRequest, SegmentationResponse
from app.services.segmentation_service import segmentation_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/segment", response_model=SegmentationResponse)
async def segment_student(request: SegmentationRequest):
    """
    Segment a student into financial/academic cluster
    
    Uses K-Means clustering with 3 clusters:
    - Cluster 0: Middle Tier / Partial Scholarship
    - Cluster 1: Low Academic Level / Self-Funded
    - Cluster 2: High Performer / High Scholarship Access
    
    Features considered:
    - Baccalaureate score (0-20)
    - Scholarship status (Full/Partial/Self-Funded)
    - Origin governorate
    - Chosen academic program
    """
    try:
        logger.info(f"Segmentation request - Score: {request.baccalaureate_score}, "
                   f"Scholarship: {request.scholarship_status}, "
                   f"Governorate: {request.origin_governorate}, "
                   f"Program: {request.chosen_program}")
        
        # Perform segmentation
        result = segmentation_service.segment_student(
            baccalaureate_score=request.baccalaureate_score,
            scholarship_status=request.scholarship_status,
            origin_governorate=request.origin_governorate,
            chosen_program=request.chosen_program
        )
        
        response = SegmentationResponse(
            cluster=result["cluster"],
            cluster_name=result["cluster_name"],
            scholarship_status=request.scholarship_status,
            baccalaureate_score=request.baccalaureate_score,
            origin_governorate=request.origin_governorate,
            chosen_program=request.chosen_program,
            cluster_characteristics=result["cluster_characteristics"]
        )
        
        logger.info(f"Segmentation successful - Cluster: {result['cluster']} ({result['cluster_name']})")
        
        return response
        
    except ValueError as e:
        logger.error(f"Validation error in segmentation: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error in segmentation endpoint: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail="Internal server error during segmentation")
