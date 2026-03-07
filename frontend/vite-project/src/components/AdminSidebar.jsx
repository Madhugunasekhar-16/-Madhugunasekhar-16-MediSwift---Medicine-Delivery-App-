import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

const AdminSidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = (path) =>
    `px-3 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="w-60 min-h-screen bg-gray-900 text-white flex flex-col justify-between p-6">

   
      <div>

        <h2 className="text-2xl font-bold text-blue-400 mb-10">
          MediSwift Admin
        </h2>

        <nav className="flex flex-col gap-3">

          <Link to="/admin/dashboard" className={linkStyle("/admin/dashboard")}>
            Dashboard
          </Link>

          <Link to="/admin/orders" className={linkStyle("/admin/orders")}>
            Orders
          </Link>

          <Link to="/admin/medicines" className={linkStyle("/admin/medicines")}>
            Medicines
          </Link>

          <Link to="/admin/users" className={linkStyle("/admin/users")}>
            Users
          </Link>

        </nav>

        <hr className="border-gray-700 my-6" />

        <nav className="flex flex-col gap-3">

          <Link to="/home" className={linkStyle("/home")}>
            Home
          </Link>

          <Link to="/medicines" className={linkStyle("/medicines")}>
            Medicines
          </Link>

        </nav>

      </div>

     
      <div>

        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-gray-300 hover:bg-red-500 hover:text-white transition"
        >
          Logout
        </button>

      </div>

    </div>
  );
};

export default AdminSidebar;