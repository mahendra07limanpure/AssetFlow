const Asset = require("../models/Asset");
const Booking = require("../models/Booking");

const getDashboardStats = async (req, res) => {
  try {
    const totalAssets = await Asset.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const pendingBookings = await Booking.countDocuments({
      status: "pending",
    });

    const approvedBookings = await Booking.countDocuments({
      status: "approved",
    });

    const issuedAssets = await Booking.countDocuments({
      status: "issued",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalAssets,
        totalBookings,
        pendingBookings,
        approvedBookings,
        issuedAssets,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};