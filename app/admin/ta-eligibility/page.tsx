"use client";

import { useState, useEffect } from "react";
import { Users, CheckCircle, TrendingUp, Loader2, BarChart3 } from "lucide-react";

interface EligibilityResult {
  total_students: number;
  employable_students: number;
  employability_rate: number;
  message: string;
}

export default function TAEligibility() {
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchEligibility = async () => {
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("http://localhost:8000/api/admin/eligibility");
      
      if (!response.ok) {
        throw new Error("Failed to fetch TA eligibility data");
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEligibility();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 flex items-center">
            <Users className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            TA Eligibility Dashboard
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Teaching Assistant eligibility predictions for student population
          </p>
        </div>

        {/* Action Button */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <button
            onClick={fetchEligibility}
            disabled={loading}
            className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ backgroundColor: loading ? '#6b7280' : '#b20000' }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#8a0000')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#b20000')}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Analyzing Student Population...
              </>
            ) : (
              <>
                <BarChart3 className="mr-2" />
                Refresh TA Eligibility Analysis
              </>
            )}
          </button>
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
          <>
            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-gray-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {result.total_students.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Students</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle className="h-8 w-8" style={{ color: '#10b981' }} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {result.employable_students.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Eligible for TA Positions</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-8 w-8" style={{ color: '#b20000' }} />
                </div>
                <div className="text-3xl font-bold" style={{ color: '#b20000' }}>
                  {result.employability_rate.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-600">Employability Rate</div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Analysis Summary</h2>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Eligible Students
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {result.employable_students} / {result.total_students}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="h-4 rounded-full transition-all"
                    style={{ 
                      width: `${result.employability_rate}%`,
                      backgroundColor: '#10b981'
                    }}
                  />
                </div>
              </div>

              <div className="p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <p className="text-blue-900 font-medium mb-2">Key Insights</p>
                <p className="text-blue-800">{result.message}</p>
                <p className="text-blue-700 mt-3 text-sm">
                  This prediction is based on academic performance, skills assessment, and institutional criteria. 
                  Eligible students meet the minimum requirements for teaching assistant positions.
                </p>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Eligible Students</h3>
                  <p className="text-gray-700">
                    {result.employable_students} students are predicted to meet the criteria for TA positions, 
                    including academic performance, communication skills, and subject mastery.
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Not Eligible Students</h3>
                  <p className="text-gray-700">
                    {(result.total_students - result.employable_students).toLocaleString()} students 
                    may need additional academic development or skill enhancement to qualify for TA roles.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
