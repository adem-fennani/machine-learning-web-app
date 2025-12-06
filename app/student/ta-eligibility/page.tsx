"use client";

import { useState } from "react";
import { Users, CheckCircle, XCircle, TrendingUp } from "lucide-react";

interface EligibilityResult {
  eligible: boolean;
  probability: number;
  score: number;
  maxScore: number;
  gaps: string[];
  recommendations: string[];
}

export default function TAEligibility() {
  const [formData, setFormData] = useState({
    gpa: "",
    creditsCompleted: "",
    courseGrade: "",
    hasTAExperience: false,
    hasResearch: false,
    recommendation: false,
  });
  
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock ML prediction logic
    const gpa = parseFloat(formData.gpa);
    const credits = parseInt(formData.creditsCompleted);
    const courseGrade = parseFloat(formData.courseGrade);
    
    let score = 0;
    const maxScore = 100;
    const gaps: string[] = [];
    const recommendations: string[] = [];
    
    // GPA check (30 points)
    if (gpa >= 3.5) {
      score += 30;
    } else if (gpa >= 3.0) {
      score += 20;
      gaps.push("GPA below 3.5 (current: " + gpa.toFixed(2) + ")");
      recommendations.push("Work on improving your GPA to 3.5 or higher");
    } else {
      score += 10;
      gaps.push("GPA must be at least 3.0 (current: " + gpa.toFixed(2) + ")");
      recommendations.push("Minimum GPA requirement is 3.0");
    }
    
    // Credits check (20 points)
    if (credits >= 60) {
      score += 20;
    } else if (credits >= 30) {
      score += 15;
      gaps.push("Need more credits (current: " + credits + ", required: 60+)");
      recommendations.push("Complete at least 60 credits before applying");
    } else {
      score += 5;
      gaps.push("Insufficient credits completed");
      recommendations.push("You need to complete more coursework");
    }
    
    // Course grade check (25 points)
    if (courseGrade >= 3.7) {
      score += 25;
    } else if (courseGrade >= 3.3) {
      score += 18;
      gaps.push("Course grade could be higher");
      recommendations.push("Aim for an A (3.7+) in the course you want to TA for");
    } else {
      score += 10;
      gaps.push("Course grade too low for TA position");
      recommendations.push("You typically need an A- or better in the course");
    }
    
    // Experience (15 points)
    if (formData.hasTAExperience) {
      score += 15;
    } else {
      gaps.push("No prior TA experience");
      recommendations.push("Consider volunteering as a peer tutor first");
    }
    
    // Research experience (10 points)
    if (formData.hasResearch) {
      score += 10;
    } else {
      recommendations.push("Research experience can strengthen your application");
    }
    
    // Faculty recommendation (10 points)
    if (formData.recommendation) {
      score += 10;
    } else {
      gaps.push("Faculty recommendation letter needed");
      recommendations.push("Get a strong recommendation from a professor");
    }
    
    const probability = Math.round((score / maxScore) * 100);
    const eligible = probability >= 70;
    
    if (eligible && gaps.length === 0) {
      recommendations.unshift("You meet all requirements! Submit your application.");
    }
    
    setResult({
      eligible,
      probability,
      score,
      maxScore,
      gaps,
      recommendations,
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 flex items-center">
            <Users className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            TA Eligibility Checker
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Check if you qualify to become a teaching assistant
          </p>
        </div>

      <div className="bg-gray-900/60 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 p-8 mb-8">
        <form onSubmit={checkEligibility} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Current GPA (0.0 - 4.0)
              </label>
              <input
                type="number"
                required
                min="0"
                max="4"
                step="0.01"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Enter your GPA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credits Completed
              </label>
              <input
                type="number"
                required
                min="0"
                max="200"
                value={formData.creditsCompleted}
                onChange={(e) => setFormData({ ...formData, creditsCompleted: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Total credits"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade in Target Course (0.0 - 4.0)
              </label>
              <input
                type="number"
                required
                min="0"
                max="4"
                step="0.01"
                value={formData.courseGrade}
                onChange={(e) => setFormData({ ...formData, courseGrade: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
                placeholder="Your grade in the course"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="taExperience"
                checked={formData.hasTAExperience}
                onChange={(e) => setFormData({ ...formData, hasTAExperience: e.target.checked })}
                className="h-4 w-4 focus:ring-red-600 border-gray-300 rounded"
                style={{ accentColor: '#b20000' }}
              />
              <label htmlFor="taExperience" className="ml-2 block text-sm text-gray-700">
                I have prior teaching or tutoring experience
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="research"
                checked={formData.hasResearch}
                onChange={(e) => setFormData({ ...formData, hasResearch: e.target.checked })}
                className="h-4 w-4 focus:ring-red-600 border-gray-300 rounded"
                style={{ accentColor: '#b20000' }}
              />
              <label htmlFor="research" className="ml-2 block text-sm text-gray-700">
                I have research experience
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="recommendation"
                checked={formData.recommendation}
                onChange={(e) => setFormData({ ...formData, recommendation: e.target.checked })}
                className="h-4 w-4 focus:ring-red-600 border-gray-300 rounded"
                style={{ accentColor: '#b20000' }}
              />
              <label htmlFor="recommendation" className="ml-2 block text-sm text-gray-700">
                I have a faculty recommendation letter
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            style={{ backgroundColor: '#b20000' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8a0000'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#b20000'}
          >
            Check Eligibility
          </button>
        </form>
      </div>

      {result && (
        <div className="bg-gray-900/60 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 p-8">
          <div className="text-center mb-8">
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4`}
              style={{
                backgroundColor: result.eligible ? '#f0f0f0' : '#ffe0e0',
                color: result.eligible ? '#4a4a4a' : '#b20000'
              }}
            >
              {result.eligible ? (
                <CheckCircle className="h-12 w-12" />
              ) : (
                <XCircle className="h-12 w-12" />
              )}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {result.eligible ? "Eligible" : "Not Yet Eligible"}
            </h2>
            <p className="text-xl text-gray-600">
              {result.probability}% Match Score
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Your Score
              </span>
              <span className="text-sm font-medium text-gray-700">
                {result.score} / {result.maxScore}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="h-4 rounded-full transition-all"
                style={{ 
                  width: `${result.probability}%`,
                  backgroundColor: result.eligible ? '#4a4a4a' : '#b20000'
                }}
              />
            </div>
          </div>

          {result.gaps.length > 0 && (
            <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-yellow-600" />
                Gap Analysis
              </h3>
              <ul className="space-y-2">
                {result.gaps.map((gap, index) => (
                  <li key={index} className="text-gray-700 flex items-start">
                    <span className="text-yellow-600 mr-2">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommendations
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block w-6 h-6 bg-gray-200 text-gray-700 rounded-full text-center font-semibold text-sm mr-3 mt-0.5">
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
