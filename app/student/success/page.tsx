"use client";

import { useState } from "react";
import { TrendingUp, Loader2 } from "lucide-react";

interface SuccessPredictionResult {
  success_prediction: string;
  success_probability: number;
  risk_probability: number;
  confidence: string;
  factors: {
    positive: string[];
    concerns: string[];
    neutral: string[];
  };
  recommendations: string[];
}

export default function SuccessPrediction() {
  const [formData, setFormData] = useState({
    gender: "1",
    age: "",
    origin_governorate: "",
    baccalaureate_score: "",
    baccalaureate_type: "",
    enrollment_year: new Date().getFullYear().toString(),
    scholarship_status: "",
    campus: "",
    registration_status: "ACTIVE"
  });

  const [result, setResult] = useState<SuccessPredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/api/predict/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gender: parseInt(formData.gender),
          age: parseInt(formData.age),
          origin_governorate: formData.origin_governorate,
          baccalaureate_score: parseFloat(formData.baccalaureate_score),
          baccalaureate_type: formData.baccalaureate_type,
          enrollment_year: parseInt(formData.enrollment_year),
          scholarship_status: formData.scholarship_status,
          campus: formData.campus,
          registration_status: formData.registration_status
        }),
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

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 flex items-center">
            <TrendingUp className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            Success Prediction
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Predict your likelihood of academic success based on your profile
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

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="16"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
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
                  <option value="Sciences">Sciences</option>
                  <option value="Sciences Exp">Sciences Exp</option>
                  <option value="Math">Math</option>
                  <option value="Tech">Tech</option>
                  <option value="Letters">Letters</option>
                </select>
              </div>

              {/* Enrollment Year */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Enrollment Year
                </label>
                <input
                  type="number"
                  name="enrollment_year"
                  value={formData.enrollment_year}
                  onChange={handleInputChange}
                  min="2000"
                  max="2030"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              {/* Scholarship Status */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Scholarship Status
                </label>
                <select
                  name="scholarship_status"
                  value={formData.scholarship_status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="">Select status...</option>
                  <option value="Full Scholarship">Full Scholarship</option>
                  <option value="Partial Scholarship">Partial Scholarship</option>
                  <option value="Self-Funded">Self-Funded</option>
                </select>
              </div>

              {/* Campus */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Campus
                </label>
                <select
                  name="campus"
                  value={formData.campus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  required
                >
                  <option value="">Select campus...</option>
                  <option value="Tunis Main">Tunis Main</option>
                  <option value="Monastir">Monastir</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Analyzing...
                </>
              ) : (
                "Predict Success"
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
            <p className="text-red-800 font-medium">{error}</p>
            <p className="text-red-600 text-sm mt-1">Make sure the backend is running on http://localhost:8000</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Prediction Result */}
            <div className={`rounded-xl shadow-lg p-8 ${
              result.success_prediction === "Likely to Succeed" 
                ? "bg-gradient-to-r from-green-500 to-green-600" 
                : "bg-gradient-to-r from-yellow-500 to-orange-500"
            }`}>
              <h2 className="text-3xl font-bold text-white mb-4">
                {result.success_prediction}
              </h2>
              <div className="grid md:grid-cols-3 gap-4 text-white">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm opacity-90">Success Probability</div>
                  <div className="text-3xl font-bold">
                    {(result.success_probability * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm opacity-90">Risk Probability</div>
                  <div className="text-3xl font-bold">
                    {(result.risk_probability * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="text-sm opacity-90">Confidence</div>
                  <div className="text-3xl font-bold">{result.confidence}</div>
                </div>
              </div>
            </div>

            {/* Contributing Factors */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Contributing Factors</h3>
              
              {result.factors.positive.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                    <span className="text-xl mr-2">✓</span> Positive Factors
                  </h4>
                  <ul className="space-y-2">
                    {result.factors.positive.map((factor, idx) => (
                      <li key={idx} className="text-gray-700 pl-6">• {factor}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result.factors.concerns.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                    <span className="text-xl mr-2">⚠</span> Areas of Concern
                  </h4>
                  <ul className="space-y-2">
                    {result.factors.concerns.map((concern, idx) => (
                      <li key={idx} className="text-gray-700 pl-6">• {concern}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personalized Recommendations</h3>
              <ul className="space-y-3">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start text-gray-700">
                    <span className="text-red-600 font-bold mr-2">{idx + 1}.</span>
                    <span>{rec}</span>
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
