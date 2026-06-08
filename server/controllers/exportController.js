const GroceryItem = require("../models/GroceryItem");
const ExcelJS = require("exceljs");

const exportInventory = async (req, res) => {
  try {
    const items = await GroceryItem.find();

    const workbook = new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet("Inventory");

    worksheet.columns = [
      {
        header: "Item Name",
        key: "name",
        width: 25,
      },
      {
        header: "Category",
        key: "category",
        width: 20,
      },
      {
        header: "Quantity",
        key: "quantity",
        width: 15,
      },
      {
        header: "Unit",
        key: "unit",
        width: 15,
      },
      {
        header: "Status",
        key: "status",
        width: 20,
      },
    ];

    items.forEach((item) => {
      worksheet.addRow({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        status: item.status,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=inventory.xlsx"
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  exportInventory,
};