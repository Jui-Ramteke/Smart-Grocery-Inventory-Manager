const express = require("express");

const router = express.Router();

const {
  exportInventory,
} = require("../controllers/exportController");

router.get("/inventory", exportInventory);

module.exports = router;