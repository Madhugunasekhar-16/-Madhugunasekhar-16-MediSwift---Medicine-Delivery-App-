import { useEffect, useState } from "react";
import Alert from "../components/Alert";

const Checkout = () => {
    const [cart, setCart] = useState(null);
    const [prescriptionFile, setPrescriptionFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setCart(data);
                } else {
                    setCart({ items: [] });
                }
            } catch (error) {
                console.error("Error fetching Cart:", error);
                setCart({ items: [] });
            }
        };

        fetchCart();
    }, []);

    const hasPrescriptionMedicine = cart?.items?.some(
        (item) => item.medicine.prescriptionRequired === true
    );

    const handlePlaceOrder = async () => {
        if (hasPrescriptionMedicine && !prescriptionFile) {
            setError("Please upload a prescription to proceed.");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setMessage(null);

            const token = localStorage.getItem("token");
            const formData = new FormData();

            if (prescriptionFile) {
                formData.append("prescription", prescriptionFile);
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Order placed successfully! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/my-orders";
                }, 3000);
            } else {
                setError(data.message || "Order failed");
            }
        } catch (error) {
            console.error("Order error", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow mt-8 relative">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            {(message || error) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999]">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-300">
                        <Alert type={message ? "success" : "error"} message={message || error} />
                        
                        {error && (
                            <button 
                                onClick={() => setError(null)}
                                className="mt-4 w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
                            >
                                Try Again
                            </button>
                        )}
                    </div>
                </div>
            )}

            {hasPrescriptionMedicine && (
                <div className="mt-5 mb-6 p-4 border-2 border-dashed border-blue-200 rounded-lg bg-blue-50">
                    <h4 className="font-semibold text-blue-800 mb-2">Upload Prescription</h4>
                    <input 
                        type="file" 
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        onChange={(e) => setPrescriptionFile(e.target.files[0])}
                    />
                </div>
            )}

            {!cart && <p className="text-center py-10">Loading Cart...</p>}
            
            {cart && cart.items && cart.items.length === 0 && (
                <p className="text-center py-10 text-gray-500">Your cart is empty</p>
            )}

            {cart && cart.items && cart.items.length > 0 && (
                <div>
                    {cart.items.map((item) => (
                        <div 
                            key={item.medicine._id}
                            className="flex justify-between items-center border border-gray-100 p-4 mb-3 rounded-lg hover:bg-gray-50 transition"
                        >
                            <div>
                                <h4 className="font-medium text-lg">{item.medicine.name}</h4>
                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-bold text-green-600">₹{item.medicine.price}</p>
                        </div>
                    ))}

                    <button
                        onClick={handlePlaceOrder}
                        disabled={loading}
                        className={`w-full mt-6 py-3 rounded-xl text-white font-bold text-lg shadow-lg transition ${
                            loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700 active:scale-[0.98]"
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Processing Order...
                            </span>
                        ) : (
                            "Place Order"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Checkout;