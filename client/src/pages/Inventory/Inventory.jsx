import { useEffect, useState } from "react";

import { getInventoryItems } from "../../services/inventoryService";

import { exportInventory } from "../../services/exportService";

import { downloadPDF } from "../../services/pdfService";

const Inventory = () => {
  const [items, setItems] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data =
        await getInventoryItems();

      setItems(data);
    } catch (error) {
      console.error(
        "Error fetching inventory:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Statistics

  const totalItems = items.length;

  const healthyItems = items.filter(
    (item) => item.status === "Healthy"
  ).length;

  const lowStockItems = items.filter(
    (item) => item.status === "Low Stock"
  ).length;

  const expiringItems = items.filter(
    (item) => item.status === "Expiring"
  ).length;

  // Search

  const filteredItems = items.filter(
    (item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  // Status Badge

  const getStatusBadge = (status) => {
    if (status === "Healthy") {
      return (
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
          Healthy
        </span>
      );
    }

    if (status === "Low Stock") {
      return (
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
          Low Stock
        </span>
      );
    }

    return (
      <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-sm">
        Expiring
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-medium">
        Loading Inventory...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Inventory
          </h1>

          <p className="text-gray-500 mt-2">
            Inventory management page.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={exportInventory}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl"
          >
            Export Excel
          </button>

          <button
            onClick={downloadPDF}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <h3 className="text-gray-500">
            Total Items
          </h3>

          <p className="text-3xl font-bold mt-2">
            {totalItems}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <h3 className="text-gray-500">
            Healthy Items
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {healthyItems}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <h3 className="text-gray-500">
            Low Stock
          </h3>

          <p className="text-3xl font-bold text-red-600 mt-2">
            {lowStockItems}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border shadow-sm">
          <h3 className="text-gray-500">
            Expiring
          </h3>

          <p className="text-3xl font-bold text-amber-600 mt-2">
            {expiringItems}
          </p>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white p-4 rounded-2xl shadow-sm border">
        <input
          type="text"
          placeholder="Search inventory item..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full border rounded-xl p-3 outline-none"
        />
      </div>

      {/* Inventory Table */}

      <div className="bg-white rounded-2xl shadow-sm border p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">
                Item Name
              </th>

              <th className="text-left py-3">
                Category
              </th>

              <th className="text-left py-3">
                Quantity
              </th>

              <th className="text-left py-3">
                Unit
              </th>

              <th className="text-left py-3">
                Status
              </th>

              <th className="text-left py-3">
                Expiry Date
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.length >
            0 ? (
              filteredItems.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 font-medium">
                      {item.name}
                    </td>

                    <td>
                      {item.category}
                    </td>

                    <td>
                      {item.quantity}
                    </td>

                    <td>
                      {item.unit}
                    </td>

                    <td>
                      {getStatusBadge(
                        item.status
                      )}
                    </td>

                    <td>
                      {item.expiryDate
                        ? new Date(
                            item.expiryDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500"
                >
                  No inventory items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;