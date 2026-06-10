const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const User = require("./models/user");
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

app.get("/api/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
console.log(`Server running on port ${PORT}`);
});