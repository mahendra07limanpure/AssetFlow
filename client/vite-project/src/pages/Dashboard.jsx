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

  const getStatusColor = (status) => {
    const colors = {
      pending: "yellow",
      approved: "green",
      rejected: "red",
      issued: "blue",
      returned: "gray",
    };
    return colors[status] || "gray";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Asset Management Dashboard</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab("browse")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === "browse"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Browse Assets
          </button>
          <button
            onClick={() => setTab("myBookings")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === "myBookings"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            My Bookings
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {tab === "browse" && (
          <div>
            {loading ? (
              <p className="text-center text-gray-600">Loading assets...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.map((asset) => (
                  <div
                    key={asset._id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
                    onClick={() => setSelectedAsset(asset)}
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{asset.assetName}</h3>
                    <p className="text-gray-600 mb-2">{asset.category}</p>
                    <p className="text-gray-700 mb-4">{asset.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Available: <strong>{asset.availableQuantity}</strong>
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold text-white bg-${
                          asset.status === "available" ? "green" : "red"
                        }-500`}
                      >
                        {asset.status}
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
              <p className="text-center text-gray-600">Loading bookings...</p>
            ) : myBookings.length === 0 ? (
              <p className="text-center text-gray-600">No bookings yet</p>
            ) : (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking._id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {booking.asset?.assetName}
                        </h3>
                        <p className="text-gray-600 mt-1">Quantity: {booking.quantity}</p>
                        <p className="text-gray-600">
                          Date: {new Date(booking.startDate).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-${getStatusColor(
                          booking.status
                        )}-500`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedAsset && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedAsset.assetName}</h2>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max={selectedAsset.availableQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Request Booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAsset(null)}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-400 transition"
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
