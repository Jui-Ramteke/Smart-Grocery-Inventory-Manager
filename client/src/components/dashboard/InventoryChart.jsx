import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const data = [
  { name: "Produce", value: 30 },
  { name: "Dairy", value: 20 },
  { name: "Pantry", value: 25 },
  { name: "Frozen", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#EF4444",
];

const InventoryChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

      <h2 className="text-xl font-semibold mb-6">
        Inventory Categories
      </h2>

      <div className="h-80">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              outerRadius={110}
              label
            >

              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default InventoryChart;