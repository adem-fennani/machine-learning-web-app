"use client";

import { useState } from "react";
import { TrendingUp, Calendar, Building2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function EnrollmentForecasting() {
  const [years, setYears] = useState("5");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const programs = [
    "All Programs",
    "Computer Science",
    "Business Administration",
    "Engineering",
    "Data Science",
    "Graphic Design",
  ];

  const generateForecast = (e: React.FormEvent) => {
    e.preventDefault();
    
    const currentYear = 2025;
    const baseEnrollment = selectedProgram === "all" ? 3500 : 450;
    const growthRate = 0.05 + Math.random() * 0.05; // 5-10% growth
    
    const forecast = [];
    for (let i = 0; i <= parseInt(years); i++) {
      const year = currentYear + i;
      const predicted = Math.round(baseEnrollment * Math.pow(1 + growthRate, i));
      const confidenceLower = Math.round(predicted * 0.9);
      const confidenceUpper = Math.round(predicted * 1.1);
      
      forecast.push({
        year: year.toString(),
        predicted,
        lower: confidenceLower,
        upper: confidenceUpper,
      });
    }
    
    setForecastData(forecast);
    setShowResults(true);
  };

  const resourceNeeds = forecastData.length > 0 ? {
    classrooms: Math.ceil((forecastData[forecastData.length - 1].predicted / 30)),
    faculty: Math.ceil((forecastData[forecastData.length - 1].predicted / 25)),
    housing: Math.ceil((forecastData[forecastData.length - 1].predicted * 0.6)),
    scholarships: Math.ceil((forecastData[forecastData.length - 1].predicted * 0.25)),
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
          <TrendingUp className="h-10 w-10 text-indigo-600 mr-3" />
          Enrollment Forecasting
        </h1>
        <p className="text-lg text-gray-600">
          Predict future enrollment trends and plan institutional resources
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <form onSubmit={generateForecast} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forecast Period (Years)
              </label>
              <input
                type="number"
                required
                min="1"
                max="10"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Program / Department
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {programs.map((program) => (
                  <option key={program} value={program.toLowerCase().replace(/ /g, "-")}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Generate Forecast
          </button>
        </form>
      </div>

      {showResults && forecastData.length > 0 && (
        <>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Enrollment Projection
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#6366f1"
                  strokeWidth={3}
                  name="Predicted Enrollment"
                />
                <Line
                  type="monotone"
                  dataKey="lower"
                  stroke="#93c5fd"
                  strokeDasharray="5 5"
                  name="Lower Bound (90%)"
                />
                <Line
                  type="monotone"
                  dataKey="upper"
                  stroke="#93c5fd"
                  strokeDasharray="5 5"
                  name="Upper Bound (110%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-6 w-6 text-indigo-600 mr-2" />
                Forecast Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Current Enrollment</span>
                  <span className="font-bold text-gray-900">
                    {forecastData[0].predicted.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Projected ({forecastData[forecastData.length - 1].year})</span>
                  <span className="font-bold text-indigo-600">
                    {forecastData[forecastData.length - 1].predicted.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="font-bold text-green-600">
                    {(((forecastData[forecastData.length - 1].predicted - forecastData[0].predicted) / forecastData[0].predicted) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Confidence Interval</span>
                  <span className="text-sm text-gray-500">
                    {forecastData[forecastData.length - 1].lower.toLocaleString()} - {forecastData[forecastData.length - 1].upper.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {resourceNeeds && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Building2 className="h-6 w-6 text-indigo-600 mr-2" />
                  Resource Planning
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Classrooms Needed</span>
                      <span className="text-2xl font-bold text-blue-600">
                        {resourceNeeds.classrooms}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Based on 30 students per classroom</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Faculty Required</span>
                      <span className="text-2xl font-bold text-green-600">
                        {resourceNeeds.faculty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Based on 25:1 student-faculty ratio</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Housing Units</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {resourceNeeds.housing}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Assuming 60% need housing</p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">Scholarship Budget</span>
                      <span className="text-2xl font-bold text-yellow-600">
                        {resourceNeeds.scholarships}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Students needing financial aid (25%)</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Year-by-Year Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Year</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Predicted</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Lower Bound</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Upper Bound</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {forecastData.map((row, index) => {
                    const change = index > 0 
                      ? ((row.predicted - forecastData[index - 1].predicted) / forecastData[index - 1].predicted * 100).toFixed(1)
                      : "0.0";
                    return (
                      <tr key={row.year} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{row.year}</td>
                        <td className="text-right py-3 px-4 font-bold">{row.predicted.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 text-gray-600">{row.lower.toLocaleString()}</td>
                        <td className="text-right py-3 px-4 text-gray-600">{row.upper.toLocaleString()}</td>
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
  );
}
