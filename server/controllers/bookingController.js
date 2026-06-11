const Booking = require("../models/Booking");
const Asset = require("../models/Asset");

const createBooking = async (req, res) => {
  try {
    const { assetId, quantity } = req.body;

    const asset = await Asset.findById(assetId);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      asset: assetId,
      quantity,
    });

    res.status(201).json({
      success: true,
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("asset", "assetName");

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Booking already ${booking.status}`,
      });
    }

    const asset = await Asset.findById(booking.asset);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    if (asset.availableQuantity < booking.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock",
      });
    }

    asset.availableQuantity -= booking.quantity;

    if (asset.availableQuantity === 0) {
      asset.status = "unavailable";
    }

    await asset.save();

    booking.status = "approved";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking approved successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `Booking already ${booking.status}`,
      });
    }

    booking.status = "rejected";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking rejected successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const issueAsset = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Only approved bookings can be issued",
      });
    }

    booking.status = "issued";
    booking.issueDate = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Asset issued successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const returnAsset = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status !== "issued") {
      return res.status(400).json({
        success: false,
        message: "Only issued assets can be returned",
      });
    }

    const asset = await Asset.findById(booking.asset);

    if (!asset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    asset.availableQuantity += booking.quantity;
    asset.status = "available";

    await asset.save();

    booking.status = "returned";
    booking.returnDate = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Asset returned successfully",
      booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("asset", "assetName")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  approveBooking,
  rejectBooking,
  issueAsset,
  returnAsset,
  getMyBookings,
};