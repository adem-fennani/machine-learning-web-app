import Link from "next/link";
import { PieChart, TrendingUp, Brain } from "lucide-react";

export default function AdminPortal() {
  const features = [
    {
      title: "Financial Segmentation",
      description: "Analyze student distribution by financial groups and revenue patterns",
      icon: PieChart,
      href: "/admin/segmentation",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Enrollment Forecasting",
      description: "Predict future enrollment trends and plan institutional resources",
      icon: TrendingUp,
      href: "/admin/enrollment",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Performance Prediction",
      description: "Identify at-risk students and predict academic performance",
      icon: Brain,
      href: "/admin/performance",
      color: "bg-blue-100 text-blue-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Portal</h1>
        <p className="text-lg text-gray-600">
          Data-driven insights for institutional decision-making
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
