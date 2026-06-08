import axios from "axios";

const API_URL =
  "http://localhost:5000/api/export/inventory";

export const exportInventory = async () => {
  const response = await axios.get(
    API_URL,
    {
      responseType: "blob",
    }
  );

  const url =
    window.URL.createObjectURL(
      new Blob([response.data])
    );

  const link =
    document.createElement("a");

  link.href = url;

  link.setAttribute(
    "download",
    "inventory.xlsx"
  );

  document.body.appendChild(link);

  link.click();

  link.remove();
};