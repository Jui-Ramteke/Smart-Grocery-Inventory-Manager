import { useEffect, useState } from "react";
import { getAlerts } from "../../services/alertService";

const Alerts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const data = await getAlerts();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const lowStockItems = items.filter(
    (item) => item.status === "Low Stock"
  );

  const expiringItems = items.filter(
    (item) => item.status === "Expiring"
  );

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Alerts Center
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor inventory issues and warnings.
        </p>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-gray-500">
            Total Alerts
          </h3>

          <p className="text-4xl font-bold text-red-500 mt-2">
            {lowStockItems.length +
              expiringItems.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-gray-500">
            Low Stock
          </h3>

          <p className="text-4xl font-bold text-red-500 mt-2">
            {lowStockItems.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <h3 className="text-gray-500">
            Expiring Soon
          </h3>

          <p className="text-4xl font-bold text-amber-500 mt-2">
            {expiringItems.length}
          </p>
        </div>
      </div>

      {/* Low Stock Section */}

      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <h2 className="text-2xl font-bold mb-5 text-red-500">
          Low Stock Alerts
        </h2>

        {lowStockItems.length === 0 ? (
          <p className="text-gray-500">
            No low stock items found.
          </p>
        ) : (
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div
                key={item._id}
                className="bg-red-50 border border-red-200 rounded-xl p-4"
              >
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-600">
                  Quantity: {item.quantity}{" "}
                  {item.unit}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Expiry Section */}

      <div className="bg-white rounded-2xl shadow-sm p-6 border">
        <h2 className="text-2xl font-bold mb-5 text-amber-500">
          Expiring Soon
        </h2>

        {expiringItems.length === 0 ? (
          <p className="text-gray-500">
            No expiring items found.
          </p>
        ) : (
          <div className="space-y-4">
            {expiringItems.map((item) => (
              <div
                key={item._id}
                className="bg-amber-50 border border-amber-200 rounded-xl p-4"
              >
                <h3 className="font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-600">
                  Expiry Date:{" "}
                  {new Date(
                    item.expiryDate
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;