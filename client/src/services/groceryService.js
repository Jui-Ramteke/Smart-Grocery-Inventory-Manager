import axios from "axios";

const API_URL =
  "http://localhost:5000/api/grocery";

// Get All Items
export const getItems = async () => {
  return await axios.get(API_URL);
};

// Get Single Item
export const getItemById = async (
  id
) => {
  return await axios.get(
    `${API_URL}/${id}`
  );
};

// Create Item
export const createItem = async (
  data
) => {
  return await axios.post(
    API_URL,
    data
  );
};

// Update Item
export const updateItem = async (
  id,
  data
) => {
  return await axios.put(
    `${API_URL}/${id}`,
    data
  );
};

// Delete Item
export const deleteItem = async (
  id
) => {
  return await axios.delete(
    `${API_URL}/${id}`
  );
};