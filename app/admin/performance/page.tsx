"use client";

import { useState } from "react";
import { Brain, AlertTriangle, CheckCircle, TrendingDown } from "lucide-react";

interface Student {
  id: number;
  name: string;
  gpa: number;
  predictedGPA: number;
  performance: "High" | "Medium" | "Low";
  atRiskCourses: string[];
  confidence: number;
}

export default function PerformancePrediction() {
  const [filterPerformance, setFilterPerformance] = useState("all");
  
  // Mock student data
  const students: Student[] = [
    {
      id: 1,
      name: "Alice Johnson",
      gpa: 3.8,
      predictedGPA: 3.85,
      performance: "High",
      atRiskCourses: [],
      confidence: 92,
    },
    {
      id: 2,
      name: "Bob Smith",
      gpa: 2.9,
      predictedGPA: 2.6,
      performance: "Low",
      atRiskCourses: ["Calculus II", "Physics I"],
      confidence: 88,
    },
    {
      id: 3,
      name: "Carol Davis",
      gpa: 3.4,
      predictedGPA: 3.5,
      performance: "High",
      atRiskCourses: [],
      confidence: 85,
    },
    {
      id: 4,
      name: "David Wilson",
      gpa: 3.1,
      predictedGPA: 2.9,
      performance: "Medium",
      atRiskCourses: ["Data Structures"],
      confidence: 79,
    },
    {
      id: 5,
      name: "Emma Brown",
      gpa: 2.5,
      predictedGPA: 2.3,
      performance: "Low",
      atRiskCourses: ["Algorithms", "Database Systems", "Operating Systems"],
      confidence: 91,
    },
    {
      id: 6,
      name: "Frank Miller",
      gpa: 3.6,
      predictedGPA: 3.7,
      performance: "High",
      atRiskCourses: [],
      confidence: 87,
    },
    {
      id: 7,
      name: "Grace Lee",
      gpa: 3.0,
      predictedGPA: 2.8,
      performance: "Medium",
      atRiskCourses: ["Statistics"],
      confidence: 83,
    },
    {
      id: 8,
      name: "Henry Taylor",
      gpa: 2.7,
      predictedGPA: 2.5,
      performance: "Low",
      atRiskCourses: ["Linear Algebra", "Discrete Math"],
      confidence: 86,
    },
  ];

  const filteredStudents = filterPerformance === "all" 
    ? students 
    : students.filter(s => s.performance.toLowerCase() === filterPerformance);

  const stats = {
    total: students.length,
    high: students.filter(s => s.performance === "High").length,
    medium: students.filter(s => s.performance === "Medium").length,
    low: students.filter(s => s.performance === "Low").length,
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "High": return "bg-green-100 text-green-700 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low": return "bg-red-100 text-red-700 border-red-200";
      default: return "";
    }
  };

  const getPerformanceIcon = (performance: string) => {
    switch (performance) {
      case "High": return <CheckCircle className="h-5 w-5" />;
      case "Medium": return <AlertTriangle className="h-5 w-5" />;
      case "Low": return <TrendingDown className="h-5 w-5" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center">
          <Brain className="h-10 w-10 text-blue-600 mr-3" />
          Performance Prediction
        </h1>
        <p className="text-lg text-gray-600">
          Identify at-risk students and predict academic performance
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-green-700 mb-1">{stats.high}</div>
          <div className="text-sm text-green-600 font-medium">High Performers</div>
        </div>

        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-yellow-700 mb-1">{stats.medium}</div>
          <div className="text-sm text-yellow-600 font-medium">Medium Performers</div>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
          <div className="text-3xl font-bold text-red-700 mb-1">{stats.low}</div>
          <div className="text-sm text-red-600 font-medium">At-Risk Students</div>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Student Performance List</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setFilterPerformance("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterPerformance === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterPerformance("high")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterPerformance === "high"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              High
            </button>
            <button
              onClick={() => setFilterPerformance("medium")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterPerformance === "medium"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setFilterPerformance("low")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterPerformance === "low"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Low
            </button>
          </div>
        </div>
      </div>

      {/* Student Cards */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
                <p className="text-sm text-gray-600">Student ID: {student.id}</p>
              </div>
              <div className={`px-4 py-2 rounded-lg border-2 ${getPerformanceColor(student.performance)} flex items-center font-semibold`}>
                {getPerformanceIcon(student.performance)}
                <span className="ml-2">{student.performance} Performer</span>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Current GPA</div>
                <div className="text-2xl font-bold text-gray-900">{student.gpa.toFixed(2)}</div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Predicted GPA</div>
                <div className="text-2xl font-bold text-blue-600">{student.predictedGPA.toFixed(2)}</div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Confidence</div>
                <div className="text-2xl font-bold text-purple-600">{student.confidence}%</div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">At-Risk Courses</div>
                <div className="text-2xl font-bold text-orange-600">{student.atRiskCourses.length}</div>
              </div>
            </div>

            {student.atRiskCourses.length > 0 && (
              <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded">
                <h4 className="font-semibold text-red-900 mb-2">⚠️ At-Risk Courses:</h4>
                <div className="flex flex-wrap gap-2">
                  {student.atRiskCourses.map((course, index) => (
                    <span
                      key={index}
                      className="bg-white text-red-700 px-3 py-1 rounded-full text-sm font-medium border border-red-200"
                    >
                      {course}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                    Flag for Intervention
                  </button>
                  <button className="bg-white text-red-600 border-2 border-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                    Contact Advisor
                  </button>
                </div>
              </div>
            )}

            {student.performance === "High" && (
              <div className="p-4 bg-green-50 border-l-4 border-green-400 rounded">
                <h4 className="font-semibold text-green-900 mb-1">✓ Excellent Performance</h4>
                <p className="text-sm text-green-700">
                  This student is performing well and shows positive trajectory. Consider for peer tutoring or TA positions.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
