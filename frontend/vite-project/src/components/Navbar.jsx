import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useCallback } from "react";
import { FaUser, FaShoppingCart, FaChartLine, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const fetchCartCount = useCallback(async () => {
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
  }, [user]);

  useEffect(() => {
   
    fetchCartCount();

  
    window.addEventListener("cartUpdated", fetchCartCount);
    
    
    return () => window.removeEventListener("cartUpdated", fetchCartCount);
  }, [fetchCartCount]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  const navLinkClasses = "no-underline text-gray-700 font-medium text-[0.95rem] px-4 py-2 rounded-xl transition-all duration-200 hover:bg-blue-600 hover:text-white flex items-center gap-2";
  const mobileLinkClasses = "no-underline text-gray-700 font-bold text-lg py-4 border-b border-gray-100 flex items-center gap-3";

  return (
    <nav className="sticky top-0 z-[100] w-full bg-[#EEF4FF] border-b border-[#C7D9F8] px-6 md:px-12 py-3 flex justify-between items-center box-border">
      <Link to="/" className="no-underline flex items-center font-sans text-xl md:text-2xl font-extrabold tracking-tight z-[101]">
        <span className="text-blue-600">Medi</span><span className="text-slate-800">Swift</span>
      </Link>

      <div className="flex items-center gap-3 md:hidden z-[101]">
        {user && user.role !== "admin" && (
          <Link to="/cart" className="relative text-blue-600 text-xl p-2">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full animate-in zoom-in">
                {cartCount}
              </span>
            )}
          </Link>
        )}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl text-slate-800 p-2">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-1">
        <Link to="/" className={navLinkClasses}>Home</Link>
        <Link to="/medicines" className={navLinkClasses}>Medicines</Link>
        
        {!user && (
          <>
            <Link to="/about" className={navLinkClasses}>About Us</Link>
            <Link to="/contact" className={navLinkClasses}>Contact</Link>
          </>
        )}

        {user ? (
          <div className="flex items-center ml-2">
            {user.role === "admin" ? (
              <Link to="/admin/dashboard" className={`${navLinkClasses} text-blue-600 font-bold`}><FaChartLine /> Admin</Link>
            ) : (
              <>
                <Link to="/cart" className={`relative ${navLinkClasses}`}>
                  <FaShoppingCart /> Cart 
                  {cartCount > 0 && (
                    <span className="ml-1 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-bounce-subtle">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <Link to="/my-orders" className={navLinkClasses}>My Orders</Link>
              </>
            )}
            <div className="h-6 w-[1px] bg-slate-300 mx-3" />
            <Link to="/profile" className="no-underline flex items-center gap-2 bg-white text-blue-700 border border-blue-200 px-4 py-1.5 rounded-full text-[0.85rem] font-semibold hover:bg-blue-50">
              <FaUser /> {user.name.split(' ')[0]}
            </Link>
            <button onClick={handleLogout} className="ml-3 bg-red-500 text-white px-4 py-2 rounded-lg text-[0.85rem] font-semibold hover:bg-red-600 transition-colors">Logout</button>
          </div>
        ) : (
          <div className="flex items-center gap-3 ml-4">
            <Link to="/login" className="no-underline border-blue-600 text-blue-600 px-5 py-1.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors">Login</Link>
            <Link to="/register" className="no-underline bg-blue-600 text-white px-5 py-1.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100">Register</Link>
          </div>
        )}
      </div>

    
      <div className={`fixed inset-0 bg-white z-[100] transition-transform duration-300 transform ${isMenuOpen ? "translate-y-0" : "-translate-y-full"} md:hidden pt-20 px-6`}>
        <div className="flex flex-col">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>Home</Link>
          <Link to="/medicines" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>Medicines</Link>
          
          {!user && (
            <>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>About Us</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}>Contact</Link>
            </>
          )}
          
          {user ? (
            <div className="mt-4 space-y-4">
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-blue-600 font-bold text-lg"><FaUser /> Profile</Link>
              {user.role === "admin" && (
                <Link to="/admin/dashboard" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}><FaChartLine /> Admin Dashboard</Link>
              )}
              {user.role !== "admin" && (
                <Link to="/cart" onClick={() => setIsMenuOpen(false)} className={mobileLinkClasses}><FaShoppingCart /> My Cart ({cartCount})</Link>
              )}
              <button onClick={handleLogout} className="w-full bg-red-500 text-white py-4 rounded-xl font-bold mt-4">Logout</button>
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-4">
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-bold">Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)} className="text-center py-4 bg-blue-600 text-white rounded-xl font-bold">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;