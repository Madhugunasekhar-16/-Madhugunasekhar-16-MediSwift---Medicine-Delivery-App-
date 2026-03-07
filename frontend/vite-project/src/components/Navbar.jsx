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

        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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

    const interval = setInterval(fetchCartCount, 2000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md px-8 py-4 flex justify-between items-center">

      <Link to="/" className="text-white text-xl font-bold tracking-wide">
        MediSwift
      </Link>

      <div className="flex items-center gap-6 text-white font-medium">

        <Link to="/" className="hover:text-gray-200 transition">
          Home
        </Link>

        <Link to="/medicines" className="hover:text-gray-200 transition">
          Medicines
        </Link>

        {user && (
          <>
            <Link to="/cart" className="relative hover:text-gray-200 transition">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/checkout" className="hover:text-gray-200 transition">
              Checkout
            </Link>

            <Link to="/my-orders" className="hover:text-gray-200 transition">
              My Orders
            </Link>

            
          </>
        )}

        {user?.role === "admin" && (
          <Link
            to="/admin/dashboard"
            className="hover:text-gray-200 transition"
          >
            Admin Dashboard
          </Link>
        )}

        {!user ? (
          <Link to="/login" className="hover:text-gray-200 transition">
            Login
          </Link>
        ) : (
          <>
          
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold hover:bg-gray-100 transition"
            >
              <FaUser />
              {user.name}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
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