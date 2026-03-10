import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError("Failed to load cart");
          return;
        }

        setCart(data);

      } catch (error) {
        console.error("fetch cart error", error);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (medicineId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          medicineId,
          quantity: newQuantity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Failed to update quantity");
        return;
      }

      setCart(data);

    } catch (error) {
      console.error("Update quantity error", error);
      setError("Server error while updating cart");
    }
  };

  const handleRemove = async (medicineId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/cart/${medicineId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setError("Failed to remove item");
        return;
      }

      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter(
          (item) => item.medicine._id !== medicineId
        ),
      }));

    } catch (error) {
      console.error("Remove error", error);
      setError("Server error while removing item");
    }
  };

  const totalPrice =
    cart?.items?.reduce(
      (total, item) => total + item.medicine.price * item.quantity,
      0
    ) || 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold mb-8">Your Cart</h2>

       
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        {cart && cart.items.length === 0 && (
          <div className="bg-white p-10 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty 🛒</p>

            <Link
              to="/medicines"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Browse Medicines
            </Link>
          </div>
        )}

        {cart &&
          cart.items &&
          cart.items.map((item) => (
            <div
              key={item.medicine._id}
              className="bg-white shadow-md rounded-xl p-6 mb-6 flex justify-between items-center"
            >
              <div>
                <h4 className="text-lg font-semibold">
                  {item.medicine.name}
                </h4>

                <p className="text-gray-600">
                  ₹{item.medicine.price}
                </p>

                <div className="flex items-center gap-4 mt-3">

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.medicine._id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    −
                  </button>

                  <span className="font-medium text-lg">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.medicine._id,
                        item.quantity + 1
                      )
                    }
                    disabled={item.quantity >= item.medicine.stock}
                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 disabled:opacity-50"
                  >
                    +
                  </button>

                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold mb-3">
                  ₹{item.medicine.price * item.quantity}
                </p>

                <button
                  onClick={() => handleRemove(item.medicine._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

        {cart && cart.items.length > 0 && (
          <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">
              Total: ₹{totalPrice}
            </h3>

            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;