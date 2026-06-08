const GroceryItem = require("../models/GroceryItem");

const getAnalytics = async (req, res) => {
  try {
    const items = await GroceryItem.find();

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

    const statusData = [
      {
        name: "Healthy",
        value: healthyItems,
      },
      {
        name: "Low Stock",
        value: lowStockItems,
      },
      {
        name: "Expiring",
        value: expiringItems,
      },
    ];

    const categoryMap = {};

    items.forEach((item) => {
      if (categoryMap[item.category]) {
        categoryMap[item.category]++;
      } else {
        categoryMap[item.category] = 1;
      }
    });

    const categoryData = Object.keys(categoryMap).map(
      (category) => ({
        category,
        count: categoryMap[category],
      })
    );

    res.status(200).json({
      totalItems,
      healthyItems,
      lowStockItems,
      expiringItems,
      statusData,
      categoryData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};