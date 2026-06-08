const express = require(
  "express"
);

const router =
  express.Router();

const {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require(
  "../controllers/groceryController"
);

// ======================
// GET ALL ITEMS
// ======================

router.get(
  "/",
  getItems
);

// ======================
// GET SINGLE ITEM
// ======================

router.get(
  "/:id",
  getItemById
);

// ======================
// CREATE ITEM
// ======================

router.post(
  "/",
  createItem
);

// ======================
// UPDATE ITEM
// ======================

router.put(
  "/:id",
  updateItem
);

// ======================
// DELETE ITEM
// ======================

router.delete(
  "/:id",
  deleteItem
);

module.exports = router;