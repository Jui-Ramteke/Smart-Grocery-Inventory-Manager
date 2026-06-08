import axios from "axios";

const API_URL = "http://localhost:5000/api/grocery";

export const getAlerts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};