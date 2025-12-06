import Link from "next/link";
import { GraduationCap, LayoutDashboard, Brain, TrendingUp, Users, Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            ESPRIT ML Platform
          </h1>
          <p className="text-xl text-white mb-8 drop-shadow-md">
            Machine Learning-Powered Student Analytics & Institutional Decision-Making
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/student"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
            >
              Student Portal
            </Link>
            <Link
              href="/admin"
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition-colors shadow-lg"
            >
              Admin Portal
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <GraduationCap className="h-10 w-10 text-red-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Student Portal</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Calculator className="h-6 w-6 text-red-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold">Dropout Risk Calculator</h3>
                  <p className="text-gray-600 text-sm">Get personalized risk assessment and recommendations</p>
                </div>
              </li>
              <li className="flex items-start">
                <Brain className="h-6 w-6 text-red-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold">Program Recommender</h3>
                  <p className="text-gray-600 text-sm">Find the best programs matching your interests</p>
                </div>
              </li>
              <li className="flex items-start">
                <Users className="h-6 w-6 text-red-600 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold">TA Eligibility Checker</h3>
                  <p className="text-gray-600 text-sm">Check if you qualify to become a teaching assistant</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <LayoutDashboard className="h-10 w-10 text-gray-900 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Users className="h-6 w-6 text-gray-900 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold">Financial Segmentation</h3>
                  <p className="text-gray-600 text-sm">Analyze student distribution by financial groups</p>
                </div>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-6 w-6 text-gray-900 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold">Enrollment Forecasting</h3>
                  <p className="text-gray-600 text-sm">Predict future enrollment trends and plan resources</p>
                </div>
              </li>
              <li className="flex items-start">
                <Brain className="h-6 w-6 text-gray-900 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold">Performance Prediction</h3>
                  <p className="text-gray-600 text-sm">Identify at-risk students and predict performance</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Powered by Machine Learning</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">K-Neighbors Classifier</span>
            <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">Hierarchical Clustering</span>
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">Logistic Regression</span>
            <span className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full">Linear Regression</span>
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full">Random Forest</span>
          </div>
        </div>
      </div>
    </div>
  );
}
