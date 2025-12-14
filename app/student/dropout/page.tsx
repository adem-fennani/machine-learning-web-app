"use client";

import { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

interface DropoutPredictionResult {
  dropout_prediction: string;
  dropout_probability: number;
  retention_probability: number;
  confidence: string;
  factors: {
    positive: string[];
    concerns: string[];
    neutral: string[];
  };
  recommendations: string[];
}

export default function DropoutRisk() {
  const [formData, setFormData] = useState({
    gender: "1",
    origin_governorate: "",
    baccalaureate_score: "",
    baccalaureate_type: "",
    previous_years_average: "",
    communication_skills_score: "",
    technical_skills_score: "",
    soft_skills_score: "",
    projects_completed: "",
    internship_completed: "0",
    internship_duration_months: "0",
    portfolio_exists: "0",
    linkedin_profile: "0"
  });
  
  const [result, setResult] = useState<DropoutPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        gender: parseInt(formData.gender),
        origin_governorate: formData.origin_governorate,
        baccalaureate_score: parseFloat(formData.baccalaureate_score),
        baccalaureate_type: formData.baccalaureate_type,
        previous_years_average: parseFloat(formData.previous_years_average),
        communication_skills_score: parseInt(formData.communication_skills_score),
        technical_skills_score: parseInt(formData.technical_skills_score),
        soft_skills_score: parseInt(formData.soft_skills_score),
        projects_completed: parseInt(formData.projects_completed),
        internship_completed: parseInt(formData.internship_completed),
        internship_duration_months: parseInt(formData.internship_duration_months),
        portfolio_exists: parseInt(formData.portfolio_exists),
        linkedin_profile: parseInt(formData.linkedin_profile)
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/predict/dropout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const tunisianGovernorates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
    "Béja", "Jendouba", "Kef", "Siliana", "Kairouan", "Kasserine", "Sidi Bouzid",
    "Sousse", "Monastir", "Mahdia", "Sfax", "Gafsa", "Tozeur", "Kébili",
    "Gabès", "Médenine", "Tataouine"
  ];

  const getRiskColor = (prediction: string) => {
    if (prediction === "High Risk") return "bg-red-600";
    if (prediction === "Medium Risk") return "bg-yellow-600";
    return "bg-green-600";
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center drop-shadow-lg">
            <AlertCircle className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            Dropout Risk Prediction
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Get a personalized assessment of your dropout risk using ML prediction
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </select>
              </div>

              {/* Governorate */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Origin Governorate
                </label>
                <select
                  name="origin_governorate"
                  value={formData.origin_governorate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="">Select governorate...</option>
                  {tunisianGovernorates.map(gov => (
                    <option key={gov} value={gov}>{gov}</option>
                  ))}
                </select>
              </div>

              {/* Baccalaureate Score */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Baccalaureate Score (0-20)
                </label>
                <input
                  type="number"
                  name="baccalaureate_score"
                  value={formData.baccalaureate_score}
                  onChange={handleInputChange}
                  min="0"
                  max="20"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Baccalaureate Type */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Baccalaureate Type
                </label>
                <select
                  name="baccalaureate_type"
                  value={formData.baccalaureate_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="">Select type...</option>
                  <option value="Sciences Exp">Sciences Exp</option>
                  <option value="Math">Math</option>
                  <option value="Letters">Letters</option>
                  <option value="Tech">Tech</option>
                </select>
              </div>

              {/* Previous Years Average */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Previous Years Average (0-20)
                </label>
                <input
                  type="number"
                  name="previous_years_average"
                  value={formData.previous_years_average}
                  onChange={handleInputChange}
                  min="0"
                  max="20"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Communication Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Communication Skills (0-10)
                </label>
                <input
                  type="number"
                  name="communication_skills_score"
                  value={formData.communication_skills_score}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Technical Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Technical Skills (0-10)
                </label>
                <input
                  type="number"
                  name="technical_skills_score"
                  value={formData.technical_skills_score}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Soft Skills */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Soft Skills (0-10)
                </label>
                <input
                  type="number"
                  name="soft_skills_score"
                  value={formData.soft_skills_score}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Projects Completed */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Projects Completed
                </label>
                <input
                  type="number"
                  name="projects_completed"
                  value={formData.projects_completed}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Internship Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Internship Duration (months)
                </label>
                <input
                  type="number"
                  name="internship_duration_months"
                  value={formData.internship_duration_months}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="internship_completed"
                  checked={formData.internship_completed === "1"}
                  onChange={(e) => setFormData({ ...formData, internship_completed: e.target.checked ? "1" : "0" })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="internship_completed" className="ml-2 block text-sm text-gray-900">
                  Internship Completed
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="portfolio_exists"
                  checked={formData.portfolio_exists === "1"}
                  onChange={(e) => setFormData({ ...formData, portfolio_exists: e.target.checked ? "1" : "0" })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="portfolio_exists" className="ml-2 block text-sm text-gray-900">
                  Has Portfolio
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="linkedin_profile"
                  checked={formData.linkedin_profile === "1"}
                  onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.checked ? "1" : "0" })}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="linkedin_profile" className="ml-2 block text-sm text-gray-900">
                  Has LinkedIn Profile
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              style={{ backgroundColor: loading ? '#6b7280' : '#b20000' }}
              onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#8b0000')}
              onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#b20000')}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                'Predict Dropout Risk'
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getRiskColor(result.dropout_prediction)} mb-4`}>
                <AlertCircle className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {result.dropout_prediction}
              </h2>
              <div className="space-y-2">
                <p className="text-5xl font-bold text-gray-900">
                  {(result.dropout_probability * 100).toFixed(1)}%
                </p>
                <p className="text-gray-600">Dropout Probability</p>
                <p className="text-2xl font-semibold text-green-600 mt-4">
                  {(result.retention_probability * 100).toFixed(1)}% Retention
                </p>
              </div>
              <div className="mt-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  result.confidence === "High" ? "bg-green-100 text-green-800" :
                  result.confidence === "Medium" ? "bg-yellow-100 text-yellow-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {result.confidence} Confidence
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full transition-all ${getRiskColor(result.dropout_prediction)}`}
                  style={{ width: `${result.dropout_probability * 100}%` }}
                />
              </div>
            </div>

            {/* Factors */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Positive Factors */}
              {result.factors.positive.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                    <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                    Positive Factors
                  </h3>
                  <ul className="space-y-2">
                    {result.factors.positive.map((factor, index) => (
                      <li key={index} className="text-sm text-green-800">
                        • {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Concerns */}
              {result.factors.concerns.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
                    <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                    Risk Factors
                  </h3>
                  <ul className="space-y-2">
                    {result.factors.concerns.map((factor, index) => (
                      <li key={index} className="text-sm text-red-800">
                        • {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Neutral */}
              {result.factors.neutral.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="inline-block w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                    Other Factors
                  </h3>
                  <ul className="space-y-2">
                    {result.factors.neutral.map((factor, index) => (
                      <li key={index} className="text-sm text-gray-800">
                        • {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="border-t pt-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Personalized Recommendations
              </h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-700 rounded-full text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
