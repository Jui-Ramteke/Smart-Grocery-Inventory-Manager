// client/src/services/shoppingService.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/shopping";

// Get items
export const getShoppingItems = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add item
export const addShoppingItem = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Delete item
export const deleteShoppingItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

// Mark purchased
export const markAsPurchased = async (id) => {
  const response = await axios.put(`${API_URL}/purchase/${id}`);
  return response.data;
};

// Generate from inventory
export const generateShoppingList = async () => {
  const response = await axios.post(`${API_URL}/generate`);
  return response.data;
};

