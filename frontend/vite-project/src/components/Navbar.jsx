/* import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/cart`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok && data.items) {
          const totalItems = data.items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          setCartCount(totalItems);
        }
      } catch (error) {
        console.error("Error fetching cart count", error);
      }
    };

    fetchCartCount();

    const interval = setInterval(fetchCartCount, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-8 py-4 flex justify-between items-center">


      <Link
        to="/"
        className="text-2xl font-bold text-orange-500 tracking-wide hover:scale-105 transition"
      >
        MediSwift
      </Link>

   
      <div className="flex items-center gap-6 font-medium text-gray-700">

        <Link to="/" className="hover:text-orange-500 transition">
          Home
        </Link>

        <Link to="/medicines" className="hover:text-orange-500 transition">
          Medicines
        </Link>

        {user && (
          <>
           
            <Link
              to="/cart"
              className="relative hover:text-orange-500 transition"
            >
              Cart

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/checkout" className="hover:text-orange-500 transition">
              Checkout
            </Link>

            <Link to="/my-orders" className="hover:text-orange-500 transition">
              My Orders
            </Link>
          </>
        )}

      
        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="hover:text-orange-500 transition"
          >
            Admin
          </Link>
        )}

      
        {!user ? (
          <>
            <Link
              to="/login"
              className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg hover:bg-orange-100 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
         
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-orange-200 transition"
            >
              <FaUser />
              {user.name}
            </Link>

          
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; */


import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  // FETCH CART LOGIC
  useEffect(() => {
    const fetchCartCount = async () => {
      if (!user || user.role === "admin") {
        setCartCount(0);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok && data.items) {
          const totalItems = data.items.reduce((sum, item) => sum + item.quantity, 0);
          setCartCount(totalItems);
        }
      } catch (error) {
        console.error("Error fetching cart count", error);
      }
    };

    fetchCartCount();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-blue-50 px-10 py-4 flex justify-between items-center border-b border-blue-100">
      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-tight"
        style={{ fontFamily: "'Georgia', serif" }}
      >
        <span className="border-2 border-blue-600 text-blue-600 px-2 py-0.5 rounded-md mr-0.5">
          Medi
        </span>
        <span className="text-gray-800">Swift</span>
      </Link>

      {/* NAVIGATION */}
      <div className="flex items-center gap-8 font-medium text-gray-700">
        {/* Always visible links */}
        <Link
          to="/"
          className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5 hover:text-blue-700 transition"
        >
          Home
        </Link>
        <Link to="/medicines" className="hover:text-blue-600 transition">
          Medicines
        </Link>

        {user ? (
          <>
            {user.role === "admin" ? (
              <Link
                to="/admin-dashboard"
                className="flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700"
              >
                <FaChartLine /> Admin Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/cart"
                  className="relative hover:text-blue-600 transition flex items-center gap-1"
                >
                  <FaShoppingCart /> Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/my-orders" className="hover:text-blue-600 transition">
                  My Orders
                </Link>
              </>
            )}

            <div className="h-6 w-[1px] bg-gray-300 mx-1"></div>

            {/* Profile & Logout */}
            <span className="flex items-center gap-2 bg-white text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold border border-blue-200">
              <FaUser className="text-xs" />
              {user.name} {user.role === "admin" && "(Admin)"}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition text-sm shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          /* GUEST: Login + Register styled like reference image */
          <>
            <Link
              to="/login"
              className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md font-semibold hover:bg-blue-50 transition text-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-blue-700 transition text-sm shadow-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;