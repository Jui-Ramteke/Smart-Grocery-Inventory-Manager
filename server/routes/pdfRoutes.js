const express = require(
  "express"
);

const router =
  express.Router();

const {
  generatePDF,
} = require(
  "../controllers/pdfController"
);

router.get(
  "/inventory-report",
  generatePDF
);

module.exports = router;