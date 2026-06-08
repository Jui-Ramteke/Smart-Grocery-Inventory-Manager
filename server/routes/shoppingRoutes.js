// server/routes/shoppingRoutes.js
const express = require("express");
const router = express.Router();

const {
  getShoppingItems,
  addShoppingItem,
  deleteShoppingItem,
  markAsPurchased,
  generateShoppingList,
} = require("../controllers/shoppingController");

// GET ALL ITEMS
router.get("/", getShoppingItems);

// CREATE ITEM
router.post("/", addShoppingItem);

// AUTO GENERATE
router.post("/generate", generateShoppingList);

// MARK PURCHASED
router.put("/:id/purchased", markAsPurchased);

// DELETE ITEM
router.delete("/:id", deleteShoppingItem);

module.exports = router;