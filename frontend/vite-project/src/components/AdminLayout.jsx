import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    `font-medium px-3 py-2 rounded-md transition-all ${
      isActive ? "text-blue-600 bg-blue-50 translate-x-2" : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <h2 className="text-xl font-bold mb-8 text-blue-600 font-sans">MediSwift Admin</h2>
          <nav className="flex flex-col space-y-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Main Menu</p>
            <NavLink to="/admin/dashboard" className={navLinkClass}>Dashboard</NavLink>
            <NavLink to="/admin/orders" className={navLinkClass}>Orders</NavLink>
            <NavLink to="/admin/medicines" className={navLinkClass}>Manage Medicines</NavLink>
            <NavLink to="/admin/users" className={navLinkClass}>Users</NavLink>
            <hr className="my-4" />
            <NavLink to="/" className={navLinkClass}>Back to Website</NavLink>
          </nav>
        </div>
        <button onClick={() => { logout(); navigate("/login"); }} className="text-red-500 font-bold p-2 hover:bg-red-50 rounded-md transition-all">Logout</button>
      </div>
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto"><Outlet /></div>
      </div>
    </div>
  );
};

export default AdminLayout;