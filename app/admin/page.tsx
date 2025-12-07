import Link from "next/link";
import { PieChart, TrendingUp, Brain } from "lucide-react";

export default function AdminPortal() {
  const features = [
    {
      title: "Financial Segmentation",
      description: "Analyze student distribution by financial groups and revenue patterns",
      icon: PieChart,
      href: "/admin/segmentation",
      color: "bg-gray-100",
      iconColor: "#1f2937",
    },
    {
      title: "Enrollment Forecasting",
      description: "Predict future enrollment trends and plan institutional resources",
      icon: TrendingUp,
      href: "/admin/enrollment",
      color: "bg-red-100",
      iconColor: "#b20000",
    },
    {
      title: "Performance Prediction",
      description: "Identify at-risk students and predict academic performance",
      icon: Brain,
      href: "/admin/performance",
      color: "bg-gray-100",
      iconColor: "#1f2937",
    },
  ];

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Admin Portal</h1>
          <p className="text-lg text-white drop-shadow-md">
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
