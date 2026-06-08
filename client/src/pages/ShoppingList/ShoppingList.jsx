// client/src/pages/whatever-path/ShoppingList.jsx
import { useEffect, useState } from "react";
import {
  getShoppingItems,
  addShoppingItem,
  markAsPurchased,
  deleteShoppingItem,
  generateShoppingList,
} from "../../services/shoppingService";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getShoppingItems();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async () => {
    if (!newItem.trim()) return;

    try {
      await addShoppingItem({
        itemName: newItem,
      });

      setNewItem("");
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const purchaseItem = async (id) => {
    try {
      await markAsPurchased(id);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteShoppingItem(id);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const autoGenerate = async () => {
    try {
      await generateShoppingList();
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = items.filter(
    (item) => item.status === "Pending"
  ).length;

  const purchasedCount = items.filter(
    (item) => item.status === "Purchased"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">Shopping List</h1>
          <p className="text-gray-500 mt-2">Manage grocery purchases.</p>
        </div>

        <button
          onClick={autoGenerate}
          className="bg-blue-500 text-white px-5 py-3 rounded-xl"
        >
          Generate From Inventory
        </button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3>Total Items</h3>
          <p className="text-4xl font-bold mt-2">{items.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3>Pending</h3>
          <p className="text-4xl font-bold text-red-500 mt-2">
            {pendingCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3>Purchased</h3>
          <p className="text-4xl font-bold text-green-500 mt-2">
            {purchasedCount}
          </p>
        </div>
      </div>

      {/* Add Item */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <div className="flex gap-4">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add item..."
            className="flex-1 border rounded-xl p-3"
          />

          <button
            onClick={addItem}
            className="bg-emerald-500 text-white px-6 rounded-xl"
          >
            Add
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-xl p-3"
        />
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-2xl border shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Item</th>
              <th className="text-left py-4">Status</th>
              <th className="text-left py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-4">{item.itemName}</td>
                <td>{item.status}</td>
                <td className="space-x-2">
                  {item.status === "Pending" && (
                    <button
                      onClick={() => purchaseItem(item._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Purchased
                    </button>
                  )}

                  <button
                    onClick={() => removeItem(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="py-4 text-center text-gray-500"
                >
                  No items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShoppingList;