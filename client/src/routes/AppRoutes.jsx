import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import GroceryList from "../pages/GroceryList/GroceryList";
import Inventory from "../pages/Inventory/Inventory";
import ShoppingList from "../pages/ShoppingList/ShoppingList";
import Alerts from "../pages/Alerts/Alerts";
import Analytics from "../pages/Analytics/Analytics";
import Settings from "../pages/Settings/Settings";
import Reports from "../pages/Reports/Reports";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<Dashboard />} />

      {/* Grocery List */}
      <Route
        path="/grocery-list"
        element={<GroceryList />}
      />

      {/* Inventory */}
      <Route
        path="/inventory"
        element={<Inventory />}
      />

      {/* Shopping List */}
      <Route
        path="/shopping-list"
        element={<ShoppingList />}
      />

      {/* Alerts */}
      <Route
        path="/alerts"
        element={<Alerts />}
      />

      {/* Analytics */}
      <Route
        path="/analytics"
        element={<Analytics />}
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={<Settings />}
      />
      <Route
  path="/reports"
  element={<Reports />}
/>

      {/* Fallback Route */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;