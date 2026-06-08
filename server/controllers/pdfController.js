const PDFDocument = require("pdfkit");

const GroceryItem = require("../models/GroceryItem");

const generatePDF = async (
  req,
  res
) => {
  try {
    const items =
      await GroceryItem.find();

    const doc =
      new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Inventory_Report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text(
        "Smart Grocery Inventory Report"
      );

    doc.moveDown();

    doc
      .fontSize(14)
      .text(
        `Generated On: ${new Date().toLocaleDateString()}`
      );

    doc.moveDown();

    items.forEach((item) => {
      doc.text(
        `Item: ${item.name}`
      );

      doc.text(
        `Category: ${item.category}`
      );

      doc.text(
        `Quantity: ${item.quantity} ${item.unit}`
      );

      doc.text(
        `Status: ${item.status}`
      );

      doc.moveDown();
    });

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  generatePDF,
};