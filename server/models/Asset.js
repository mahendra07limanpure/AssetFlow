const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema(
  {
    assetName: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    totalQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Asset", assetSchema);