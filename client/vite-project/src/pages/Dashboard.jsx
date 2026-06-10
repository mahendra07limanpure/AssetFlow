import React, { useState, useEffect } from "react";
import { getAssets, createBooking, getMyBookings } from "../api/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [assets, setAssets] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [tab, setTab] = useState("browse");
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (tab === "browse") {
        const data = await getAssets();
        setAssets(data.assets || []);
      } else {
        const data = await getMyBookings();
        setMyBookings(data.bookings || []);
      }
    } catch (err) {
      setError(err.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const bookingData = await createBooking({
        assetId: selectedAsset._id,
        quantity: parseInt(quantity),
        startDate,
        endDate,
      });

      if (bookingData.success) {
        alert("Booking request submitted successfully!");
        setSelectedAsset(null);
        setQuantity(1);
        setStartDate("");
        setEndDate("");
        fetchData();
      }
    } catch (err) {
      setError(err.message || "Booking failed");
    }
  };

  const getStatusColorClass = (status) => {
    const classes = {
      pending: "bg-yellow-500",
      approved: "bg-green-500",
      rejected: "bg-red-500",
      issued: "bg-blue-500",
      returned: "bg-gray-500",
    };
    return classes[status] || "bg-gray-500";
  };

  const categories = ["All", ...new Set(assets.map((asset) => asset.category).filter(Boolean))];

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.assetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (asset.description && asset.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || asset.category === selectedCategory;
    const matchesAvailability = !showAvailableOnly || asset.availableQuantity > 0;
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden flex flex-col">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar />

      <div className="max-w-6xl mx-auto p-6 w-full flex-1 relative z-10">
        <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-slate-300 mb-8">
          Resource Center
        </h1>

        <div className="flex gap-2 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80 w-fit mb-8">
          <button
            onClick={() => setTab("browse")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              tab === "browse"
                ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Browse Resources
          </button>
          <button
            onClick={() => setTab("myBookings")}
            className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
              tab === "myBookings"
                ? "bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md shadow-cyan-500/10"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            My Bookings
          </button>
        </div>

        {error && (
          <div className="bg-rose-950/50 border border-rose-800/80 text-rose-300 px-4 py-3 rounded-xl text-sm font-medium mb-6">
            {error}
          </div>
        )}

        {tab === "browse" && (
          <div>
            {/* Search and Filter Controls */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="w-full md:w-1/2 relative">
                <input
                  type="text"
                  placeholder="Search assets by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
                />
                <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <div className="w-full md:w-auto flex flex-wrap gap-4 items-center">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-205 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-sm cursor-pointer capitalize"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-slate-900 text-slate-100">
                      {cat === "All" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>

                <label className="flex items-center gap-2 text-sm text-slate-400 font-semibold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showAvailableOnly}
                    onChange={(e) => setShowAvailableOnly(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-950/60 border-slate-800 text-cyan-500 focus:ring-0 cursor-pointer accent-cyan-500"
                  />
                  Available Only
                </label>
              </div>
            </div>

            {loading ? (
              <p className="text-center text-slate-400">Loading assets...</p>
            ) : filteredAssets.length === 0 ? (
              <p className="text-center text-slate-450 my-12">No matching assets found.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset._id}
                    className="bg-slate-900/40 border border-slate-850 hover:border-cyan-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 cursor-pointer flex flex-col justify-between group"
                    onClick={() => setSelectedAsset(asset)}
                  >
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
                      <p className="text-slate-450 text-sm mb-6 line-clamp-2">
                        {asset.description || "No description provided."}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-800/60 flex justify-between items-center text-sm">
                      <span className="text-slate-400">Available Qty</span>
                      <span className="text-slate-100 font-bold">
                        {asset.availableQuantity} <span className="text-xs text-slate-500">/ {asset.totalQuantity}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "myBookings" && (
          <div>
            {loading ? (
              <p className="text-center text-slate-400">Loading bookings...</p>
            ) : myBookings.length === 0 ? (
              <p className="text-center text-slate-450">No bookings yet</p>
            ) : (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking._id} className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 flex justify-between items-center hover:border-slate-800 transition-all duration-300">
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-slate-100">
                        {booking.asset?.assetName}
                      </h3>
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
                ))}
              </div>
            )}
          </div>
        )}

        {selectedAsset && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-slate-950/80">
              <h2 className="text-2xl font-bold text-slate-100 mb-2">{selectedAsset.assetName}</h2>
              <p className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 font-medium capitalize w-fit mb-6">
                {selectedAsset.category}
              </p>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-slate-350 text-sm font-semibold mb-2">Quantity to Request</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedAsset.availableQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  />
                  <p className="text-xs text-slate-500 mt-1.5">Available stock: {selectedAsset.availableQuantity}</p>
                </div>

                <div>
                  <label className="block text-slate-350 text-sm font-semibold mb-2">Start Date (Estimated)</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-350 text-sm font-semibold mb-2">End Date (Estimated)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-100 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-slate-950 py-3 rounded-xl font-bold transition-all duration-300"
                  >
                    Request Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAsset(null)}
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
