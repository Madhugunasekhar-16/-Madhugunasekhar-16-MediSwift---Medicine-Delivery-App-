import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { 
  FaChartLine, 
  FaClipboardList, 
  FaCapsules, 
  FaUsers, 
  FaHome, 
  FaArrowLeft, 
  FaSignOutAlt 
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Improved styling: Light background to match your dashboard screenshot
  const linkStyle = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col justify-between p-6 sticky top-0">
      <div>
        {/* Brand Header */}
        <div className="mb-10 px-2">
          <h2 className="text-2xl font-black tracking-tight">
            <span className="text-blue-600">Medi</span>
            <span className="text-slate-800">Swift</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">Admin Panel</span>
          </h2>
        </div>

        {/* Main Menu */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Main Menu</p>
          <nav className="flex flex-col gap-1">
            <Link to="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
              <FaChartLine /> Dashboard
            </Link>
            <Link to="/admin/orders" className={linkStyle("/admin/orders")}>
              <FaClipboardList /> Orders
            </Link>
            <Link to="/admin/medicines" className={linkStyle("/admin/medicines")}>
              <FaCapsules /> Manage Medicines
            </Link>
            <Link to="/admin/users" className={linkStyle("/admin/users")}>
              <FaUsers /> Users
            </Link>
          </nav>
        </div>

        <hr className="border-slate-100 my-8" />

        {/* Secondary Menu */}
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Quick Links</p>
          <nav className="flex flex-col gap-1">
            <Link to="/" className={linkStyle("/")}>
              <FaHome /> Home
            </Link>
            <Link to="/medicines" className={linkStyle("/medicines")}>
              <FaArrowLeft /> Back to Shop
            </Link>
          </nav>
        </div>
      </div>

      {/* Logout Section */}
      <div className="pt-6 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 font-semibold hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;