import { useState } from "react";


const Settings = () => {
  

  const [settings, setSettings] =
    useState({
      storeName: "Smart Grocery",
      ownerName: "Admin",
      email: "admin@gmail.com",
      phone: "9876543210",
      lowStockThreshold: 5,
      expiryAlertDays: 7,
      stockAlerts: true,
      expiryAlerts: true,
    });

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setSettings({
      ...settings,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const saveSettings = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    alert(
      "Settings saved successfully"
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage application settings.
        </p>
      </div>

      {/* General Settings */}

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-2xl font-semibold mb-6">
          General Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="storeName"
            value={settings.storeName}
            onChange={handleChange}
            placeholder="Store Name"
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="ownerName"
            value={settings.ownerName}
            onChange={handleChange}
            placeholder="Owner Name"
            className="border rounded-xl p-3"
          />

          <input
            type="email"
            name="email"
            value={settings.email}
            onChange={handleChange}
            placeholder="Email"
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border rounded-xl p-3"
          />
        </div>
      </div>

      {/* Inventory Settings */}

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-2xl font-semibold mb-6">
          Inventory Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="number"
            name="lowStockThreshold"
            value={
              settings.lowStockThreshold
            }
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            type="number"
            name="expiryAlertDays"
            value={
              settings.expiryAlertDays
            }
            onChange={handleChange}
            className="border rounded-xl p-3"
          />
        </div>
      </div>

      {/* Notifications */}

      <div className="bg-white rounded-2xl p-6 shadow-sm border">
        <h2 className="text-2xl font-semibold mb-6">
          Notifications
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="stockAlerts"
              checked={
                settings.stockAlerts
              }
              onChange={handleChange}
            />

            Enable Low Stock Alerts
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="expiryAlerts"
              checked={
                settings.expiryAlerts
              }
              onChange={handleChange}
            />

            Enable Expiry Alerts
          </label>
        </div>
      </div>

      {/* Appearance */}

      

      {/* Save Button */}

      <button
        onClick={saveSettings}
        className="bg-emerald-500 text-white px-6 py-3 rounded-xl hover:bg-emerald-600 transition"
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;