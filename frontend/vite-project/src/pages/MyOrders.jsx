import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const MyOrders = () => {

  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          setError("Failed to load orders");
          setOrders([]);
          return;
        }

        setOrders(data.orders);

      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Server error. Please try again.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-10">

      <h2 className="text-3xl font-bold mb-8 text-blue-700">
        My Orders
      </h2>

      
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {orders && orders.length === 0 && (
        <div className="text-gray-500">No Orders Found</div>
      )}

      {orders && orders.length > 0 && (
        <div className="grid gap-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition"
            >

              <div className="flex justify-between items-center mb-4">

                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold break-all">{order._id}</p>

                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()} •{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>

                <span
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    order.orderStatus === "Approved"
                      ? "bg-green-100 text-green-700"
                      : order.orderStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {order.orderStatus === "Approved" && <FaCheckCircle />}
                  {order.orderStatus === "Pending" && <FaClock />}
                  {order.orderStatus === "Rejected" && <FaTimesCircle />}

                  {order.orderStatus}

                </span>

              </div>

              <div className="mb-4">
                <p className="font-semibold mb-2">Medicines</p>

                <ul className="space-y-1 text-gray-600">
                  {order.items?.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between border-b pb-1"
                    >
                      <span>{item.medicine?.name}</span>
                      <span>Qty: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <p className="font-medium">Total Amount</p>

                <p className="text-lg font-bold text-blue-700">
                  ₹{order.totalAmount}
                </p>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default MyOrders;