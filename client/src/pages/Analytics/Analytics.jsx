import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/analyticsService";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#10B981",
  "#EF4444",
  "#F59E0B",
];

const Analytics = () => {
  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!analytics) {
    return (
      <div className="text-xl">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Analytics
        </h1>

        <p className="text-gray-500 mt-2">
          Inventory insights and reports.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-500">
            Total Items
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {analytics.totalItems}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-500">
            Healthy
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            {analytics.healthyItems}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-500">
            Low Stock
          </p>

          <h2 className="text-4xl font-bold text-red-600 mt-2">
            {analytics.lowStockItems}
          </h2>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-gray-500">
            Expiring
          </p>

          <h2 className="text-4xl font-bold text-amber-600 mt-2">
            {analytics.expiringItems}
          </h2>
        </div>
      </div>

      {/* Charts */}

      <div className="grid xl:grid-cols-2 gap-6">
        {/* Pie Chart */}

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Inventory Status
          </h2>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={analytics.statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label
                >
                  {analytics.statusData.map(
                    (entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index % COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Category Distribution
          </h2>

          <div className="h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart
                data={analytics.categoryData}
              >
                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="category"
                />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#10B981"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Category Table */}

      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <h2 className="text-2xl font-bold mb-6">
          Category Analysis
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left pb-4">
                Category
              </th>

              <th className="text-left pb-4">
                Items
              </th>
            </tr>
          </thead>

          <tbody>
            {analytics.categoryData.map(
              (item, index) => (
                <tr
                  key={index}
                  className="border-b"
                >
                  <td className="py-4">
                    {item.category}
                  </td>

                  <td>
                    {item.count}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;