const mongoose = require("mongoose");

const groceryItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    unit: {
      type: String,
      default: "Units",
    },

    expiryDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: [
        "Healthy",
        "Low Stock",
        "Expiring",
        "Critical",
      ],
      default: "Healthy",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "GroceryItem",
  groceryItemSchema
);