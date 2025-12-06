"use client";

import { useState } from "react";
import { Brain, Sparkles } from "lucide-react";

interface ProgramMatch {
  name: string;
  matchPercentage: number;
  description: string;
  strengths: string[];
  careerPaths: string[];
}

export default function ProgramRecommender() {
  const [formData, setFormData] = useState({
    interests: [] as string[],
    strengths: [] as string[],
    careerGoal: "",
  });
  
  const [results, setResults] = useState<ProgramMatch[]>([]);
  const [showResults, setShowResults] = useState(false);

  const interestOptions = [
    "Technology & Programming",
    "Business & Management",
    "Data Science & Analytics",
    "Creative Design",
    "Engineering",
    "Healthcare",
    "Education",
    "Research & Science",
  ];

  const strengthOptions = [
    "Problem Solving",
    "Communication",
    "Leadership",
    "Analytical Thinking",
    "Creativity",
    "Technical Skills",
    "Teamwork",
    "Mathematics",
  ];

  const programs = [
    {
      name: "Computer Science",
      keywords: ["technology", "programming", "technical", "problem solving", "analytical"],
      description: "Build software, algorithms, and cutting-edge technology solutions",
      careerPaths: ["Software Engineer", "Data Scientist", "Systems Architect", "AI Specialist"],
    },
    {
      name: "Business Administration",
      keywords: ["business", "management", "leadership", "communication"],
      description: "Develop business strategy, management, and entrepreneurial skills",
      careerPaths: ["Business Analyst", "Project Manager", "Consultant", "Entrepreneur"],
    },
    {
      name: "Data Analytics",
      keywords: ["data", "analytics", "analytical", "mathematics", "technical"],
      description: "Analyze complex data to drive business insights and decisions",
      careerPaths: ["Data Analyst", "Business Intelligence Analyst", "Analytics Consultant"],
    },
    {
      name: "Graphic Design",
      keywords: ["creative", "design", "communication", "creativity"],
      description: "Create visual content for digital and print media",
      careerPaths: ["UI/UX Designer", "Brand Designer", "Creative Director", "Art Director"],
    },
    {
      name: "Software Engineering",
      keywords: ["technology", "programming", "engineering", "problem solving", "technical"],
      description: "Design and develop scalable software systems and applications",
      careerPaths: ["Full-Stack Developer", "DevOps Engineer", "Solutions Architect"],
    },
    {
      name: "Marketing",
      keywords: ["business", "communication", "creativity", "analytical"],
      description: "Develop strategies to promote products and build brand awareness",
      careerPaths: ["Marketing Manager", "Digital Marketing Specialist", "Brand Strategist"],
    },
    {
      name: "Cybersecurity",
      keywords: ["technology", "technical", "problem solving", "analytical"],
      description: "Protect systems and networks from digital threats and attacks",
      careerPaths: ["Security Analyst", "Penetration Tester", "Security Architect"],
    },
    {
      name: "Finance",
      keywords: ["business", "analytical", "mathematics", "problem solving"],
      description: "Manage financial planning, investments, and risk assessment",
      careerPaths: ["Financial Analyst", "Investment Banker", "Risk Manager"],
    },
  ];

  const toggleInterest = (interest: string) => {
    if (formData.interests.includes(interest)) {
      setFormData({
        ...formData,
        interests: formData.interests.filter((i) => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...formData.interests, interest],
      });
    }
  };

  const toggleStrength = (strength: string) => {
    if (formData.strengths.includes(strength)) {
      setFormData({
        ...formData,
        strengths: formData.strengths.filter((s) => s !== strength),
      });
    } else {
      setFormData({
        ...formData,
        strengths: [...formData.strengths, strength],
      });
    }
  };

  const calculateMatches = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock ML recommendation logic
    const userKeywords = [
      ...formData.interests.map(i => i.toLowerCase()),
      ...formData.strengths.map(s => s.toLowerCase()),
      formData.careerGoal.toLowerCase(),
    ].join(" ");

    const matches = programs.map((program) => {
      let score = 0;
      
      program.keywords.forEach((keyword) => {
        if (userKeywords.includes(keyword)) {
          score += 20;
        }
      });
      
      // Add randomness for demo purposes
      score += Math.floor(Math.random() * 20);
      
      const matchPercentage = Math.min(score, 95);
      
      return {
        ...program,
        matchPercentage,
        strengths: formData.strengths.slice(0, 3),
      };
    });

    // Sort by match percentage and take top 5
    const topMatches = matches
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 5);
    
    setResults(topMatches);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 flex items-center">
            <Brain className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            Program Recommender
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Discover programs that match your interests and career aspirations
          </p>
        </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <form onSubmit={calculateMatches} className="space-y-8">
          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              What are your interests?
            </label>
            <div className="grid md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    formData.interests.includes(interest)
                      ? "border-gray-700 font-semibold"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={formData.interests.includes(interest) ? { backgroundColor: '#b20000', color: 'white' } : {}}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              What are your strengths?
            </label>
            <div className="grid md:grid-cols-4 gap-3">
              {strengthOptions.map((strength) => (
                <button
                  key={strength}
                  type="button"
                  onClick={() => toggleStrength(strength)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    formData.strengths.includes(strength)
                      ? "border-gray-700 bg-gray-700 text-white font-semibold"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {strength}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-900 mb-2">
              What's your career goal?
            </label>
            <textarea
              required
              value={formData.careerGoal}
              onChange={(e) => setFormData({ ...formData, careerGoal: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              placeholder="Describe your dream job or career path..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
            style={{ backgroundColor: '#b20000' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#8a0000'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#b20000'}
          >
            <Sparkles className="h-5 w-5 mr-2" />
            Get Recommendations
          </button>
        </form>
      </div>

      {showResults && results.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your Top Program Matches
          </h2>
          <div className="space-y-6">
            {results.map((program, index) => (
              <div
                key={program.name}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4"
                style={{
                  borderLeftColor:
                    index === 0
                      ? "#b20000"
                      : index === 1
                      ? "#d32f2f"
                      : "#ff5252",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-gray-400 mr-3">
                        #{index + 1}
                      </span>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {program.name}
                      </h3>
                    </div>
                    <p className="text-gray-600 mt-2">{program.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold" style={{ color: '#b20000' }}>
                      {program.matchPercentage}%
                    </div>
                    <div className="text-sm text-gray-500">Match</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{ width: `${program.matchPercentage}%`, backgroundColor: '#b20000' }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Your Relevant Strengths:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {program.strengths.map((strength) => (
                        <span
                          key={strength}
                          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Career Paths:
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {program.careerPaths.map((path) => (
                        <li key={path}>• {path}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
