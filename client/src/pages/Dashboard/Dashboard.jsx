// client/src/pages/dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  CubeIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import StatCard from "../../components/dashboard/StatCard";
import { getDashboardStats } from "../../services/dashboardService";
import { generateShoppingList } from "../../services/shoppingService";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateList = async () => {
    try {
      const result = await generateShoppingList();

      // If backend doesn’t send addedItems, avoid crash
      const count = result?.addedItems ?? 0;
      alert(`${count} items added to shopping list`);

      navigate("/shopping");
    } catch (error) {
      console.error(error);
      alert("Failed to generate shopping list");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  const totalItems = stats.totalItems ?? 0;
  const lowStock = stats.lowStock ?? 0;
  const expiring = stats.expiring ?? 0;
  const critical = stats.critical ?? 0;
  const recentItems = stats.recentItems ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your grocery inventory efficiently.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Items"
          value={totalItems}
          subtitle="Inventory Count"
          color="bg-emerald-100"
          icon={
            <CubeIcon className="h-7 w-7 text-emerald-600" />
          }
        />

        <StatCard
          title="Low Stock"
          value={lowStock}
          subtitle="Need Attention"
          color="bg-red-100"
          icon={
            <ExclamationTriangleIcon className="h-7 w-7 text-red-600" />
          }
        />

        <StatCard
          title="Expiring Soon"
          value={expiring}
          subtitle="Expiry Alerts"
          color="bg-amber-100"
          icon={
            <CalendarDaysIcon className="h-7 w-7 text-amber-600" />
          }
        />

        <StatCard
          title="Critical Items"
          value={critical}
          subtitle="Immediate Action"
          color="bg-purple-100"
          icon={
            <ShieldCheckIcon className="h-7 w-7 text-purple-600" />
          }
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <button
            onClick={() => navigate("/grocery")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-xl transition font-medium"
          >
            Add Item
          </button>

          <button
            onClick={() => navigate("/inventory")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-xl transition font-medium"
          >
            Update Stock
          </button>

          <button
            onClick={handleGenerateList}
            className="bg-teal-500 hover:bg-teal-600 text-white p-4 rounded-xl transition font-medium"
          >
            Generate List
          </button>

          <button
            onClick={() => navigate("/alerts")}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition font-medium"
          >
            View Alerts
          </button>
        </div>
      </div>

      {/* Recent Inventory */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6">
          Recent Inventory
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-4">Item</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Quantity</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentItems.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4">{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.quantity} {item.unit}
                  </td>
                  <td>{item.status}</td>
                </tr>
              ))}
              {recentItems.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="py-4 text-center text-gray-500"
                  >
                    No recent items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">
            Low Stock Items
          </h2>

          <div className="space-y-4">
            {recentItems.filter(
              (item) => item.status === "Low Stock"
            ).length === 0 && (
              <p className="text-gray-500">
                No low stock items found.
              </p>
            )}

            {recentItems
              .filter((item) => item.status === "Low Stock")
              .map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between"
                >
                  <span>{item.name}</span>
                  <span className="text-red-500">
                    {item.quantity}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Expiring */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">
            Expiring Soon
          </h2>

          <div className="space-y-4">
            {recentItems.filter(
              (item) => item.status === "Expiring"
            ).length === 0 && (
              <p className="text-gray-500">
                No expiring items found.
              </p>
            )}

            {recentItems
              .filter((item) => item.status === "Expiring")
              .map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between"
                >
                  <span>{item.name}</span>
                  <span className="text-amber-500">
                    Expiring
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;