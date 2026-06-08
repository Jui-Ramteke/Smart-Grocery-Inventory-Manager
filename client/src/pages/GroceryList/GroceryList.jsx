import { useEffect, useState } from "react";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../../services/groceryService";

const GroceryList = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      category: "",
      quantity: "",
      unit: "Units",
      expiryDate: "",
      status: "Healthy",
    });

  // =====================
  // FETCH ITEMS
  // =====================

  const fetchItems = async () => {
    try {
      setLoading(true);

      const response =
        await getItems();

      setItems(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // =====================
  // FORM HANDLING
  // =====================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // =====================
  // ADD ITEM
  // =====================

  const openAddModal = () => {
    setEditingId(null);

    setFormData({
      name: "",
      category: "",
      quantity: "",
      unit: "Units",
      expiryDate: "",
      status: "Healthy",
    });

    setShowModal(true);
  };

  // =====================
  // EDIT ITEM
  // =====================

  const openEditModal = (item) => {
    setEditingId(item._id);

    setFormData({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      unit: item.unit,
      expiryDate:
        item.expiryDate
          ?.split("T")[0] || "",
      status: item.status,
    });

    setShowModal(true);
  };

  // =====================
  // SUBMIT
  // =====================

  const handleSubmit =
    async () => {
      try {
        if (
          !formData.name ||
          !formData.category ||
          !formData.quantity
        ) {
          alert(
            "Please fill required fields"
          );
          return;
        }

        if (editingId) {
          await updateItem(
            editingId,
            formData
          );
        } else {
          await createItem(
            formData
          );
        }

        await fetchItems();

        setShowModal(false);
      } catch (error) {
        console.error(error);
      }
    };

  // =====================
  // DELETE ITEM
  // =====================

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this item?"
        );

      if (!confirmDelete) return;

      try {
        await deleteItem(id);

        fetchItems();
      } catch (error) {
        console.error(error);
      }
    };

  // =====================
  // SEARCH
  // =====================

  const filteredItems =
    items.filter((item) =>
      item.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const getStatusBadge = (
    status
  ) => {
    if (status === "Healthy") {
      return (
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
          Healthy
        </span>
      );
    }

    if (
      status === "Low Stock"
    ) {
      return (
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">
          Low Stock
        </span>
      );
    }

    return (
      <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
        Expiring
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Grocery List
          </h1>

          <p className="text-gray-500 mt-2">
            Manage inventory
            items.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-emerald-500 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <PlusIcon className="h-5 w-5" />
          Add Item
        </button>
      </div>

      {/* SEARCH */}

      <div className="bg-white p-4 rounded-2xl border shadow-sm">
        <div className="flex items-center border rounded-xl px-4 py-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />

          <input
            type="text"
            placeholder="Search item..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="ml-3 outline-none w-full"
          />
        </div>
      </div>

      {/* LOADING */}

      {loading && (
        <div className="text-center text-lg font-semibold">
          Loading...
        </div>
      )}

      {/* EMPTY STATE */}

      {!loading &&
        filteredItems.length ===
          0 && (
          <div className="bg-white rounded-2xl border p-10 text-center">
            <h2 className="text-2xl font-bold">
              No Grocery Items
            </h2>

            <p className="text-gray-500 mt-2">
              Add your first
              grocery item.
            </p>
          </div>
        )}

      {/* ITEMS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map(
          (item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl border shadow-sm p-5"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500">
                    {
                      item.category
                    }
                  </p>
                </div>

                {getStatusBadge(
                  item.status
                )}
              </div>

              <div className="mt-4 space-y-2">
                <p>
                  <strong>
                    Quantity:
                  </strong>{" "}
                  {
                    item.quantity
                  }{" "}
                  {item.unit}
                </p>

                <p>
                  <strong>
                    Expiry:
                  </strong>{" "}
                  {item.expiryDate
                    ? new Date(
                        item.expiryDate
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() =>
                    openEditModal(
                      item
                    )
                  }
                  className="flex-1 bg-blue-500 text-white py-2 rounded-xl"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      item._id
                    )
                  }
                  className="flex-1 bg-red-500 text-white py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {/* MODAL */}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <div className="flex justify-between mb-5">
              <h2 className="text-2xl font-bold">
                {editingId
                  ? "Edit Item"
                  : "Add Item"}
              </h2>

              <button
                onClick={() =>
                  setShowModal(
                    false
                  )
                }
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Item Name"
                value={
                  formData.name
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={
                  formData.category
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={
                  formData.quantity
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="text"
                name="unit"
                placeholder="Unit"
                value={
                  formData.unit
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3"
              />

              <input
                type="date"
                name="expiryDate"
                value={
                  formData.expiryDate
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3"
              />

              <select
                name="status"
                value={
                  formData.status
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-xl p-3"
              >
                <option>
                  Healthy
                </option>
                <option>
                  Low Stock
                </option>
                <option>
                  Expiring
                </option>
              </select>

              <button
                onClick={
                  handleSubmit
                }
                className="w-full bg-emerald-500 text-white py-3 rounded-xl"
              >
                {editingId
                  ? "Update Item"
                  : "Add Item"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroceryList;