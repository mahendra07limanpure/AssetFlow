const express = require("express");
console.log("Booking Routes Loaded");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  createBooking,
  getAllBookings,
  approveBooking,
  rejectBooking,
  issueAsset, returnAsset, getMyBookings,
} = require("../controllers/bookingController");

router.post("/", protect, createBooking);

router.get(
  "/",
  protect,
    getAllBookings
);

router.put(
  "/:id/approve",
  protect,
  adminOnly,
  approveBooking
);

router.put(
  "/:id/reject",
  protect,
  adminOnly,
  rejectBooking
);
router.put("/:id/issue", protect, adminOnly, issueAsset);
router.put("/:id/return", protect, adminOnly, returnAsset);
router.get("/my", protect, getMyBookings);
module.exports = router;