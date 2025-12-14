# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.2] - 2025-12-14

### Fixed
- **Dropout Prediction Model**: Updated to new simplified model structure
  - Removed categorical encoding dependencies (gender, governorate, baccalaureate type)
  - Model now uses 8 numeric features only
  - Fixed pickle serialization issues (removed custom temperature_scale function)
  - Updated preprocessing pipeline to match new model format
  - Improved model loading with version and performance metadata display
  - Model achieves 92% ROC-AUC score

### Changed
- Dropout service backend updated to work with new model structure
- Features list: baccalaureate_score, previous_years_average, communication_skills_score, technical_skills_score, soft_skills_score, projects_completed, internship_completed, internship_duration_months

## [0.7.1] - 2025-12-14

### Added
- Dynamic confidence-based color coding for Success Prediction results
  - Entire result section changes color based on confidence level
  - High confidence: Green gradient (green-500 to green-600)
  - Medium confidence: Orange gradient (orange-500 to orange-600)
  - Low confidence: Red gradient (red-500 to red-600)
- Debug output for success prediction probability analysis

### Changed
- Updated Success Prediction UI (`/admin/performance`) with confidence-based styling
- Enhanced visual feedback for prediction reliability

### Fixed
- Improved confidence level calculation clarity with debug logging

## [0.7.0] - 2025-12-13

### Added
- **Student TA Eligibility Checker**: Individual student assessment for TA positions
  - POST `/api/student/ta-check` endpoint for personalized eligibility predictions
  - 11-field input form with academic, skills, experience, and profile data
  - Beautiful UI with grouped sections and enhanced design
  - Personalized recommendations based on student weaknesses
  - 70% threshold scoring system with animated progress display

### Changed
- Updated Student Portal with TA Eligibility Checker feature (4th card)
- API version updated to 0.7.0

### Fixed
- NaN errors in number inputs with fallback values

## [0.6.0] - 2025-12-13

### Added
- **Student Segmentation System**: K-Means clustering for student academic/financial profiling
  - POST `/api/student/segment` endpoint for individual student segmentation
  - 3-cluster model: High Performer, Middle Tier, Low Academic Level
  - Features: baccalaureate score, scholarship status, governorate, chosen program
  - Cluster interpretations with typical score ranges and scholarship patterns
  - Personalized recommendations based on cluster assignment
- **Student Segmentation UI**: Interactive profile analysis form
  - 4-field input form: bac score (0-20), scholarship status, governorate, program
  - Color-coded cluster badges (Green: High, Blue: Middle, Orange: Low)
  - Profile summary displaying all student inputs
  - Cluster characteristics with typical ranges and common patterns
  - Personalized guidance messages for academic improvement
- **Backend Services**: Student segmentation infrastructure
  - `segmentation_service.py`: K-Means clustering with fallback rule-based logic
  - Cluster 0: Middle Tier / Partial Scholarship (12-15 bac score)
  - Cluster 1: Low Academic Level / Self-Funded (10-12 bac score)
  - Cluster 2: High Performer / High Scholarship Access (15-20 bac score)
  - `segmentation.py` schema: Request/Response models with validation
  - `segmentation.py` router: Student API endpoint under `/api/student` prefix

### Changed
- **Portal Reorganization**: Moved features between student and admin portals
  - Moved TA Eligibility from `/student/ta-eligibility` to `/admin/ta-eligibility`
  - Moved Segmentation from `/admin/segmentation` to `/student/segmentation`
  - Updated Student Portal cards: Dropout Risk, Program Recommender, Segmentation
  - Updated Admin Portal cards: TA Eligibility Review, Enrollment Forecasting, Performance Prediction
- Updated API version from 0.5.0 to 0.6.0 in main.py
- Added segmentation router under `/api/student` prefix
- Enhanced student portal with clustering-based profile analysis

## [0.5.0] - 2025-12-13

### Added
- **Enrollment Forecasting System**: Time series ML predictions for institutional planning
  - Polynomial regression (degree=2) model for enrollment trends
  - POST `/api/admin/forecast` endpoint with configurable forecast period (1-10 years)
  - Trend classification: increasing (>2% growth), decreasing (<-2% decline), stable
  - Growth statistics: total growth percentage, average enrollment, trend description
- **Enrollment Forecast Features**: Comprehensive prediction capabilities
  - Year-by-year enrollment predictions with trend indicators
  - Total growth percentage calculation across forecast period
  - Average enrollment computation for planning purposes
  - Model metadata: training period, model type, performance metrics
- **Resource Planning Calculations**: Automated institutional resource projections
  - Classroom requirements (30 students per classroom)
  - Faculty staffing needs (25:1 student-faculty ratio)
  - Housing unit projections (60% of students need housing)
  - Scholarship budget planning (25% financial aid recipients)
- **Enrollment Forecast UI**: Interactive admin dashboard for enrollment planning
  - Year selector input (1-10 years ahead) with real-time validation
  - Line chart visualization using recharts library
  - Forecast summary card: first year, final year, total growth, average enrollment
  - Resource planning card: classrooms, faculty, housing, scholarships
  - Year-by-year breakdown table with trend icons and percentage changes
  - Loading states and error handling for API requests
- **Backend Services**: Enrollment forecast infrastructure
  - `enrollment_service.py`: Polynomial regression forecasting with singleton pattern
  - Trend calculation logic: compares year-over-year growth rates
  - Growth statistics: percentage change from first to last year
  - `enrollment.py` schema: Pydantic models with protected namespace configuration
  - `enrollment.py` router: Admin API endpoint with detailed logging

### Changed
- Updated API version from 0.3.0 to 0.5.0 in main.py
- Enhanced admin portal with enrollment forecasting feature
- Added enrollment router under `/api/admin` prefix
- Fixed JSX structure issues in enrollment page component

## [0.4.0] - 2025-12-13

### Added
- **Program Recommendation System**: AI-powered academic program recommendations
  - Hybrid ML model combining clustering, rule-based logic, and XGBoost classifier
  - POST `/api/predict/recommend` endpoint with 19 comprehensive features
  - KMeans clustering (3 clusters) for student segmentation
  - Intelligent program selection: STEM, Business, or Preparatory
  - Confidence scoring: High/Medium/Low based on prediction strength
- **Program Recommendation Features**: Complete student academic profile
  - Academic metrics: baccalaureate score, previous years average, final average
  - Skills assessment: communication, technical, and soft skills (0-10 scale)
  - Career metrics: teaching interest, projects completed, internship duration
  - Professional development: portfolio, LinkedIn profile, internship completion
  - Educational context: governorate, baccalaureate type, campus, English level
  - Scholarship information: status and availability
- **Program Recommendation UI**: Comprehensive 19-field form interface
  - Academic score inputs with validation (0-20 scale)
  - Skills assessment sliders (0-10 scale)
  - Dropdown selectors for Tunisian governorates, campuses, and English levels
  - Four checkbox inputs for professional profile completion
  - Real-time API integration with loading states and error handling
- **Program Results Display**: Detailed recommendation visualization
  - Program badge with color coding (STEM: blue, Business: green, Preparatory: purple)
  - Cluster assignment and confidence level display
  - Detailed program description and career examples
  - Student profile analysis: strengths and areas for improvement
  - Alternative program suggestions based on profile
  - Personalized explanation for recommendation rationale
- **Backend Services**: Program recommendation infrastructure
  - `recommendation_service.py`: ML model with engineered features
  - Computed features: soft_skill_strength, technical_strength, career_score, academic_strength, global_strength
  - Rule-based logic: Preparatory (low tech + high academic), Business (high soft skills/cluster 2), STEM (high tech/cluster 1)
  - ML fallback for edge cases using XGBoost classifier
  - `recommendation.py` schema: 19-field request model with comprehensive validation
  - `recommendation.py` router: API endpoint with detailed logging and error handling

### Changed
- Upgraded scikit-learn from 1.5.2 to 1.6.1 for model compatibility
- Updated API version to 0.3.0 in main.py
- Enhanced student portal with program recommendation feature
- Fixed model loading keys: `classifier`, `preprocess_pipeline`, `kmeans_model`

### Fixed
- Resolved XGBoost module dependency (added xgboost==2.1.3)
- Fixed scikit-learn version mismatch warnings
- Corrected model key references in recommendation service
- Removed duplicate code in recommender frontend page

### Technical Details
- Recommendation model: `program_recommendation_model(obj3).pkl`
- Clustering: 3 clusters for student segmentation (technical, career-oriented, balanced)
- Features: 19 input fields + 5 engineered features
- Model pipeline: XGBoost classifier with StandardScaler and OneHotEncoder
- Dependencies: scikit-learn 1.6.1, xgboost 2.1.3, pandas 2.2.3, numpy 2.1.3

## [0.3.0] - 2025-12-13

### Added
- **Dropout Risk Prediction**: Complete full-stack ML model integration
  - K-Nearest Neighbors (KNN) classifier for predicting student dropout risk
  - POST `/api/predict/dropout` endpoint with 13 specialized features
  - Dropout probability with Low/Medium/High risk classification
  - Retention probability calculation and confidence scoring
  - Factor-based analysis (academic performance, skills, professional development)
- **Dropout Prediction Features**: Advanced student profiling
  - Academic metrics: baccalaureate score, previous years average
  - Skills assessment: communication, technical, and soft skills (0-10 scale)
  - Professional development: projects completed, internship status and duration
  - Digital presence: portfolio existence, LinkedIn profile
- **Dropout Risk UI**: Comprehensive prediction interface
  - 13-field form with specialized inputs for student assessment
  - Three checkbox inputs for professional profile completion
  - Risk level visualization with color-coded badges (red/yellow/green)
  - Dual probability display: dropout risk and retention probability
  - Categorized factor analysis: positive factors, risk factors, and neutral factors
  - Context-aware recommendations based on specific risk factors
- **Backend Services**: Dropout prediction infrastructure
  - `dropout_service.py`: ML model integration and preprocessing
  - `dropout.py` schema: Request/response models with field validation
  - `dropout.py` router: API endpoint with intelligent recommendation engine
  - Factor analysis engine evaluating 9+ risk/retention indicators
- **Student Portal**: Added Dropout Risk card to student dashboard

### Changed
- Updated API version to 0.2.0 in main.py
- Enhanced student dashboard with dropout prediction feature
- Improved recommendation system with targeted interventions for high-risk students

### Technical Details
- Dropout model uses different features than success model (skills-focused vs. enrollment-focused)
- Model file: `dropout_risk_model(obj1).pkl`
- Numeric features scaled using StandardScaler
- Categorical features one-hot encoded (governorate, baccalaureate type)

## [0.2.0] - 2025-12-13

### Added
- **Backend Infrastructure**: FastAPI backend with complete ML integration
  - Python FastAPI application structure with routers, services, and schemas
  - CORS configuration for frontend-backend communication
  - Comprehensive error handling and logging
- **Student Success Prediction**: Full-stack ML model integration
  - Random Forest Classifier model for predicting student success
  - POST `/api/predict/success` endpoint with 9 input features
  - Success probability calculation with confidence levels
  - Personalized recommendations based on risk factors
  - Factor analysis (positive, concerns, neutral)
- **Student Success UI**: Interactive prediction interface
  - Form with 9 input fields (gender, age, governorate, scores, etc.)
  - Real-time prediction results with color-coded display
  - Success/risk probability visualization
  - Personalized recommendations and actionable insights
  - Factor breakdown showing strengths and concerns
- **Student Portal Enhancement**: Added Success Prediction card to student dashboard
- **Project Configuration**:
  - Python requirements.txt with ML dependencies (scikit-learn, pandas, numpy)
  - Backend .gitignore for Python/ML projects
  - Comprehensive root .gitignore excluding sensitive data
  - Backend README.md and documentation

### Changed
- Updated student portal layout to 2x2 grid with 4 feature cards
- Configured gitignore to track ML model files (.pkl) while excluding training data

### Security
- Excluded sensitive student data files (cleanedData.csv) from version control
- Excluded environment variables (.env) and credentials
- Excluded test scripts and Jupyter notebooks from repository

## [0.1.3] - 2025-12-08

### Changed
- Switched from US GPA system (0.0-4.0) to Tunisian scoring system (0-20)
- Updated Dropout Risk Calculator to use average score (0-20) instead of GPA
- Updated TA Eligibility Checker to use average score (0-20) for both overall and course grades
- Updated Performance Prediction page to display scores on 0-20 scale
- Adjusted all scoring thresholds and calculations to reflect Tunisian academic standards

## [0.1.2] - 2025-12-07

### Fixed
- Fixed background image zoom bug that occurred when clicking buttons across all pages
- Applied `bg-fixed` CSS class to prevent background scaling on user interaction

## [0.1.1] - 2025-12-07

### Fixed
- Improved text visibility across multiple pages
- Fixed grey text labels on dark backgrounds in Dropout Risk Calculator
- Fixed grey text labels on dark backgrounds in Program Recommender results
- Fixed grey text labels on dark backgrounds in TA Eligibility Checker
- Fixed light grey text in Financial Segmentation table and metrics
- Fixed light grey text in Enrollment Forecasting forms and results tables
- Added dark text colors to dropdown and input fields for better readability

## [0.1.0] - 2025-12-07

### Added
- Initial release of Stratus ML platform
- Student Portal with three core features:
  - Dropout Risk Calculator for personalized dropout risk assessment
  - Program Recommender for AI-powered program matching
  - TA Eligibility Checker with gap analysis
- Admin Portal with three analytics tools:
  - Financial Segmentation for visualizing student distribution
  - Enrollment Forecasting for predicting future enrollment
  - Performance Prediction for identifying at-risk students
- Next.js 15 frontend with App Router
- Responsive navigation between Student and Admin portals
- Modern UI with Tailwind CSS styling

### Known Issues
- Various bugs and minor issues present
- Application is in early development stage
- Not production-ready

[0.1.3]: https://github.com/adem-fennani/machine-learning-web-app/releases/tag/v0.1.3
[0.1.2]: https://github.com/adem-fennani/machine-learning-web-app/releases/tag/v0.1.2
[0.1.1]: https://github.com/adem-fennani/machine-learning-web-app/releases/tag/v0.1.1
[0.1.0]: https://github.com/adem-fennani/machine-learning-web-app/releases/tag/v0.1.0
