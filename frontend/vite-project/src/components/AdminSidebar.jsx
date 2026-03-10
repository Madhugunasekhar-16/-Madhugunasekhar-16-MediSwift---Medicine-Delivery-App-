import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { 
  FaChartLine, 
  FaClipboardList, 
  FaCapsules, 
  FaUsers, 
  FaHome, 
  FaArrowLeft, 
  FaSignOutAlt,
  FaGlobe
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  
  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
        : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <div className="w-64 min-h-screen bg-white border-r border-slate-200 flex flex-col justify-between p-6 sticky top-0 shadow-sm">
      <div>
        
        <div className="mb-10 px-2">
          <h2 className="text-2xl font-black tracking-tight">
            <span className="text-blue-600">Medi</span>
            <span className="text-slate-800">Swift</span>
            <span className="block text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mt-1">Admin Panel</span>
          </h2>
        </div>

        
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Main Menu</p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/admin/dashboard" className={getNavLinkClass}>
              <FaChartLine className="text-lg" /> Dashboard
            </NavLink>
            <NavLink to="/admin/orders" className={getNavLinkClass}>
              <FaClipboardList className="text-lg" /> Orders
            </NavLink>
            <NavLink to="/admin/medicines" className={getNavLinkClass}>
              <FaCapsules className="text-lg" /> Manage Medicines
            </NavLink>
            <NavLink to="/admin/users" className={getNavLinkClass}>
              <FaUsers className="text-lg" /> Users
            </NavLink>
          </nav>
        </div>

        <hr className="border-slate-100 my-8" />

        
        <div className="space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">Exit Admin</p>
          <nav className="flex flex-col gap-1">
            <NavLink to="/" className={getNavLinkClass} end>
              <FaHome className="text-lg" /> Home Page
            </NavLink>
            <NavLink to="/medicines" className={getNavLinkClass}>
              <FaArrowLeft className="text-lg" /> Back to Shop
            </NavLink>
          </nav>
        </div>
      </div>

    
      <div className="pt-6 border-t border-slate-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 font-semibold hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
        >
          <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" /> 
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;