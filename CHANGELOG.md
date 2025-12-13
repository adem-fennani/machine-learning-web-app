# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
