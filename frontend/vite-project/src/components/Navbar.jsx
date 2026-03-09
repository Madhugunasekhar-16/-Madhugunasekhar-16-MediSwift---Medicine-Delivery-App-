import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaUser, FaShoppingCart, FaChartLine } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

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

  // Reusable Tailwind class for links with the blue rounded-box hover
  const navLinkClasses = "no-underline text-gray-700 font-medium text-[0.95rem] px-4 py-2 rounded-xl transition-all duration-200 hover:bg-blue-600 hover:text-white flex items-center gap-2";

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#EEF4FF] border-b border-[#C7D9F8] px-12 py-3.5 flex justify-between items-center box-border">
      
      {/* LOGO */}
      <Link to="/" className="no-underline flex items-center font-sans text-2xl font-extrabold tracking-tight">
        <span className="text-blue-600">Medi</span>
        <span className="text-slate-800">Swift</span>
      </Link>

      {/* RIGHT SIDE NAV */}
      <div className="flex items-center gap-2">
        
        {/* Home Link - Removed the blue underline style */}
        <Link to="/" className={navLinkClasses}>
          Home
        </Link>

        {/* Medicines and Cart now use the navLinkClasses for the hover box effect */}
        <Link to="/medicines" className={navLinkClasses}>
          Medicines
        </Link>

        {user ? (
          <>
            {user.role === "admin" ? (
              <Link to="/admin-dashboard" className={`${navLinkClasses} text-blue-600 font-bold`}>
                <FaChartLine /> Admin Dashboard
              </Link>
            ) : (
              <>
                <Link to="/cart" className={`relative ${navLinkClasses}`}>
                  <FaShoppingCart /> Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/my-orders" className={navLinkClasses}>
                  My Orders
                </Link>
              </>
            )}

            {/* Separator */}
            <div className="h-6 w-[1px] bg-slate-300 mx-3" />

            {/* Profile Button - Changed from <span> to <Link> to make it work */}
            <Link 
              to="/profile" 
              className="no-underline flex items-center gap-2 bg-white text-blue-700 border border-blue-200 px-4 py-1.5 rounded-full text-[0.85rem] font-semibold mr-2 transition-all hover:bg-blue-50 hover:border-blue-300"
            >
              <FaUser className="text-[11px]" />
              {user.name} {user.role === "admin" && "(Admin)"}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-lg border-none cursor-pointer text-[0.875rem] font-semibold hover:bg-red-600 transition-colors shadow-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4 ml-2">
            <Link
              to="/login"
              className="no-underline border-[1.5px] border-blue-600 text-blue-600 px-6 py-2 rounded-lg text-[0.9rem] font-semibold hover:bg-blue-50 transition-all"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="no-underline bg-blue-600 text-white px-6 py-2 rounded-lg text-[0.9rem] font-semibold hover:bg-blue-700 shadow-md transition-all"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;