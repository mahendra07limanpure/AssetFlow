# AssetFlow - Smart Asset Management Platform

A full-stack asset management and resource allocation platform built with React (frontend) and Express.js (backend).

## 📋 Overview

AssetFlow is a comprehensive platform designed to efficiently manage shared resources across organizations. It provides centralized inventory management, asset booking, approval workflows, and operational analytics.

## 🏗️ Technology Stack

### Frontend
- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Server framework
- **MongoDB** - Database
- **JWT** - Authentication

## 📁 Project Structure

```
AssetFlow/
├── client/
│   └── vite-project/
│       ├── src/
│       │   ├── api/
│       │   │   └── api.js              # API integration layer
│       │   ├── components/
│       │   │   ├── Navbar.jsx          # Navigation component
│       │   │   └── ProtectedRoute.jsx  # Auth protection wrapper
│       │   ├── context/
│       │   │   └── AuthContext.jsx     # Auth state management
│       │   ├── pages/
│       │   │   ├── Login.jsx           # Login page
│       │   │   ├── Register.jsx        # Registration page
│       │   │   ├── Dashboard.jsx       # User dashboard
│       │   │   └── AdminDashboard.jsx  # Admin panel
│       │   └── App.jsx                 # Main app component
│       └── package.json
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm start
# or with nodemon for development
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client/vite-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔑 Key Features

### User Features
- ✅ User authentication (Register/Login)
- ✅ Browse available assets
- ✅ Search and filter assets
- ✅ Request asset bookings
- ✅ Track booking status
- ✅ View booking history
- ✅ Manage personal requests

### Admin Features
- ✅ Approve/Reject booking requests
- ✅ Issue assets to users
- ✅ Track asset returns
- ✅ View analytics dashboard
- ✅ Monitor asset utilization
- ✅ View top requested assets
- ✅ Track booking statistics

### Dashboard Features
- ✅ Total assets count
- ✅ Total bookings
- ✅ Pending requests
- ✅ Approved bookings
- ✅ Top utilized assets
- ✅ Asset availability tracking

## 📱 Usage Flow

### For Regular Users:
1. **Register** - Create an account with `role: user`
2. **Browse** - Explore available assets
3. **Request** - Submit booking requests with dates and quantity
4. **Track** - Monitor request status (Pending → Approved → Issued → Returned)

### For Administrators:
1. **Login** - Use admin account (`role: admin`)
2. **Manage** - Review pending booking requests
3. **Approve** - Approve or reject requests
4. **Issue** - Issue approved assets to users
5. **Return** - Process asset returns
6. **Analytics** - View dashboard statistics

## 🔐 Authentication

The platform uses **JWT (JSON Web Tokens)** for authentication:
- Tokens are stored in localStorage
- Auto-included in API requests
- Role-based access control (Admin vs User)

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Assets
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get specific asset

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/my` - Get user's bookings
- `PUT /api/bookings/:id/approve` - Approve booking
- `PUT /api/bookings/:id/reject` - Reject booking
- `PUT /api/bookings/:id/issue` - Issue asset
- `PUT /api/bookings/:id/return` - Return asset

### Dashboard
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/top-assets` - Get top assets

## 🎨 UI Components

### Navbar
- User profile display
- Role indicator
- Logout button

### Login/Register
- Form validation
- Error handling
- Role selection

### Dashboard (User)
- Asset browsing grid
- Booking form modal
- Booking history
- Status tracking

### Admin Dashboard
- Booking management
- Approval/Rejection workflow
- Asset issue/return tracking
- Analytics overview

## ⚠️ Important Notes

### Server Must Be Running
- The frontend requires the backend server to be running
- Ensure `http://localhost:5000` is accessible
- Check CORS is enabled in backend

### Required Dependencies
```bash
# Frontend
npm install react-router-dom

# Backend (should already be installed)
npm install express cors dotenv mongoose jsonwebtoken bcryptjs
```

### Development Tips
1. Use `npm start` for backend (with nodemon auto-restart)
2. Keep frontend dev server running in another terminal
3. Check browser console for API errors
4. Use admin account to test approval workflows
5. Test with different user roles

## 🐛 Troubleshooting

### "Cannot GET /api/bookings"
- Ensure server is running on port 5000
- Check if routes are properly mounted

### "Invalid token" errors
- Clear localStorage and re-login
- Check JWT_SECRET matches

### CORS errors
- Ensure backend has CORS enabled
- Check frontend is on localhost:5173

### MongoDB connection fails
- Verify MongoDB URI in .env
- Check database credentials
- Ensure MongoDB is running

## 📝 Test Credentials

### User Account
- Email: `user@example.com`
- Password: `password123`
- Role: `user`

### Admin Account
- Email: `admin@example.com`
- Password: `admin123`
- Role: `admin`

## 🚀 Performance Optimization

- Lazy loading for pages
- Efficient API calls
- Proper error handling
- Loading states for better UX
- Responsive design

## 📦 Build for Production

Frontend:
```bash
npm run build
npm run preview
```

Backend:
```bash
node server.js
```

## 🤝 Contributing

1. Create feature branches
2. Follow code style
3. Add comments for complex logic
4. Test thoroughly before pushing

## 📄 License

This project is part of IIT Roorkee hackathon challenge.
