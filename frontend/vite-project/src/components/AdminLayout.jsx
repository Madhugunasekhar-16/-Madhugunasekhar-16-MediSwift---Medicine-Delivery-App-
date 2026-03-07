import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  
  
const navLinkClass = ({ isActive }) =>
  `font-medium px-3 py-2 rounded-md transition-all duration-300 ease-in-out transform ${
    isActive
      ? "text-blue-600 bg-blue-50 translate-x-2" 
      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50 hover:translate-x-1" 
  }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
     
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-8 text-blue-600">
            MediSwift Admin
          </h2>

          <nav className="flex flex-col space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Admin Menu</p>
            <NavLink to="/admin/dashboard" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/admin/orders" className={navLinkClass}>Orders</NavLink>
            <NavLink to="/admin/medicines" className={navLinkClass}>Manage Medicines</NavLink>
            <NavLink to="/admin/users" className={navLinkClass}>Users</NavLink>

            <hr className="my-4 border-gray-100" />

            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quick Links</p>
            <NavLink to="/home" className={navLinkClass}>Home</NavLink>
            <NavLink to="/medicines" className={navLinkClass}>View Medicines</NavLink>
          </nav>
        </div>

      
        
        <div className="mt-auto pt-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full text-left font-medium text-red-500 px-3 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-red-50 hover:pl-5"
          >
            Logout
          </button>
        </div>
      </div>

     
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;