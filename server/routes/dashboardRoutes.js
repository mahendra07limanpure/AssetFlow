const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
  getDashboardStats,
  getTopAssets,
  getAvailableAssets,
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  protect,
  adminOnly,
  getDashboardStats
);
router.get("/top-assets", protect, adminOnly, getTopAssets);
router.get("/available-assets", protect, adminOnly, getAvailableAssets);


module.exports = router;