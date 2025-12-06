"use client";

import { useState } from "react";
import { AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function DropoutRisk() {
  const [formData, setFormData] = useState({
    age: "",
    gpa: "",
    attendance: "",
    financialAid: false,
    credits: "",
  });
  
  const [result, setResult] = useState<{
    riskLevel: string;
    probability: number;
    recommendations: string[];
  } | null>(null);

  const calculateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock ML prediction logic
    const gpa = parseFloat(formData.gpa);
    const attendance = parseFloat(formData.attendance);
    const credits = parseInt(formData.credits);
    
    let score = 0;
    
    // Simple scoring algorithm
    if (gpa < 2.5) score += 30;
    else if (gpa < 3.0) score += 15;
    
    if (attendance < 70) score += 35;
    else if (attendance < 85) score += 20;
    
    if (credits < 12) score += 20;
    else if (credits < 15) score += 10;
    
    if (!formData.financialAid) score += 15;
    
    const probability = Math.min(Math.max(score, 5), 95);
    
    let riskLevel = "Low";
    let recommendations: string[] = [];
    
    if (probability > 60) {
      riskLevel = "High";
      recommendations = [
        "Schedule an immediate meeting with your academic advisor",
        "Apply for financial aid and tutoring services",
        "Join study groups and peer mentoring programs",
        "Consider reducing course load next semester",
      ];
    } else if (probability > 30) {
      riskLevel = "Medium";
      recommendations = [
        "Maintain regular attendance and study habits",
        "Meet with academic advisor this month",
        "Utilize campus tutoring resources",
        "Monitor your academic progress weekly",
      ];
    } else {
      riskLevel = "Low";
      recommendations = [
        "Keep up the excellent work!",
        "Continue maintaining good attendance",
        "Stay connected with professors and advisors",
        "Consider becoming a peer tutor",
      ];
    }
    
    setResult({ riskLevel, probability, recommendations });
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "High": return "text-red-600 bg-red-50";
      case "Medium": return "text-yellow-600 bg-yellow-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "High": return <TrendingDown className="h-8 w-8" />;
      case "Medium": return <Minus className="h-8 w-8" />;
      case "Low": return <TrendingUp className="h-8 w-8" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
          <AlertCircle className="h-10 w-10 text-red-600 mr-3" />
          Dropout Risk Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Get a personalized assessment of your dropout risk using ML prediction
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <form onSubmit={calculateRisk} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                required
                min="16"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GPA (0.0 - 4.0)
              </label>
              <input
                type="number"
                required
                min="0"
                max="4"
                step="0.01"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your GPA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attendance (%)
              </label>
              <input
                type="number"
                required
                min="0"
                max="100"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter attendance percentage"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credits Enrolled
              </label>
              <input
                type="number"
                required
                min="1"
                max="24"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter credits"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="financialAid"
              checked={formData.financialAid}
              onChange={(e) => setFormData({ ...formData, financialAid: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="financialAid" className="ml-2 block text-sm text-gray-700">
              I receive financial aid
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Calculate Risk
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${getRiskColor(result.riskLevel)} mb-4`}>
              {getRiskIcon(result.riskLevel)}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {result.riskLevel} Risk
            </h2>
            <p className="text-6xl font-bold text-gray-900 mb-2">
              {result.probability}%
            </p>
            <p className="text-gray-600">Dropout Probability</p>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className={`h-4 rounded-full transition-all ${
                  result.riskLevel === "High"
                    ? "bg-red-600"
                    : result.riskLevel === "Medium"
                    ? "bg-yellow-600"
                    : "bg-green-600"
                }`}
                style={{ width: `${result.probability}%` }}
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Recommendations
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center font-semibold text-sm mr-3 mt-0.5">
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
  );
}
