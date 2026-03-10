import { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/orders/admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setOrders(data.orders);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/orders/admin/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ orderStatus: newStatus }),
        }
      );

      if (response.ok) {

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );

      alert("Order status updated successfully");

    } else {
      alert("Failed to update order status");
    }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading orders...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">User</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Prescription</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => {

                return (
                  <tr key={order._id} className="border-t">

                   
                    <td className="p-4">
                      {order._id.slice(-6)}
                    </td>

                  
                    <td className="p-4">
                      {order.user?.name || "Unknown"}
                    </td>

                   
                    <td className="p-4">
                      ₹{order.totalAmount?.toFixed(2) || "0.00"}
                    </td>

                  
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium
                        ${
                          order.orderStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.orderStatus === "Approved"
                            ? "bg-blue-100 text-blue-700"
                            : order.orderStatus === "Shipped"
                            ? "bg-purple-100 text-purple-700"
                            : order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

               
                    <td className="p-4">
                      {order.prescriptionImage ? (
                        <a
                          href={order.prescriptionImage}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                      ) : (
                        "No"
                      )}
                    </td>

                  
                    <td className="p-4">
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="border p-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminOrders;