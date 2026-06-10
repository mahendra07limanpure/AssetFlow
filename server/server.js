const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });
const connectDB = require("./config/db");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("AssetFlow API Running");
});
const protect = require("./middleware/authMiddleware");
const adminOnly = require("./middleware/adminMiddleware");

app.get("/api/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
app.get(
  "/api/admin-test",
  protect,
  adminOnly,
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin",
    });
  }
);

const assetRoutes = require("./routes/assetRoutes");

app.use("/api/assets", assetRoutes);

const bookingRoutes = require("./routes/bookingRoutes");

app.use("/api/bookings", bookingRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});