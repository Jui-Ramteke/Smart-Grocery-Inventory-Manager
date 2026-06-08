const GroceryItem = require(
  "../models/GroceryItem"
);

const getDashboardStats =
  async (req, res) => {
    try {
      const items =
        await GroceryItem.find();

      const totalItems =
        items.length;

      const healthy =
        items.filter(
          (item) =>
            item.status ===
            "Healthy"
        ).length;

      const lowStock =
        items.filter(
          (item) =>
            item.status ===
            "Low Stock"
        ).length;

      const expiring =
        items.filter(
          (item) =>
            item.status ===
            "Expiring"
        ).length;

      const critical =
        items.filter(
          (item) =>
            item.status ===
            "Critical"
        ).length;

      const recentItems =
        items.slice(0, 5);

      res.status(200).json({
        totalItems,
        healthy,
        lowStock,
        expiring,
        critical,
        recentItems,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  getDashboardStats,
};