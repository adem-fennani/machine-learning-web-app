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
          <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-white/20">Your Profile</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Academic Performance */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-center space-x-2 mb-3">
                  <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                  <label className="text-sm font-bold text-white uppercase tracking-wide">
                    Academic Excellence
                  </label>
                </div>
                <p className="text-xs text-gray-400 mb-3">Your average grade over previous years (Scale: 0-20)</p>
                <input
                  type="number"
                  min="0"
                  max="20"
                  step="0.01"
                  value={formData.previous_years_average || 0}
                  onChange={(e) => handleInputChange('previous_years_average', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 font-medium text-lg transition-all"
                  required
                />
              </div>

              {/* Skills Scores */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-4">
                <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wide mb-3">Skills Assessment</h3>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-white">Communication Skills</label>
                    <span className="text-sm font-bold text-indigo-300">{formData.communication_skills_score}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.communication_skills_score}
                    onChange={(e) => handleInputChange('communication_skills_score', parseInt(e.target.value))}
                    className="w-full h-2.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-white">Technical Skills</label>
                    <span className="text-sm font-bold text-indigo-300">{formData.technical_skills_score}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.technical_skills_score}
                    onChange={(e) => handleInputChange('technical_skills_score', parseInt(e.target.value))}
                    className="w-full h-2.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-white">Soft Skills</label>
                    <span className="text-sm font-bold text-indigo-300">{formData.soft_skills_score}/10</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={formData.soft_skills_score}
                    onChange={(e) => handleInputChange('soft_skills_score', parseInt(e.target.value))}
                    className="w-full h-2.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>

              {/* Experience */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wide mb-3">Experience</h3>
                
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    id="internship"
                    checked={formData.internship_completed}
                    onChange={(e) => handleInputChange('internship_completed', e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="internship" className="text-sm font-medium text-white cursor-pointer flex-1">
                    Completed Internship
                  </label>
                </div>

                {formData.internship_completed && (
                  <div className="ml-8">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Internship Duration (months)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      value={formData.internship_duration_months || 0}
                      onChange={(e) => handleInputChange('internship_duration_months', parseInt(e.target.value) || 0)}
                      className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 font-medium"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Projects Completed
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={formData.projects_completed || 0}
                    onChange={(e) => handleInputChange('projects_completed', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-2 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Profile */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                <h3 className="text-sm font-semibold text-indigo-300 uppercase tracking-wide mb-3">Professional Profile</h3>
                
                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    id="portfolio"
                    checked={formData.portfolio_exists}
                    onChange={(e) => handleInputChange('portfolio_exists', e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="portfolio" className="text-sm font-medium text-white cursor-pointer flex-1">
                    Have Portfolio
                  </label>
                </div>

                <div className="flex items-center space-x-3 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    id="linkedin"
                    checked={formData.linkedin_profile}
                    onChange={(e) => handleInputChange('linkedin_profile', e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  />
                  <label htmlFor="linkedin" className="text-sm font-medium text-white cursor-pointer flex-1">
                    Have LinkedIn Profile
                  </label>
                </div>
              </div>

              {/* Teaching Interest */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-semibold text-white">Teaching Interest</label>
                  <span className="text-sm font-bold text-indigo-300">{formData.teaching_interest}/10</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={formData.teaching_interest}
                  onChange={(e) => handleInputChange('teaching_interest', parseInt(e.target.value))}
                  className="w-full h-2.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
              </div>

              {/* English Level */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <label className="block text-sm font-semibold text-white mb-3">
                  English Level
                </label>
                <select
                  value={formData.english_level}
                  onChange={(e) => handleInputChange('english_level', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-indigo-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900 font-medium text-lg cursor-pointer transition-all"
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
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing Your Profile...
                  </span>
                ) : 'Check My Eligibility'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border-2 border-red-500 rounded-xl backdrop-blur-sm">
                <p className="text-red-200 text-sm font-medium">{error}</p>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/30">
            <h2 className="text-2xl font-bold text-white mb-6 pb-3 border-b border-white/20">Results</h2>
            
            {!result && !loading && (
              <div className="flex flex-col items-center justify-center h-64 text-gray-300">
                <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <p className="text-center text-lg">Submit the form to see your eligibility results</p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
                <p className="mt-4 text-white text-lg font-medium animate-pulse">Analyzing your profile...</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Status Badge */}
                <div className="text-center bg-white/5 rounded-xl p-6 border border-white/10">
                  <div className={`inline-flex items-center px-8 py-4 rounded-2xl text-xl font-bold shadow-lg ${
                    result.employable 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                      : 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  }`}>
                    {result.employable ? (
                      <>
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Eligible for TA Position
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Not Yet Eligible
                      </>
                    )}
                  </div>
                </div>

                {/* Probability */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <div className="flex justify-between mb-3">
                    <span className="text-base font-semibold text-white">Eligibility Score</span>
                    <span className="text-2xl font-bold text-indigo-300">
                      {result.probability.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-700 rounded-full h-6 overflow-hidden shadow-inner">
                    <div
                      className={`h-6 rounded-full transition-all duration-1000 ease-out relative ${
                        result.probability >= 70
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                          : result.probability >= 50
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${Math.min(result.probability, 100)}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="text-xs text-gray-400">Required: 70%</p>
                    <p className="text-xs text-gray-400">{result.probability >= 70 ? '✓ Passed' : 'Not yet'}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl p-5 border border-indigo-400/30 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-indigo-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <p className="text-white font-medium leading-relaxed">{result.message}</p>
                  </div>
                </div>

                {/* Recommendations */}
                {result.recommendations.length > 0 && (
                  <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Recommendations to Improve
                    </h3>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, index) => (
                        <li
                          key={index}
                          className="flex items-start space-x-3 text-sm text-gray-200 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <span className="flex-shrink-0 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {index + 1}
                          </span>
                          <span className="leading-relaxed">{rec}</span>
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

