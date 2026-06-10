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

    const returnedBookings = await Booking.countDocuments({
      status: "returned",
    });

    const rejectedBookings = await Booking.countDocuments({
      status: "rejected",
    });

    res.status(200).json({
      success: true,
      stats: {
        totalAssets,
        totalBookings,
        pendingBookings,
        approvedBookings,
        issuedAssets,
        returnedBookings,
        rejectedBookings,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getTopAssets = async (req, res) => {
  try {
  const assets = await Booking.aggregate([
  {
    $group: {
      _id: "$asset",
      totalBookings: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "assets",
      localField: "_id",
      foreignField: "_id",
      as: "assetInfo",
    },
  },
  {
    $unwind: "$assetInfo",
  },
  {
    $project: {
      assetName: "$assetInfo.assetName",
      totalBookings: 1,
    },
  },
  {
    $sort: {
      totalBookings: -1,
    },
  },
  {
    $limit: 5,
  },
]);

    res.status(200).json({
      success: true,
      assets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAvailableAssets = async (req, res) => {
  try {
    const availableAssets = await Asset.countDocuments({
      availableQuantity: { $gt: 0 },
    });

    res.status(200).json({
      success: true,
      availableAssets,
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
  getTopAssets,
  getAvailableAssets,
};