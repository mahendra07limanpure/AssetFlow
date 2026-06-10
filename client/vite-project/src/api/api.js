const API_BASE_URL = "http://localhost:5000/api";

// Store token in localStorage
export const setAuthToken = (token) => {
  localStorage.setItem("authToken", token);
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const removeAuthToken = () => {
  localStorage.removeItem("authToken");
};

// API request helper
const apiCall = async (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const token = getAuthToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};

// Auth APIs
export const registerUser = (data) => {
  return apiCall("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const loginUser = (email, password) => {
  return apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

// Asset APIs
export const getAssets = () => {
  return apiCall("/assets");
};

export const getAssetById = (id) => {
  return apiCall(`/assets/${id}`);
};

export const searchAssets = (query) => {
  return apiCall(`/assets/search?q=${query}`);
};

export const createAsset = (assetData) => {
  return apiCall("/assets", {
    method: "POST",
    body: JSON.stringify(assetData),
  });
};

export const updateAsset = (id, assetData) => {
  return apiCall(`/assets/${id}`, {
    method: "PUT",
    body: JSON.stringify(assetData),
  });
};

export const deleteAsset = (id) => {
  return apiCall(`/assets/${id}`, {
    method: "DELETE",
  });
};

// Booking APIs
export const createBooking = (data) => {
  return apiCall("/bookings", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getBookings = () => {
  return apiCall("/bookings");
};

export const getMyBookings = () => {
  return apiCall("/bookings/my");
};

export const approveBooking = (bookingId) => {
  return apiCall(`/bookings/${bookingId}/approve`, {
    method: "PUT",
  });
};

export const rejectBooking = (bookingId) => {
  return apiCall(`/bookings/${bookingId}/reject`, {
    method: "PUT",
  });
};

export const issueAsset = (bookingId) => {
  return apiCall(`/bookings/${bookingId}/issue`, {
    method: "PUT",
  });
};

export const returnAsset = (bookingId) => {
  return apiCall(`/bookings/${bookingId}/return`, {
    method: "PUT",
  });
};

// Dashboard APIs
export const getDashboardStats = () => {
  return apiCall("/dashboard/stats");
};

export const getTopAssets = () => {
  return apiCall("/dashboard/top-assets");
};

export const getAvailableAssets = () => {
  return apiCall("/dashboard/available-assets");
};

// User profile
export const getUserProfile = () => {
  return apiCall("/profile");
};
