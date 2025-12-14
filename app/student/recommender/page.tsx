"use client";

import { useState } from "react";
import { Brain, Sparkles, Loader2 } from "lucide-react";

interface ProgramRecommendationResult {
  recommended_program: string;
  cluster: number;
  explanation: string;
  confidence: string;
  program_details: {
    name: string;
    description: string;
    examples: string;
    best_for: string;
  };
  student_profile: {
    strengths: string[];
    areas_for_improvement: string[];
  };
  alternative_programs: string[];
}

export default function ProgramRecommender() {
  const [formData, setFormData] = useState({
    baccalaureate_score: "",
    previous_years_average: "",
    communication_skills_score: "",
    technical_skills_score: "",
    soft_skills_score: "",
    internship_completed: "0",
    internship_duration_months: "0",
    projects_completed: "",
    portfolio_exists: "0",
    linkedin_profile: "0",
    teaching_interest: "",
    final_average: "",
    has_scholarship: "0",
    origin_governorate: "",
    baccalaureate_type: "",
    scholarship_status: "None",
    campus: "",
    registration_status: "Registered",
    english_level: ""
  });
  
  const [result, setResult] = useState<ProgramRecommendationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const payload = {
        baccalaureate_score: parseFloat(formData.baccalaureate_score),
        previous_years_average: parseFloat(formData.previous_years_average),
        communication_skills_score: parseInt(formData.communication_skills_score),
        technical_skills_score: parseInt(formData.technical_skills_score),
        soft_skills_score: parseInt(formData.soft_skills_score),
        internship_completed: parseInt(formData.internship_completed),
        internship_duration_months: parseInt(formData.internship_duration_months),
        projects_completed: parseInt(formData.projects_completed),
        portfolio_exists: parseInt(formData.portfolio_exists),
        linkedin_profile: parseInt(formData.linkedin_profile),
        teaching_interest: parseInt(formData.teaching_interest),
        final_average: parseFloat(formData.final_average),
        has_scholarship: parseInt(formData.has_scholarship),
        origin_governorate: formData.origin_governorate,
        baccalaureate_type: formData.baccalaureate_type,
        scholarship_status: formData.scholarship_status,
        campus: formData.campus,
        registration_status: formData.registration_status,
        english_level: formData.english_level
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/predict/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
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

  const getProgramColor = (program: string) => {
    if (program === "STEM") return "bg-blue-600";
    if (program === "Business") return "bg-green-600";
    if (program === "Preparatory") return "bg-purple-600";
    return "bg-gray-600";
  };

  const getProgramIcon = (program: string) => {
    if (program === "STEM") return "💻";
    if (program === "Business") return "📊";
    if (program === "Preparatory") return "📚";
    return "🎓";
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 flex items-center">
            <Brain className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            Program Recommender
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Get AI-powered program recommendations based on your complete academic profile
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Baccalaureate Score (0-20)</label>
                <input type="number" name="baccalaureate_score" value={formData.baccalaureate_score} onChange={handleInputChange} min="0" max="20" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Previous Years Average (0-20)</label>
                <input type="number" name="previous_years_average" value={formData.previous_years_average} onChange={handleInputChange} min="0" max="20" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Final Average (0-20)</label>
                <input type="number" name="final_average" value={formData.final_average} onChange={handleInputChange} min="0" max="20" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Communication Skills (0-10)</label>
                <input type="number" name="communication_skills_score" value={formData.communication_skills_score} onChange={handleInputChange} min="0" max="10" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Technical Skills (0-10)</label>
                <input type="number" name="technical_skills_score" value={formData.technical_skills_score} onChange={handleInputChange} min="0" max="10" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Soft Skills (0-10)</label>
                <input type="number" name="soft_skills_score" value={formData.soft_skills_score} onChange={handleInputChange} min="0" max="10" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Projects Completed</label>
                <input type="number" name="projects_completed" value={formData.projects_completed} onChange={handleInputChange} min="0" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Internship Duration (months)</label>
                <input type="number" name="internship_duration_months" value={formData.internship_duration_months} onChange={handleInputChange} min="0" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Teaching Interest (0-10)</label>
                <input type="number" name="teaching_interest" value={formData.teaching_interest} onChange={handleInputChange} min="0" max="10" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Origin Governorate</label>
                <select name="origin_governorate" value={formData.origin_governorate} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required>
                  <option value="">Select governorate...</option>
                  {tunisianGovernorates.map(gov => (<option key={gov} value={gov}>{gov}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Baccalaureate Type</label>
                <select name="baccalaureate_type" value={formData.baccalaureate_type} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required>
                  <option value="">Select type...</option>
                  <option value="Science">Science</option>
                  <option value="Math">Math</option>
                  <option value="Technique">Technique</option>
                  <option value="Letters">Letters</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Campus</label>
                <select name="campus" value={formData.campus} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required>
                  <option value="">Select campus...</option>
                  <option value="Ariana">Ariana</option>
                  <option value="Tunis Main">Tunis Main</option>
                  <option value="Monastir">Monastir</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">English Level</label>
                <select name="english_level" value={formData.english_level} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required>
                  <option value="">Select level...</option>
                  <option value="A1">A1 (Beginner)</option>
                  <option value="A2">A2 (Elementary)</option>
                  <option value="B1">B1 (Intermediate)</option>
                  <option value="B2">B2 (Upper Intermediate)</option>
                  <option value="C1">C1 (Advanced)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Scholarship Status</label>
                <select name="scholarship_status" value={formData.scholarship_status} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900" required>
                  <option value="None">None</option>
                  <option value="Full Scholarship">Full Scholarship</option>
                  <option value="Partial Scholarship">Partial Scholarship</option>
                </select>
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="flex items-center">
                <input type="checkbox" id="internship_completed" checked={formData.internship_completed === "1"} onChange={(e) => setFormData({ ...formData, internship_completed: e.target.checked ? "1" : "0" })} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                <label htmlFor="internship_completed" className="ml-2 block text-sm text-gray-900">Internship Completed</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="portfolio_exists" checked={formData.portfolio_exists === "1"} onChange={(e) => setFormData({ ...formData, portfolio_exists: e.target.checked ? "1" : "0" })} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                <label htmlFor="portfolio_exists" className="ml-2 block text-sm text-gray-900">Has Portfolio</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="linkedin_profile" checked={formData.linkedin_profile === "1"} onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.checked ? "1" : "0" })} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                <label htmlFor="linkedin_profile" className="ml-2 block text-sm text-gray-900">Has LinkedIn</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="has_scholarship" checked={formData.has_scholarship === "1"} onChange={(e) => setFormData({ ...formData, has_scholarship: e.target.checked ? "1" : "0" })} className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                <label htmlFor="has_scholarship" className="ml-2 block text-sm text-gray-900">Has Scholarship</label>
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center" style={{ backgroundColor: loading ? '#6b7280' : '#b20000' }} onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = '#8b0000')} onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = '#b20000')}>
              {loading ? (<><Loader2 className="animate-spin mr-2" />Analyzing Your Profile...</>) : (<><Sparkles className="mr-2" />Get Program Recommendation</>)}
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
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getProgramColor(result.recommended_program)} mb-4 text-5xl`}>{getProgramIcon(result.recommended_program)}</div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">{result.recommended_program}</h2>
              <p className="text-xl text-gray-600 mb-4">{result.program_details.name}</p>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${result.confidence === "High" ? "bg-green-100 text-green-800" : result.confidence === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"}`}>{result.confidence} Confidence • Cluster {result.cluster}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">About This Program</h3>
              <p className="text-gray-700 mb-3">{result.program_details.description}</p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600"><span className="font-semibold">Examples:</span> {result.program_details.examples}</p>
                <p className="text-sm text-gray-600"><span className="font-semibold">Best For:</span> {result.program_details.best_for}</p>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <p className="text-blue-900"><span className="font-semibold">Why this recommendation:</span> {result.explanation}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {result.student_profile.strengths.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center"><span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>Your Strengths</h3>
                  <ul className="space-y-2">{result.student_profile.strengths.map((strength, index) => (<li key={index} className="text-sm text-green-800">✓ {strength}</li>))}</ul>
                </div>
              )}
              {result.student_profile.areas_for_improvement.length > 0 && (
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-orange-900 mb-3 flex items-center"><span className="inline-block w-2 h-2 bg-orange-600 rounded-full mr-2"></span>Areas for Improvement</h3>
                  <ul className="space-y-2">{result.student_profile.areas_for_improvement.map((area, index) => (<li key={index} className="text-sm text-orange-800">→ {area}</li>))}</ul>
                </div>
              )}
            </div>
            {result.alternative_programs.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Alternative Options</h3>
                <ul className="space-y-2">{result.alternative_programs.map((alt, index) => (<li key={index} className="flex items-start"><span className="inline-flex items-center justify-center w-6 h-6 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">{index + 1}</span><span className="text-gray-700">{alt}</span></li>))}</ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
