import Link from "next/link";
import { AlertCircle, Brain, Users } from "lucide-react";

export default function StudentPortal() {
  const features = [
    {
      title: "Dropout Risk Calculator",
      description: "Calculate your dropout risk based on academic and personal factors",
      icon: AlertCircle,
      href: "/student/dropout",
      color: "bg-red-100",
      iconColor: "#b20000",
    },
    {
      title: "Program Recommender",
      description: "Find programs that match your interests and career goals",
      icon: Brain,
      href: "/student/recommender",
      color: "bg-gray-100",
      iconColor: "#374151",
    },
    {
      title: "TA Eligibility Checker",
      description: "Check your eligibility to become a teaching assistant",
      icon: Users,
      href: "/student/ta-eligibility",
      color: "bg-red-100",
      iconColor: "#b20000",
    },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Student Portal</h1>
          <p className="text-lg text-white drop-shadow-md">
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
                className="bg-gray-900/60 backdrop-blur-md rounded-xl shadow-2xl hover:shadow-xl transition-all p-6 border border-white/30 hover:border-white/50"
              >
                <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6" style={{ color: feature.iconColor }} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-200">{feature.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
