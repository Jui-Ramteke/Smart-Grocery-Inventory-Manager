import { useEffect, useState } from "react";

import {
  MagnifyingGlassIcon,
  BellIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  getNotifications,
} from "../../services/notificationService";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications,
    setShowNotifications] =
    useState(false);

  const [notifications,
    setNotifications] =
    useState({
      count: 0,
      lowStock: [],
      expiring: [],
    });

  const pageTitles = {
    "/": "Dashboard",
    "/grocery-list": "Grocery List",
    "/inventory": "Inventory",
    "/shopping-list": "Shopping List",
    "/alerts": "Alerts",
    "/analytics": "Analytics",
    "/settings": "Settings",
    "/reports": "Reports",
  };

  const currentTitle =
    pageTitles[location.pathname] ||
    "Dashboard";

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    setShowNotifications(false);
  }, [location.pathname]);

  const fetchNotifications =
    async () => {
      try {
        const data =
          await getNotifications();

        setNotifications(data);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">

        <h1 className="text-3xl font-bold text-gray-900">
          {currentTitle}
        </h1>

        <div className="flex items-center gap-4">

          {/* Search */}

          <div className="hidden md:flex items-center border border-gray-300 rounded-xl px-4 py-2 bg-gray-50">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search..."
              className="ml-2 bg-transparent outline-none"
            />
          </div>

          {/* Add Item */}

          <button
            onClick={() =>
              navigate("/grocery-list")
            }
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
          >
            <PlusIcon className="h-5 w-5" />
            Add Item
          </button>

          {/* Notifications */}

          <div className="relative">
            <button
              onClick={() =>
                setShowNotifications(
                  !showNotifications
                )
              }
              className="relative"
            >
              <BellIcon className="h-7 w-7 text-gray-600" />

              {notifications.count >
                0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 h-4 w-4 rounded-full text-white text-xs flex items-center justify-center">
                  {
                    notifications.count
                  }
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-4 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                <h3 className="font-bold text-lg mb-4">
                  Notifications
                </h3>

                {notifications.lowStock
                  ?.length > 0 && (
                  <>
                    <h4 className="text-red-500 font-semibold mb-2">
                      Low Stock
                    </h4>

                    <ul className="mb-4">
                      {notifications.lowStock.map(
                        (item) => (
                          <li
                            key={
                              item._id
                            }
                            className="text-sm mb-1"
                          >
                            • {item.name}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                {notifications.expiring
                  ?.length > 0 && (
                  <>
                    <h4 className="text-amber-500 font-semibold mb-2">
                      Expiring Soon
                    </h4>

                    <ul>
                      {notifications.expiring.map(
                        (item) => (
                          <li
                            key={
                              item._id
                            }
                            className="text-sm mb-1"
                          >
                            • {item.name}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                {notifications.count ===
                  0 && (
                  <p className="text-gray-500 text-sm">
                    No notifications
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Avatar */}

          <div className="h-11 w-11 rounded-full bg-emerald-500 flex items-center justify-center text-white font-semibold cursor-pointer">
            A
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;