// server/controllers/shoppingController.js
const ShoppingItem = require("../models/ShoppingItem");
const GroceryItem = require("../models/GroceryItem");

// Get all shopping items
const getShoppingItems = async (req, res) => {
  try {
    const items = await ShoppingItem.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add shopping item
const addShoppingItem = async (req, res) => {
  try {
    const { itemName, category } = req.body;

    const item = await ShoppingItem.create({
      itemName,
      category,
      status: "Pending",
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete shopping item
const deleteShoppingItem = async (req, res) => {
  try {
    await ShoppingItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark as purchased
const markAsPurchased = async (req, res) => {
  try {
    const item = await ShoppingItem.findByIdAndUpdate(
      req.params.id,
      { status: "Purchased" },
      { new: true }
    );

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate shopping list from low stock inventory
const generateShoppingList = async (req, res) => {
  try {
    const lowStockItems = await GroceryItem.find({
      status: "Low Stock",
    });

    let addedItems = 0;

    for (const item of lowStockItems) {
      const exists = await ShoppingItem.findOne({
        itemName: item.name,
      });

      if (!exists) {
        await ShoppingItem.create({
          itemName: item.name,
          category: item.category,
          status: "Pending",
        });

        addedItems++;
      }
    }

    res.status(200).json({
      message: "Shopping list generated successfully",
      addedItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getShoppingItems,
  addShoppingItem,
  deleteShoppingItem,
  markAsPurchased,
  generateShoppingList,
};

  