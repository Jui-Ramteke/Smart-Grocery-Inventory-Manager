import {
  HomeIcon,
  ClipboardDocumentListIcon,
  CubeIcon,
  ShoppingCartIcon,
  BellAlertIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: HomeIcon,
    },
    {
      name: "Grocery List",
      path: "/grocery-list",
      icon: ClipboardDocumentListIcon,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: CubeIcon,
    },
    {
      name: "Shopping List",
      path: "/shopping-list",
      icon: ShoppingCartIcon,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: BellAlertIcon,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: ChartBarIcon,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Cog6ToothIcon,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: DocumentArrowDownIcon,
    },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 min-h-screen flex flex-col justify-between p-5">
      <div>
        <h1 className="text-4xl font-bold text-emerald-600 mb-10">
          SmartGrocery
        </h1>

        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-4 rounded-xl transition-all duration-200 font-medium ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700 shadow-sm"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="h-6 w-6" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">
          Quick Stats
        </h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">
              Total Items
            </span>

            <span className="font-semibold">
              45
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-red-500">
              Low Stock
            </span>

            <span className="font-semibold text-red-500">
              7
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-amber-500">
              Expiring Soon
            </span>

            <span className="font-semibold text-amber-500">
              4
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;