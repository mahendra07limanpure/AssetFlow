const express = require("express");
const {
  createAsset,
  getAllAssets,
  getAssetById, updateAsset, deleteAsset,
} = require("../controllers/assetController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post(
  "/",
  protect,
  adminOnly,
  createAsset
);
router.get("/", protect, getAllAssets);

router.get("/:id", protect, getAssetById);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateAsset
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteAsset
);

module.exports = router;