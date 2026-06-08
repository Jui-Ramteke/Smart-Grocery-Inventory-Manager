const GroceryItem = require("../models/GroceryItem");

exports.getNotifications = async (req, res) => {
  try {
    const today = new Date();

    const expiryLimit = new Date();
    expiryLimit.setDate(today.getDate() + 7);

    const lowStock = await GroceryItem.find({
      status: "Low Stock",
    });

    const expiring = await GroceryItem.find({
      expiryDate: {
        $ne: null,
        $lte: expiryLimit,
        $gte: today,
      },
    });

    res.status(200).json({
      count: lowStock.length + expiring.length,
      lowStock,
      expiring,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};