# AssetFlow - Smart Asset Management & Resource Allocation Platform

## 📋 Project Overview
**AssetFlow** is a modern, full-stack asset management and resource allocation platform designed to streamline inventory tracking, booking workflows, and operational analytics. It is specifically built to solve resource-sharing bottlenecks in organizations, universities, and teams by offering a centralized dashboard for users to browse and request bookings, and for administrators to manage inventory, approve or reject requests, track issue/return lifecycles, and monitor asset utilization analytics.

## Video link 
 https://drive.google.com/file/d/1Vo9KjKwv13g3ON2cmbyaMnAlsu3BTy92/view?usp=sharing
---

## 🛠️ Technology Stack

### Frontend
- **React 19** - Component-based user interface framework.
- **Vite** - High-performance frontend build tool.
- **Tailwind CSS v4.0** - Utility-first styling framework for responsive design.
- **React Router DOM v6** - Client-side declarative routing.

### Backend
- **Node.js** - JavaScript runtime environment.
- **Express.js** - Server framework for building robust RESTful APIs.
- **MongoDB** - NoSQL database for flexible data modeling.
- **Mongoose** - Elegant MongoDB object modeling for Node.js.
- **JSON Web Token (JWT)** - Secure, stateless authentication.
- **Bcrypt.js** - Industry-standard password hashing.

---

## ⚙️ Setup Instructions

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas URI)

### 1. Clone & Navigate
```bash
git clone <repository-url>
cd AssetFlow
```

### 2. Backend Configuration
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/assetflow  # or your Atlas connection string
   JWT_SECRET=your_super_secret_jwt_key
   ```

### 3. Frontend Configuration
1. Navigate to the `client/vite-project` directory:
   ```bash
   cd ../client/vite-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## 🚀 Running the Application

### Start the Backend Server
Navigate to the `server` directory and run:
```bash
npm start
```
*The server will start and listen on port `5000` (configurable via `.env`).*

### Start the Frontend Application
Navigate to the `client/vite-project` directory and run:
```bash
npm run dev
```
*The React development server will start, typically running on `http://localhost:5173`.*

---

## ✨ Feature List

### 🔒 User Authentication & Security
- **Role-Based Access Control (RBAC):** Distinct workflows for `users` and `admins`.
- **JWT Session Security:** Secure, token-based session persistence stored in local storage.
- **Secure Hashing:** Salting and hashing passwords using `bcryptjs`.

### 📦 Inventory & Resource Management (Admin)
- **Asset Control:** Add, view, edit, and delete assets dynamically.
- **Availability State:** Tracks dynamic counts of `availableQuantity` vs `totalQuantity`.
- **Categorization & Search:** Organize resources by category for easy retrieval.

### 📅 Booking Workflow (User)
- **Asset Discovery:** Search, filter, and view availability of resources.
- **Booking Requests:** Select dates and request quantities for specific timeframes.
- **Click-to-Pick Date Selection:** Date selection is optimized with one-click browser-native calendar picker display support.
- **Dynamic Validation:** Prevents requests that exceed the currently available stock.

### 🔄 Issue & Return Management (Admin & User)
- **Approval Workflow:** Admins can review, approve, or reject booking requests.
- **Lifecycle Tracking:** Easily transition bookings from `pending` ➔ `approved` ➔ `issued` ➔ `returned`.
- **Auto-Inventory Adjustment:** Automatically updates available quantities when assets are checked out or returned.

### 📊 Analytics & Visualizations (Admin Dashboard)
- **Key Performance Cards:** Total assets, total bookings, pending requests, and approved checkouts.
- **Utilization Tracking:** Monitor high-frequency resources and active system bookings.

---

### 🔑 Default Test Credentials

#### Admin User
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Role:** `admin`

#### Regular User
- **Email:** `user@example.com`
- **Password:** `password123`
- **Role:** `user`
