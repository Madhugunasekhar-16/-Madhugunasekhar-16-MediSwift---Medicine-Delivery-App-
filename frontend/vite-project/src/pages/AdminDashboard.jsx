import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FaShoppingCart, FaCapsules, FaUsers, FaRupeeSign } from "react-icons/fa";


const AdminDashboard = () => {

  

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalMedicines: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    const fetchDashboardData = async () => {
      try {

        const token = localStorage.getItem("token");

        
        const statsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/admin/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const statsData = await statsResponse.json();

        if (!statsResponse.ok) {
          setError("Failed to load dashboard stats");
          return;
        }

        setStats(statsData);

      
        const ordersResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const ordersData = await ordersResponse.json();

        if (ordersResponse.ok) {
          setRecentOrders(ordersData.orders.slice(0, 5));
        }

      } catch (error) {
        console.error("Dashboard error:", error);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();

  }, []);

  const chartData = [
    { name: "Orders", value: stats.totalOrders },
    { name: "Medicines", value: stats.totalMedicines },
    { name: "Users", value: stats.totalUsers },
    { name: "Revenue", value: stats.totalRevenue },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

     
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div 
          onClick={() => navigate("/admin/orders")}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-gray-500 flex items-center gap-2">
            <FaShoppingCart /> Total Orders
          </h2>
          <p className="text-3xl font-bold text-blue-600">
            {stats.totalOrders}
          </p>
        </div>

        <div
          onClick={() => navigate("/admin/medicines")}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-gray-500 flex items-center gap-2">
            <FaCapsules /> Total Medicines
          </h2>
          <p className="text-3xl font-bold text-green-600">
            {stats.totalMedicines}
          </p>
        </div>

        <div
          onClick={() => navigate("/admin/users")}
          className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
        >
          <h2 className="text-gray-500 flex items-center gap-2">
            <FaUsers /> Total Users
          </h2>
          <p className="text-3xl font-bold text-purple-600">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-gray-500 flex items-center gap-2">
            <FaRupeeSign /> Revenue
          </h2>
          <p className="text-3xl font-bold text-orange-600">
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>

      </div>

     
      <div className="bg-white p-6 rounded-lg shadow mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Platform Analytics
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>

      </div>

      
      <div className="bg-white p-6 rounded-lg shadow mt-10">

        <h2 className="text-xl font-semibold mb-4">
          Recent Orders
        </h2>

        {recentOrders.length === 0 ? (
          <p className="text-gray-500">No recent orders</p>
        ) : (
          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">User</th>
                <th className="py-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => {

                return (
                  <tr key={order._id} className="border-b">

                    <td className="py-2">
                      {order._id.slice(-6)}
                    </td>

                    <td className="py-2">
                      {order.user?.name || "User"}
                    </td>

                    <td className="py-2">
                      ₹{order.totalAmount?.toLocaleString("en-IN")}
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default AdminDashboard;