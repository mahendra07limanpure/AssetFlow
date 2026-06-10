import React, { useState, useEffect } from "react";
import { getBookings, approveBooking, rejectBooking, issueAsset, returnAsset, getDashboardStats, getTopAssets } from "../api/api";
import Navbar from "../components/Navbar";

export default function AdminDashboard() {
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [topAssets, setTopAssets] = useState([]);
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setTab("bookings")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === "bookings"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Manage Bookings
          </button>
          <button
            onClick={() => setTab("analytics")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              tab === "analytics"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Analytics
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {tab === "bookings" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Requests</h2>
            {loading ? (
              <p className="text-center text-gray-600">Loading bookings...</p>
            ) : bookings.length === 0 ? (
              <p className="text-center text-gray-600">No bookings</p>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {booking.asset?.assetName}
                        </h3>
                        <p className="text-gray-600">User: {booking.user?.name || "Unknown"}</p>
                        <p className="text-gray-600">Quantity: {booking.quantity}</p>
                        <p className="text-gray-600">
                          Dates: {new Date(booking.startDate).toLocaleDateString()} -{" "}
                          {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(booking.status)}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      {booking.status === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(booking._id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(booking._id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {booking.status === "approved" && (
                        <button
                          onClick={() => handleIssue(booking._id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                          Issue Asset
                        </button>
                      )}

                      {booking.status === "issued" && (
                        <button
                          onClick={() => handleReturn(booking._id)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
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

        {tab === "analytics" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics & Statistics</h2>

            {loading ? (
              <p className="text-center text-gray-600">Loading analytics...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm font-semibold">Total Assets</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">{stats?.totalAssets || 0}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm font-semibold">Total Bookings</p>
                    <p className="text-3xl font-bold text-green-600 mt-2">{stats?.totalBookings || 0}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm font-semibold">Pending Requests</p>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">{stats?.pendingBookings || 0}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600 text-sm font-semibold">Approved</p>
                    <p className="text-3xl font-bold text-purple-600 mt-2">{stats?.approvedBookings || 0}</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Top Assets</h3>
                  {topAssets.length === 0 ? (
                    <p className="text-gray-600">No booking data yet</p>
                  ) : (
                    <div className="space-y-2">
                      {topAssets.map((asset, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 border-b">
                          <span className="font-semibold text-gray-800">{asset.assetName}</span>
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
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
      </div>
    </div>
  );
}
