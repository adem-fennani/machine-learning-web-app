# Backend Tests

This directory contains test scripts for the Stratus ML API endpoints.

## Prerequisites

- Backend server running on `http://localhost:8000`
- Start server: `uvicorn app.main:app --reload`

## Test Files

### API Endpoint Tests

- **`test_api.py`** - General API testing
- **`test_dropout_api.py`** - Dropout risk prediction endpoint
- **`test_dropout_simple.py`** - Simplified dropout prediction test
- **`test_enrollment.py`** - Student enrollment forecast endpoint
- **`test_recommend.py`** - Program recommendation endpoint
- **`test_segmentation.py`** - Student clustering/segmentation endpoint
- **`test_ta_eligibility.py`** - TA eligibility assessment endpoint

### Model Tests

- **`test_model_directly.py`** - Direct model loading and prediction tests
- **`test_encoding.py`** - Data encoding and preprocessing tests

## Running Tests

Run individual test files:

```bash
# From backend directory
python tests/test_dropout_api.py
python tests/test_enrollment.py
python tests/test_recommend.py
# ... etc
```

## Note

These are manual test scripts for development and debugging. For automated testing, consider migrating to pytest framework in the future.
