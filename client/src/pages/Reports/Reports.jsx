import {
  DocumentArrowDownIcon,
  TableCellsIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

import { exportInventory } from "../../services/exportService";
import { downloadPDF } from "../../services/pdfService";

const Reports = () => {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500 mt-2">
          Generate and download inventory reports.
        </p>
      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <TableCellsIcon className="h-8 w-8 text-green-600" />

            <h2 className="text-2xl font-semibold">
              Excel Report
            </h2>
          </div>

          <p className="text-gray-500 mb-5">
            Download inventory data as Excel.
          </p>

          <button
            onClick={exportInventory}
            className="bg-green-500 text-white px-5 py-3 rounded-xl"
          >
            Download Excel
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <DocumentArrowDownIcon className="h-8 w-8 text-red-600" />

            <h2 className="text-2xl font-semibold">
              PDF Report
            </h2>
          </div>

          <p className="text-gray-500 mb-5">
            Download inventory summary PDF.
          </p>

          <button
            onClick={downloadPDF}
            className="bg-red-500 text-white px-5 py-3 rounded-xl"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Report Types */}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <ChartBarIcon className="h-10 w-10 text-blue-500 mb-4" />

          <h3 className="text-xl font-semibold">
            Inventory Summary
          </h3>

          <p className="text-gray-500 mt-2">
            Overview of inventory status and categories.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <ExclamationTriangleIcon className="h-10 w-10 text-red-500 mb-4" />

          <h3 className="text-xl font-semibold">
            Low Stock Report
          </h3>

          <p className="text-gray-500 mt-2">
            Track items that need replenishment.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <DocumentArrowDownIcon className="h-10 w-10 text-amber-500 mb-4" />

          <h3 className="text-xl font-semibold">
            Expiry Report
          </h3>

          <p className="text-gray-500 mt-2">
            Monitor products nearing expiration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;