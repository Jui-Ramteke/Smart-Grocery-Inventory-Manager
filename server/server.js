const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const groceryRoutes = require(
  "./routes/groceryRoutes"
);

const dashboardRoutes = require(
  "./routes/dashboardRoutes"
);

const shoppingRoutes = require(
  "./routes/shoppingRoutes"
);

const analyticsRoutes = require("./routes/analyticsRoutes");
const exportRoutes =
require("./routes/exportRoutes");

const pdfRoutes =
require("./routes/pdfRoutes");

const notificationRoutes =
require("./routes/notificationRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send(
    "Smart Grocery Inventory API Running"
  );
});

// Grocery Routes
app.use(
  "/api/grocery",
  groceryRoutes
);

// Dashboard Routes
app.use(
  "/api/dashboard",
  dashboardRoutes
);

app.use(
  "/api/shopping",
  shoppingRoutes
);

app.use("/api/analytics", analyticsRoutes);
app.use("/api/export", exportRoutes);
app.use(
  "/api/pdf",
  pdfRoutes
);

app.use(
  "/api/notifications",
  notificationRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});