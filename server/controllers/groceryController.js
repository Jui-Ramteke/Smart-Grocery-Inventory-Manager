const GroceryItem = require("../models/GroceryItem");

// =========================================
// GET ALL ITEMS
// =========================================

exports.getItems = async (req, res) => {
  try {
    const items = await GroceryItem.find().sort({
      createdAt: -1,
    });

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================================
// GET SINGLE ITEM
// =========================================

exports.getItemById = async (req, res) => {
  try {
    const item = await GroceryItem.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================================
// CREATE ITEM
// =========================================

exports.createItem = async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      unit,
      expiryDate,
    } = req.body;

    // Status Calculation

    let status = "Healthy";

    const lowStock =
      Number(quantity) <= 2;

    let expiring = false;

    if (expiryDate) {
      const today = new Date();

      const expiry = new Date(
        expiryDate
      );

      const diffTime =
        expiry.getTime() -
        today.getTime();

      const diffDays = Math.ceil(
        diffTime /
          (1000 * 60 * 60 * 24)
      );

      expiring =
        diffDays <= 3 &&
        diffDays >= 0;
    }

    if (lowStock && expiring) {
      status = "Critical";
    } else if (lowStock) {
      status = "Low Stock";
    } else if (expiring) {
      status = "Expiring";
    }

    const item =
      await GroceryItem.create({
        name,
        category,
        quantity,
        unit,
        expiryDate,
        status,
      });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================================
// UPDATE ITEM
// =========================================

exports.updateItem = async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      unit,
      expiryDate,
    } = req.body;

    // Status Calculation

    let status = "Healthy";

    const lowStock =
      Number(quantity) <= 2;

    let expiring = false;

    if (expiryDate) {
      const today = new Date();

      const expiry = new Date(
        expiryDate
      );

      const diffTime =
        expiry.getTime() -
        today.getTime();

      const diffDays = Math.ceil(
        diffTime /
          (1000 * 60 * 60 * 24)
      );

      expiring =
        diffDays <= 3 &&
        diffDays >= 0;
    }

    if (lowStock && expiring) {
      status = "Critical";
    } else if (lowStock) {
      status = "Low Stock";
    } else if (expiring) {
      status = "Expiring";
    }

    const updatedItem =
      await GroceryItem.findByIdAndUpdate(
        req.params.id,
        {
          name,
          category,
          quantity,
          unit,
          expiryDate,
          status,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedItem) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json(
      updatedItem
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =========================================
// DELETE ITEM
// =========================================

exports.deleteItem = async (req, res) => {
  try {
    const item =
      await GroceryItem.findByIdAndDelete(
        req.params.id
      );

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};