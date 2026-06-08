const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "General",
    },

    status: {
      type: String,
      enum: ["Pending", "Purchased"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ShoppingItem",
  shoppingItemSchema
);