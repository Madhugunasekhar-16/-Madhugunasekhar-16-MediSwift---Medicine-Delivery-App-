import { useEffect, useState } from "react";

import Alert from "../components/Alert";

const Checkout = () => {

    const [ cart, setCart ] = useState(null);

    const [ prescriptionFile, setPrescriptionFile ] = useState(null);

    const [ loading, setLoading ] = useState(false);

    const [ message, setMessage ] = useState(null);

    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }

                });

                const data = await response.json();


                if(response.ok) {
                    setCart(data);
                } else {
                    setCart({ items: [] });
                }
            }catch(error) {
                console.error("Error fetching Cart :", error);
                setCart({ items: [] });
            }
        };

        fetchCart();
    }, []);

    const hasPrescriptionMedicine = cart?.items?.some(
        (item) => item.medicine.prescriptionRequired === true
    );

    const handlePlaceOrder = async () => {
        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const formData = new FormData();

            if(prescriptionFile) {
                formData.append("prescription", prescriptionFile);
            }

            const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                method : "POST", 
                headers : {
                    Authorization : `Bearer ${token}`
                },
                body : formData
            });

            const data = await response.json();

            if(response.ok) {
                setMessage("Order placed successfully!");
                setError(null);

                setTimeout(() => {
                window.location.href = "/my-orders";
                }, 1500);
            } else {
                setError(data.message || "Order failed");
                setMessage(null);

            }
        } catch(error) {
            console.error("Order error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow mt-8">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            {hasPrescriptionMedicine && (
                <div style={{ marginTop : "20px" }}>
                    <h4>Upload Prescription</h4>
                    <input 
                        type="file" 
                        onChange={(e) => setPrescriptionFile(e.target.files[0])}
                    />
                </div>
            )}

            {!cart && <p>Loading Cart...</p>}
            
            {cart && cart.items && cart.items.length === 0 && (
                <p>Your cart is empty</p>
            )}

            {cart && cart.items && cart.items.length > 0 && (
                <div>
                    {cart.items.map((item) => (
                        <div 
                            key={item.medicine._id}
                            style={{
                                border : "1px solid #ddd",
                                padding : "10px",
                                marginBottom : "10px"
                            }}
                        >

                            <h4>{item.medicine.name}</h4>
                            <p>Price : ₹{item.medicine.price}</p>
                            <p>Quantity : {item.quantity}</p>
                        </div>
                    ))}

                    <Alert type="success" message={message} />
                    <Alert type="error" message={error} />

                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className={`mt-6 px-6 py-2 rounded-lg text-white transition ${
                        loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Processing...
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