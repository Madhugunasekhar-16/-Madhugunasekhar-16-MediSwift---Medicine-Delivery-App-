import { Link, useNavigate } from "react-router-dom";
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

      {/* LOGO */}
      <Link
        to="/"
        className="text-2xl font-bold text-orange-500 tracking-wide hover:scale-105 transition"
      >
        MediSwift
      </Link>

      {/* RIGHT SIDE MENU */}
      <div className="flex items-center gap-6 font-medium text-gray-700">

        <Link to="/" className="hover:text-orange-500 transition">
          Home
        </Link>

        <Link to="/medicines" className="hover:text-orange-500 transition">
          Medicines
        </Link>

        {user && (
          <>
            {/* CART */}
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

        {/* ADMIN LINK */}
        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="hover:text-orange-500 transition"
          >
            Admin
          </Link>
        )}

        {/* AUTH BUTTONS */}
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
            {/* PROFILE */}
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-orange-200 transition"
            >
              <FaUser />
              {user.name}
            </Link>

            {/* LOGOUT */}
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

export default Navbar;