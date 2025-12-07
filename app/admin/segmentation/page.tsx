"use client";

import { PieChart, DollarSign, Users, TrendingUp } from "lucide-react";
import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function FinancialSegmentation() {
  // Mock data for financial segments
  const segmentData = [
    { name: "Full Pay", value: 35, students: 1200, avgRevenue: 45000, color: "#10b981" },
    { name: "Partial Aid", value: 40, students: 1370, avgRevenue: 28000, color: "#3b82f6" },
    { name: "Full Aid", value: 15, students: 515, avgRevenue: 5000, color: "#f59e0b" },
    { name: "Scholarship", value: 10, students: 343, avgRevenue: 15000, color: "#8b5cf6" },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4200000 },
    { month: "Feb", revenue: 3800000 },
    { month: "Mar", revenue: 4500000 },
    { month: "Apr", revenue: 3900000 },
    { month: "May", revenue: 4100000 },
    { month: "Jun", revenue: 3700000 },
  ];

  const totalStudents = segmentData.reduce((sum, seg) => sum + seg.students, 0);
  const totalRevenue = segmentData.reduce((sum, seg) => sum + (seg.students * seg.avgRevenue), 0);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative bg-fixed" style={{ backgroundImage: "url('/background_image.png')" }}>
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2 flex items-center">
            <PieChart className="h-10 w-10 mr-3" style={{ color: '#b20000' }} />
            Financial Segmentation Dashboard
          </h1>
          <p className="text-lg text-white drop-shadow-md">
            Student distribution by financial groups and revenue analytics
          </p>
        </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8" style={{ color: '#b20000' }} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalStudents.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-gray-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${(totalRevenue / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm text-gray-600">Annual Revenue</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-gray-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            ${Math.round(totalRevenue / totalStudents).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Avg Revenue/Student</div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-gray-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {segmentData.find(s => s.name === "Full Aid")?.value}%
          </div>
          <div className="text-sm text-gray-600">Need Financial Aid</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Student Distribution by Financial Group
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RePieChart>
              <Pie
                data={segmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {segmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Monthly Revenue Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
              <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#6b7280" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segment Details Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Segment Details
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Segment</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Students</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Percentage</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Avg Revenue</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {segmentData.map((segment, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: segment.color }}
                      />
                      <span className="font-medium text-gray-900">{segment.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-3 px-4 text-gray-900">{segment.students.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 text-gray-900">{segment.value}%</td>
                  <td className="text-right py-3 px-4 text-gray-900">${segment.avgRevenue.toLocaleString()}</td>
                  <td className="text-right py-3 px-4 font-semibold text-gray-900">
                    ${(segment.students * segment.avgRevenue).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-200 font-bold text-gray-900">
                <td className="py-3 px-4">Total</td>
                <td className="text-right py-3 px-4">{totalStudents.toLocaleString()}</td>
                <td className="text-right py-3 px-4">100%</td>
                <td className="text-right py-3 px-4">-</td>
                <td className="text-right py-3 px-4">${totalRevenue.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
}
