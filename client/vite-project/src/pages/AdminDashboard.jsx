import React, { useState, useEffect } from "react";
import {
  getBookings,
  approveBooking,
  rejectBooking,
  issueAsset,
  returnAsset,
  getDashboardStats,
  getTopAssets,
  getAssets,
  createAsset,
  updateAsset,
  deleteAsset,
} from "../api/api";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [topAssets, setTopAssets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [assetForm, setAssetForm] = useState({
    assetName: "",
    category: "",
    description: "",
    totalQuantity: 1,
    availableQuantity: 1,
    status: "available",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      if (tab === "bookings") {
        const data = await getBookings();
        setBookings(data.bookings || []);
      } else if (tab === "analytics") {
        const statsData = await getDashboardStats();
        const assetsData = await getTopAssets();
        setStats(statsData.stats);
        setTopAssets(assetsData.assets || []);
      } else if (tab === "assets") {
        const data = await getAssets();
        setAssets(data.assets || []);
      }
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      const result = await approveBooking(bookingId);
      if (result.success) {
        setBookings(bookings.map(b => b._id === bookingId ? result.booking : b));
        alert("Booking approved!");
      }
    } catch (err) {
      alert(err.message || "Failed to approve booking");
    }
  };

  const handleReject = async (bookingId) => {
    try {
      const result = await rejectBooking(bookingId);
      if (result.success) {
        setBookings(bookings.map(b => b._id === bookingId ? result.booking : b));
        alert("Booking rejected!");
      }
    } catch (err) {
      alert(err.message || "Failed to reject booking");
    }
  };

  const handleIssue = async (bookingId) => {
    try {
      const result = await issueAsset(bookingId);
      if (result.success) {
        setBookings(bookings.map(b => b._id === bookingId ? result.booking : b));
        alert("Asset issued!");
      }
    } catch (err) {
      alert(err.message || "Failed to issue asset");
    }
  };

  const handleReturn = async (bookingId) => {
    try {
      const result = await returnAsset(bookingId);
      if (result.success) {
        setBookings(bookings.map(b => b._id === bookingId ? result.booking : b));
        alert("Asset returned!");
      }
    } catch (err) {
      alert(err.message || "Failed to return asset");
    }
  };

  const handleOpenCreateModal = () => {
    setEditingAsset(null);
    setAssetForm({
      assetName: "",
      category: "",
      description: "",
      totalQuantity: 1,
      availableQuantity: 1,
      status: "available",
    });
    setShowAssetModal(true);
  };

  const handleOpenEditModal = (asset) => {
    setEditingAsset(asset);
    setAssetForm({
      assetName: asset.assetName,
      category: asset.category,
      description: asset.description || "",
      totalQuantity: asset.totalQuantity,
      availableQuantity: asset.availableQuantity,
      status: asset.status || "available",
    });
    setShowAssetModal(true);
  };

  const handleSaveAsset = async (e) => {
    e.preventDefault();
    try {
      if (editingAsset) {
        const result = await updateAsset(editingAsset._id, assetForm);
        if (result.success) {
          alert("Asset updated successfully!");
          setShowAssetModal(false);
          fetchData();
        }
      } else {
        const newAssetData = {
          ...assetForm,
          availableQuantity: assetForm.totalQuantity,
        };
        const result = await createAsset(newAssetData);
        if (result.success) {
          alert("Asset created successfully!");
          setShowAssetModal(false);
          fetchData();
        }
      }
    } catch (err) {
      alert(err.message || "Failed to save asset");
    }
  };

  const handleDeleteAsset = async (assetId) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    try {
      const result = await deleteAsset(assetId);
      if (result.success) {
        alert("Asset deleted successfully!");
        fetchData();
      }
    } catch (err) {
      alert(err.message || "Failed to delete asset");
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      issued: "bg-blue-100 text-blue-800",
      returned: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex flex-col">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar />

      <div className="max-w-7xl mx-auto p-6 w-full flex-1 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-300 mb-8">
          Admin Dashboard
        </h1>

        <div className="flex gap-2 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80 w-fit mb-8">
          <button
            onClick={() => setTab("bookings")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              tab === "bookings"
                ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Manage Bookings
          </button>
          <button
            onClick={() => setTab("assets")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              tab === "assets"
                ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Manage Assets
          </button>
          <button
            onClick={() => setTab("analytics")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              tab === "analytics"
                ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Analytics
          </button>
        </div>

        {error && (
          <div className="bg-rose-950/50 border border-rose-800/80 text-rose-300 px-4 py-3 rounded-xl text-sm font-medium mb-6">
            {error}
          </div>
        )}

        {tab === "bookings" && (
          <div>
            <h2 className="text-2xl font-bold text-slate-200 mb-6">Booking Requests</h2>
            {loading ? (
              <p className="text-center text-slate-400">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="text-center text-slate-455">No bookings found</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 hover:border-slate-800 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-100">
                          {booking.asset?.assetName}
                        </h3>
                        <p className="text-sm text-slate-400">
                          User: <span className="text-slate-200 font-medium">{booking.user?.name || "Unknown"}</span>
                        </p>
                        <p className="text-sm text-slate-400">
                          Quantity: <span className="text-slate-200 font-medium">{booking.quantity}</span>
                        </p>
                        <p className="text-xs text-slate-500">
                          {booking.status === "pending" || booking.status === "approved" || booking.status === "rejected" ? (
                            <>Requested: {new Date(booking.createdAt).toLocaleDateString()}</>
                          ) : (
                            <>
                              Issued: {booking.issueDate ? new Date(booking.issueDate).toLocaleDateString() : "N/A"}
                              {booking.status === "returned" && (
                                <> - Returned: {booking.returnDate ? new Date(booking.returnDate).toLocaleDateString() : "N/A"}</>
                              )}
                            </>
                          )}
                        </p>
                      </div>
                      <span
                        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize ${
                          booking.status === "pending" ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" :
                          booking.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                          booking.status === "rejected" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" :
                          booking.status === "issued" ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                          "bg-slate-800 text-slate-400 border border-slate-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(booking._id)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-all duration-300"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(booking._id)}
                            className="bg-rose-950 border border-rose-800/80 hover:bg-rose-900 text-rose-300 font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-300"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {booking.status === "approved" && (
                        <button
                          onClick={() => handleIssue(booking._id)}
                          className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-all duration-300"
                        >
                          Issue Asset
                        </button>
                      )}

                      {booking.status === "issued" && (
                        <button
                          onClick={() => handleReturn(booking._id)}
                          className="bg-indigo-500 hover:bg-indigo-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-all duration-300"
                        >
                          Accept Return
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "assets" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-200">Assets Inventory</h2>
              <button
                onClick={handleOpenCreateModal}
                className="bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 shadow-md shadow-cyan-500/10"
              >
                + Add New Asset
              </button>
            </div>

            {loading ? (
              <p className="text-center text-slate-400">Loading assets...</p>
            ) : assets.length === 0 ? (
              <p className="text-center text-slate-450">No assets in inventory</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset) => (
                  <div key={asset._id} className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between group hover:border-slate-800 transition-all duration-300">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700/80 text-slate-400 font-medium capitalize">
                          {asset.category}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            asset.status === "available" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">
                        {asset.assetName}
                      </h3>
                      <p className="text-slate-450 text-sm mb-6 h-16 overflow-y-auto">
                        {asset.description || "No description provided."}
                      </p>
                    </div>
                    <div>
                      <div className="pt-4 border-t border-slate-855 flex justify-between items-center text-sm mb-4">
                        <span className="text-slate-450">Stock Quantity</span>
                        <span className="text-slate-200 font-bold">
                          {asset.availableQuantity} <span className="text-xs text-slate-500">/ {asset.totalQuantity}</span>
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEditModal(asset)}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-205 py-2 rounded-xl font-semibold transition text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAsset(asset._id)}
                          className="flex-1 bg-rose-950/40 hover:bg-rose-955 border border-rose-900/60 hover:border-rose-800 text-rose-350 py-2 rounded-xl font-semibold transition text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "analytics" && (
          <div>
            <h2 className="text-2xl font-bold text-slate-200 mb-6">Analytics & Statistics</h2>

            {loading ? (
              <p className="text-center text-slate-400">Loading analytics...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6">
                    <p className="text-slate-450 text-xs font-semibold uppercase tracking-wider">Total Assets</p>
                    <p className="text-4xl font-extrabold text-cyan-400 mt-2">{stats?.totalAssets || 0}</p>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6">
                    <p className="text-slate-450 text-xs font-semibold uppercase tracking-wider">Total Bookings</p>
                    <p className="text-4xl font-extrabold text-emerald-400 mt-2">{stats?.totalBookings || 0}</p>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6">
                    <p className="text-slate-450 text-xs font-semibold uppercase tracking-wider">Pending Requests</p>
                    <p className="text-4xl font-extrabold text-yellow-400 mt-2">{stats?.pendingBookings || 0}</p>
                  </div>
                  <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6">
                    <p className="text-slate-450 text-xs font-semibold uppercase tracking-wider">Approved Bookings</p>
                    <p className="text-4xl font-extrabold text-indigo-400 mt-2">{stats?.approvedBookings || 0}</p>
                  </div>
                </div>

                <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-100 mb-4">Top Assets</h3>
                  {topAssets.length === 0 ? (
                    <p className="text-slate-455">No booking data yet</p>
                  ) : (
                    <div className="space-y-2">
                      {topAssets.map((asset, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 border-b border-slate-850 last:border-b-0">
                          <span className="font-semibold text-slate-205">{asset.assetName}</span>
                          <span className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium">
                            {asset.totalBookings} bookings
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}

        {showAssetModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-slate-950/80">
              <h2 className="text-2xl font-bold text-slate-100 mb-6">
                {editingAsset ? "Edit Asset" : "Add New Asset"}
              </h2>

              <form onSubmit={handleSaveAsset} className="space-y-4">
                <div>
                  <label className="block text-slate-350 text-sm font-semibold mb-2">Asset Name</label>
                  <input
                    type="text"
                    value={assetForm.assetName}
                    onChange={(e) => setAssetForm({ ...assetForm, assetName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. DSLR Camera"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-355 text-sm font-semibold mb-2">Category</label>
                  <input
                    type="text"
                    value={assetForm.category}
                    onChange={(e) => setAssetForm({ ...assetForm, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="e.g. Cameras"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-355 text-sm font-semibold mb-2">Description</label>
                  <textarea
                    value={assetForm.description}
                    onChange={(e) => setAssetForm({ ...assetForm, description: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    rows="3"
                    placeholder="Enter asset details..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-355 text-sm font-semibold mb-2">Total Qty</label>
                    <input
                      type="number"
                      min="1"
                      value={assetForm.totalQuantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setAssetForm({
                          ...assetForm,
                          totalQuantity: val,
                          availableQuantity: editingAsset ? assetForm.availableQuantity : val
                        });
                      }}
                      className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                      required
                    />
                  </div>

                  {editingAsset && (
                    <div>
                      <label className="block text-slate-355 text-sm font-semibold mb-2">Available Qty</label>
                      <input
                        type="number"
                        min="0"
                        max={assetForm.totalQuantity}
                        value={assetForm.availableQuantity}
                        onChange={(e) => setAssetForm({ ...assetForm, availableQuantity: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                        required
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-slate-355 text-sm font-semibold mb-2">Status</label>
                  <select
                    value={assetForm.status}
                    onChange={(e) => setAssetForm({ ...assetForm, status: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                  >
                    <option value="available" className="bg-slate-900 text-slate-100">Available</option>
                    <option value="unavailable" className="bg-slate-900 text-slate-100">Unavailable</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 py-3 rounded-xl font-bold transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAssetModal(false)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-bold border border-slate-700 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
