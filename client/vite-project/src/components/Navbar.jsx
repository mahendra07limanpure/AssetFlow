import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">AssetFlow</h1>
          <p className="text-sm text-blue-100">Smart Asset Management</p>
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <>
              <div className="text-right">
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-blue-100 capitalize">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
