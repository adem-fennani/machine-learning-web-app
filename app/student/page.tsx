import Link from "next/link";
import { AlertCircle, Brain, Users } from "lucide-react";

export default function StudentPortal() {
  const features = [
    {
      title: "Dropout Risk Calculator",
      description: "Calculate your dropout risk based on academic and personal factors",
      icon: AlertCircle,
      href: "/student/dropout",
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Program Recommender",
      description: "Find programs that match your interests and career goals",
      icon: Brain,
      href: "/student/recommender",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "TA Eligibility Checker",
      description: "Check your eligibility to become a teaching assistant",
      icon: Users,
      href: "/student/ta-eligibility",
      color: "bg-green-100 text-green-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Student Portal</h1>
        <p className="text-lg text-gray-600">
          Access personalized ML-powered tools to guide your academic journey
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.href}
              href={feature.href}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-200"
            >
              <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
