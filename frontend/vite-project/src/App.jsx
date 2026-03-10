import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Medicines from "./pages/Medicines";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminOrders from "./pages/AdminOrders";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMedicines from "./pages/AdminMedicines";
import EditMedicine from "./pages/EditMedicines";
import AddMedicine from "./pages/AddMedicine";
import AdminUsers from "./pages/AdminUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./components/AdminLayout";
import Navbar from "./components/Navbar"; 
import Footer from "./components/Footer"; 
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

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

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={!isAdminRoute ? "min-h-[80vh]" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          
         
          <Route 
            path="/about" 
            element={user ? <Navigate to="/" replace /> : <AboutPage />} 
          />
          <Route 
            path="/contact" 
            element={user ? <Navigate to="/" replace /> : <ContactPage />} 
          />
          
          <Route path="/login" element={user ? <Navigate to="/medicines" replace /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/medicines" replace /> : <Register />} />

          <Route path="/medicines" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />

        
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="medicines" element={<AdminMedicines />} />
            <Route path="edit-medicine/:id" element={<EditMedicine />} />
            <Route path="add-medicine" element={<AddMedicine />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;