"use client";

import { useState } from "react";
import { TrendingUp, Calendar, Building2, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface YearlyForecast {
  year: number;
  predicted_enrollment: number;
  trend: string;
}

interface ForecastResult {
  forecasts: YearlyForecast[];
  total_growth: number;
  average_enrollment: number;
  trend_description: string;
  model_info: {
    model_type: string;
    training_period: string;
    metrics: any;
  };
}

export default function EnrollmentForecasting() {
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<ForecastResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    
    try {
      const response = await fetch("http://localhost:8000/api/admin/forecast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          years_ahead: parseInt(years)
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate forecast");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getTrendColor = (trend: string) => {
    if (trend === "increasing") return "text-green-600";
    if (trend === "decreasing") return "text-red-600";
    return "text-gray-600";
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "increasing") return "↗";
    if (trend === "decreasing") return "↘";
    return "→";
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 flex items-center">
            <TrendingUp className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            Enrollment Forecasting
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Predict future enrollment trends and plan institutional resources
          </p>
        </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <form onSubmit={generateForecast} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Forecast Period (Years)
            </label>
            <input
              type="number"
              required
              min="1"
              max="10"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            style={{ backgroundColor: loading ? '#6b7280' : '#b20000' }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#8a0000')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#b20000')}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Generating Forecast...
              </>
            ) : (
              "Generate Forecast"
            )}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-8">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {result && (
        <>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Enrollment Projection</h2>
              <p className="text-gray-700">{result.trend_description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Model: {result.model_info.model_type} | Training Period: {result.model_info.training_period}
              </p>
            </div>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={result.forecasts.map(f => ({ year: f.year.toString(), enrollment: f.predicted_enrollment }))}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="enrollment"
                  stroke="#b20000"
                  strokeWidth={3}
                  name="Predicted Enrollment"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-6 w-6 mr-2" style={{ color: '#b20000' }} />
                Forecast Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-900">First Year ({result.forecasts[0].year})</span>
                  <span className="font-bold text-gray-900">
                    {result.forecasts[0].predicted_enrollment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-900">Final Year ({result.forecasts[result.forecasts.length - 1].year})</span>
                  <span className="font-bold" style={{ color: '#b20000' }}>
                    {result.forecasts[result.forecasts.length - 1].predicted_enrollment.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-900">Total Growth</span>
                  <span className={`font-bold ${result.total_growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {result.total_growth > 0 ? '+' : ''}{result.total_growth}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-900">Average Enrollment</span>
                  <span className="font-bold text-gray-900">{result.average_enrollment.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Building2 className="h-6 w-6 mr-2" style={{ color: '#b20000' }} />
                Resource Planning
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Classrooms Needed</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.ceil(result.forecasts[result.forecasts.length - 1].predicted_enrollment / 30)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Based on 30 students per classroom</p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Faculty Required</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.ceil(result.forecasts[result.forecasts.length - 1].predicted_enrollment / 25)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Based on 25:1 student-faculty ratio</p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Housing Units</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.ceil(result.forecasts[result.forecasts.length - 1].predicted_enrollment * 0.3)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Assuming 30% need housing</p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 font-medium">Scholarship Budget</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {Math.ceil(result.forecasts[result.forecasts.length - 1].predicted_enrollment * 0.1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Students needing financial aid (10%)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Year-by-Year Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Year</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Predicted Enrollment</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Trend</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-900">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {result.forecasts.map((forecast, index) => {
                    const change = index > 0 
                      ? ((forecast.predicted_enrollment - result.forecasts[index - 1].predicted_enrollment) / result.forecasts[index - 1].predicted_enrollment * 100).toFixed(1)
                      : "0.0";
                    return (
                      <tr key={forecast.year} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{forecast.year}</td>
                        <td className="text-right py-3 px-4 font-bold text-gray-900">{forecast.predicted_enrollment.toLocaleString()}</td>
                        <td className="text-center py-3 px-4">
                          <span className={`${getTrendColor(forecast.trend)} font-semibold text-lg`}>
                            {getTrendIcon(forecast.trend)}
                          </span>
                        </td>
                        <td className="text-right py-3 px-4">
                          <span className={`${parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                            {parseFloat(change) > 0 ? '+' : ''}{change}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
}
