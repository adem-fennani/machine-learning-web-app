"use client";

import { useState } from "react";
import { Users, Award, GraduationCap, MapPin, Loader2, TrendingUp, CheckCircle } from "lucide-react";

interface SegmentationResult {
  cluster: number;
  cluster_name: string;
  scholarship_status: string;
  baccalaureate_score: number;
  origin_governorate: string;
  chosen_program: string;
  cluster_characteristics: {
    typical_bac_score_range: string;
    common_scholarship: string;
    description: string;
  };
}

export default function StudentSegmentation() {
  const [formData, setFormData] = useState({
    baccalaureate_score: "",
    scholarship_status: "",
    origin_governorate: "",
    chosen_program: ""
  });
  
  const [result, setResult] = useState<SegmentationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scholarshipOptions = ["Full Scholarship", "Partial Scholarship", "Self-Funded"];
  
  const governorateOptions = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
    "Béja", "Jendouba", "Kef", "Siliana", "Sousse", "Monastir", "Mahdia",
    "Sfax", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabès", "Medenine",
    "Tataouine", "Gafsa", "Tozeur", "Kebili"
  ];
  
  const programOptions = [
    "Cybersecurity", "Software Engineering", "Data Science", "AI & Machine Learning",
    "Business Management", "Finance", "Marketing", "Civil Engineering",
    "Mechanical Engineering", "Electrical Engineering", "Preparatory Classes",
    "Computer Networks", "Information Systems"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/student/segment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baccalaureate_score: parseFloat(formData.baccalaureate_score),
          scholarship_status: formData.scholarship_status,
          origin_governorate: formData.origin_governorate,
          chosen_program: formData.chosen_program
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get segmentation result");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getClusterColor = (cluster: number) => {
    if (cluster === 2) return "#10b981"; // Green for high performer
    if (cluster === 0) return "#3b82f6"; // Blue for middle tier
    return "#f59e0b"; // Orange for low academic level
  };

  const getClusterIcon = (cluster: number) => {
    if (cluster === 2) return <Award className="h-6 w-6" />;
    if (cluster === 0) return <TrendingUp className="h-6 w-6" />;
    return <Users className="h-6 w-6" />;
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 flex items-center">
            <Users className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            Student Segmentation
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Discover your academic and financial profile cluster
          </p>
        </div>

      {/* Input Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Baccalaureate Score */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                <GraduationCap className="inline h-5 w-5 mr-2" style={{ color: '#b20000' }} />
                Baccalaureate Score
              </label>
              <input
                type="number"
                required
                min="0"
                max="20"
                step="0.01"
                value={formData.baccalaureate_score}
                onChange={(e) => setFormData({...formData, baccalaureate_score: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
                placeholder="e.g., 15.5"
              />
              <p className="text-sm text-gray-600 mt-1">Score out of 20</p>
            </div>

            {/* Scholarship Status */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                <Award className="inline h-5 w-5 mr-2" style={{ color: '#b20000' }} />
                Scholarship Status
              </label>
              <select
                required
                value={formData.scholarship_status}
                onChange={(e) => setFormData({...formData, scholarship_status: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
              >
                <option value="">Select scholarship status</option>
                {scholarshipOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Origin Governorate */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                <MapPin className="inline h-5 w-5 mr-2" style={{ color: '#b20000' }} />
                Origin Governorate
              </label>
              <select
                required
                value={formData.origin_governorate}
                onChange={(e) => setFormData({...formData, origin_governorate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
              >
                <option value="">Select governorate</option>
                {governorateOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Chosen Program */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                <GraduationCap className="inline h-5 w-5 mr-2" style={{ color: '#b20000' }} />
                Chosen Program
              </label>
              <select
                required
                value={formData.chosen_program}
                onChange={(e) => setFormData({...formData, chosen_program: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-gray-900"
              >
                <option value="">Select program</option>
                {programOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
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
                Analyzing Profile...
              </>
            ) : (
              "Analyze My Profile"
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
        <>
          {/* Cluster Badge */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                style={{ backgroundColor: getClusterColor(result.cluster) + '20' }}
              >
                <div style={{ color: getClusterColor(result.cluster) }}>
                  {getClusterIcon(result.cluster)}
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {result.cluster_name}
              </h2>
              <p className="text-lg text-gray-700">
                Cluster {result.cluster}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" style={{ color: '#b20000' }} />
                  <div>
                    <p className="text-sm text-gray-600">Baccalaureate Score</p>
                    <p className="font-semibold text-gray-900">{result.baccalaureate_score} / 20</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" style={{ color: '#b20000' }} />
                  <div>
                    <p className="text-sm text-gray-600">Scholarship Status</p>
                    <p className="font-semibold text-gray-900">{result.scholarship_status}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" style={{ color: '#b20000' }} />
                  <div>
                    <p className="text-sm text-gray-600">Origin Governorate</p>
                    <p className="font-semibold text-gray-900">{result.origin_governorate}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5" style={{ color: '#b20000' }} />
                  <div>
                    <p className="text-sm text-gray-600">Chosen Program</p>
                    <p className="font-semibold text-gray-900">{result.chosen_program}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cluster Characteristics */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Cluster Characteristics</h3>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-700">{result.cluster_characteristics.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Typical Baccalaureate Range</h4>
                  <p className="text-2xl font-bold" style={{ color: getClusterColor(result.cluster) }}>
                    {result.cluster_characteristics.typical_bac_score_range}
                  </p>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Common Scholarship Type</h4>
                  <p className="text-2xl font-bold" style={{ color: getClusterColor(result.cluster) }}>
                    {result.cluster_characteristics.common_scholarship}
                  </p>
                </div>
              </div>

              <div className="p-6 bg-blue-50 border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-2">What This Means</h4>
                <p className="text-blue-800">
                  {result.cluster === 2 && "You are part of our top-performing student group! Continue your excellent academic work and take advantage of leadership opportunities."}
                  {result.cluster === 0 && "You are part of our solid mid-tier student group. Focus on maintaining consistent performance and exploring growth opportunities."}
                  {result.cluster === 1 && "You have room for academic improvement. Consider seeking tutoring support, study groups, and academic counseling to enhance your performance."}
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
