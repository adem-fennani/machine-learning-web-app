'use client';

import React, { useState } from 'react';

export default function StudentTAEligibilityPage() {
  const [formData, setFormData] = useState({
    previous_years_average: 14,
    communication_skills_score: 7,
    technical_skills_score: 7,
    soft_skills_score: 7,
    internship_completed: false,
    internship_duration_months: 0,
    projects_completed: 1,
    portfolio_exists: false,
    linkedin_profile: false,
    teaching_interest: 5,
    english_level: 'B1'
  });

  const [result, setResult] = useState<{
    employable: boolean;
    probability: number;
    message: string;
    recommendations: string[];
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/student/ta-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to check eligibility');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to check eligibility. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: number | boolean | string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">TA Eligibility Checker</h1>
          <p className="text-white drop-shadow-md">Check your eligibility for Teaching Assistant positions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Profile</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Academic Performance */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Previous Years Average (0-20)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.01"
                  value={formData.previous_years_average}
                  onChange={(e) => handleInputChange('previous_years_average', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>

              {/* Skills Scores */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Communication Skills: {formData.communication_skills_score}/10
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.communication_skills_score}
                  onChange={(e) => handleInputChange('communication_skills_score', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Technical Skills: {formData.technical_skills_score}/10
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.technical_skills_score}
                  onChange={(e) => handleInputChange('technical_skills_score', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Soft Skills: {formData.soft_skills_score}/10
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.soft_skills_score}
                  onChange={(e) => handleInputChange('soft_skills_score', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Experience */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="internship"
                  checked={formData.internship_completed}
                  onChange={(e) => handleInputChange('internship_completed', e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <label htmlFor="internship" className="text-sm font-medium text-white">
                  Completed Internship
                </label>
              </div>

              {formData.internship_completed && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Internship Duration (months)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={formData.internship_duration_months}
                    onChange={(e) => handleInputChange('internship_duration_months', parseInt(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Projects Completed
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={formData.projects_completed}
                  onChange={(e) => handleInputChange('projects_completed', parseInt(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
                  required
                />
              </div>

              {/* Profile */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="portfolio"
                  checked={formData.portfolio_exists}
                  onChange={(e) => handleInputChange('portfolio_exists', e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <label htmlFor="portfolio" className="text-sm font-medium text-white">
                  Have Portfolio
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="linkedin"
                  checked={formData.linkedin_profile}
                  onChange={(e) => handleInputChange('linkedin_profile', e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <label htmlFor="linkedin" className="text-sm font-medium text-white">
                  Have LinkedIn Profile
                </label>
              </div>

              {/* Teaching Interest */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Teaching Interest: {formData.teaching_interest}/10
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.teaching_interest}
                  onChange={(e) => handleInputChange('teaching_interest', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* English Level */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  English Level
                </label>
                <select
                  value={formData.english_level}
                  onChange={(e) => handleInputChange('english_level', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white text-gray-900"
                  required
                >
                  <option value="A1">A1 - Beginner</option>
                  <option value="A2">A2 - Elementary</option>
                  <option value="B1">B1 - Intermediate</option>
                  <option value="B2">B2 - Upper Intermediate</option>
                  <option value="C1">C1 - Advanced</option>
                  <option value="C2">C2 - Proficient</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Checking...' : 'Check Eligibility'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/30">
            <h2 className="text-2xl font-semibold text-white mb-6">Results</h2>
            
            {!result && !loading && (
              <div className="flex items-center justify-center h-64 text-gray-300">
                <p>Submit the form to see your eligibility results</p>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="text-center">
                  <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                    result.employable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {result.employable ? '✅ Eligible' : '⚠️ Not Yet Eligible'}
                  </div>
                </div>

                {/* Probability */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-white">Eligibility Score</span>
                    <span className="text-sm font-bold text-indigo-300">
                      {result.probability.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${
                        result.probability >= 70
                          ? 'bg-gradient-to-r from-green-500 to-green-600'
                          : result.probability >= 50
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${Math.min(result.probability, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Threshold: 70%</p>
                </div>

                {/* Message */}
                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white">{result.message}</p>
                </div>

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Recommendations to Improve
                    </h3>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-2 text-sm text-gray-200"
                        >
                          <span className="text-indigo-300 font-bold mt-0.5">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
