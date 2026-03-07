import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Medicines from "./pages/Medicines";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import MyOrders from "./pages/MyOrders";

import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMedicines from "./pages/AdminMedicines";
import EditMedicine from "./pages/EditMedicines";
import AddMedicine from "./pages/AddMedicines";
import AdminUsers from "./pages/AdminUsers";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";

import UserLayout from "./layouts/UserLayout";

import { AuthContext } from "./context/AuthContext";



function App() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Auto logout after 24 hours
  useEffect(() => {
    const loginTime = Number(localStorage.getItem("loginTime"));

    if (loginTime) {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (now - loginTime > oneDay) {
        logout();
        window.location.href = "/login";
      }
    }
  }, [logout]);

  return (
    <Routes>

      {/* Default Route */}
      <Route
        path="/"
        element={
          user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
        }
      />

      {/* AUTH ROUTES */}
      <Route
        path="/login"
        element={user ? <Navigate to="/home" replace /> : <Login />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/home" replace /> : <Register />}
      />

      {/* USER ROUTES */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Home />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/medicines"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Medicines />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Cart />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Checkout />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserLayout>
              <Profile />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <UserLayout>
              <MyOrders />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="medicines" element={<AdminMedicines />} />
        <Route path="edit-medicine/:id" element={<EditMedicine />} />
        <Route path="add-medicine" element={<AddMedicine />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

    </Routes>
  );
}

export default App;