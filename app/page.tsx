import Link from "next/link";
import { GraduationCap, LayoutDashboard, Brain, TrendingUp, Users, Calculator } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Stratus
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
          <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/30 transition-all duration-300 hover:bg-gray-700/50 hover:border-white/50">
            <div className="flex items-center mb-6">
              <GraduationCap className="h-10 w-10 text-white mr-3" style={{ color: '#b20000' }} />
              <h2 className="text-2xl font-bold text-white">Student Portal</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Calculator className="h-6 w-6 mr-3 mt-1" style={{ color: '#b20000' }} />
                <div>
                  <h3 className="font-semibold text-white">Dropout Risk Calculator</h3>
                  <p className="text-gray-200 text-sm">Get personalized risk assessment and recommendations</p>
                </div>
              </li>
              <li className="flex items-start">
                <Brain className="h-6 w-6 mr-3 mt-1" style={{ color: '#b20000' }} />
                <div>
                  <h3 className="font-semibold text-white">Program Recommender</h3>
                  <p className="text-gray-200 text-sm">Find the best programs matching your interests</p>
                </div>
              </li>
              <li className="flex items-start">
                <Users className="h-6 w-6 mr-3 mt-1" style={{ color: '#b20000' }} />
                <div>
                  <h3 className="font-semibold text-white">TA Eligibility Checker</h3>
                  <p className="text-gray-200 text-sm">Check if you qualify to become a teaching assistant</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-white/30 transition-all duration-300 hover:bg-gray-700/50 hover:border-white/50">
            <div className="flex items-center mb-6">
              <LayoutDashboard className="h-10 w-10 text-white mr-3" />
              <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Users className="h-6 w-6 text-gray-200 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Financial Segmentation</h3>
                  <p className="text-gray-200 text-sm">Analyze student distribution by financial groups</p>
                </div>
              </li>
              <li className="flex items-start">
                <TrendingUp className="h-6 w-6 text-gray-200 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Enrollment Forecasting</h3>
                  <p className="text-gray-200 text-sm">Predict future enrollment trends and plan resources</p>
                </div>
              </li>
              <li className="flex items-start">
                <Brain className="h-6 w-6 text-gray-200 mr-3 mt-1" />
                <div>
                  <h3 className="font-semibold text-white">Performance Prediction</h3>
                  <p className="text-gray-200 text-sm">Identify at-risk students and predict performance</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center border border-white/30 transition-all duration-300 hover:bg-gray-700/50 hover:border-white/50">
          <h3 className="text-xl font-bold text-white mb-4">Powered by Machine Learning</h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full border border-white/30" style={{ borderColor: '#b20000' }}>K-Neighbors Classifier</span>
            <span className="bg-white/20 text-white px-4 py-2 rounded-full border border-white/30">Hierarchical Clustering</span>
            <span className="bg-white/20 text-white px-4 py-2 rounded-full border border-white/30" style={{ borderColor: '#b20000' }}>Logistic Regression</span>
            <span className="bg-white/20 text-white px-4 py-2 rounded-full border border-white/30">Linear Regression</span>
            <span className="bg-white/20 text-white px-4 py-2 rounded-full border border-white/30" style={{ borderColor: '#b20000' }}>Random Forest</span>
          </div>
        </div>
      </div>
    </div>
  );
}
