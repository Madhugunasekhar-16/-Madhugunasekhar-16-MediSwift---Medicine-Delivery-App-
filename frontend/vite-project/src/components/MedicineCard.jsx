const MedicineCart = ({ medicine }) => {

const handleAddToCart = async () => {
    try {

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login to add items to cart");
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                medicineId: medicine._id,
                quantity: 1
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Medicine added to cart successfully");
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error("Add to cart error", error);
        alert("Something went wrong");
    }
};

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-full hover:shadow-2xl hover:-translate-y-1 transform transition    duration-300 border">

            <img
                src={medicine.image || "https://via.placeholder.com/150"}
                alt={medicine.name}
                className="w-full h-40 object-cover rounded"
            />


            <h3 className="text-xl font-semibold mb-2">
                {medicine.name}
             </h3>

            <p className="text-gray-600 mb-3">
                {medicine.description}
            </p>


             {medicine.prescriptionRequired && (
                <span className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full mb-3">
                    Prescription Required
                </span>
            )}

            <p className="text-lg font-bold text-green-600 mb-3">
                ₹{medicine.price}
             </p>

            <p className="text-sm text-gray-500">
                Expiry: {medicine.expiryDate 
                    ? new Date(medicine.expiryDate).toLocaleDateString()
                    : "N/A"}
            </p>

            <p className="text-sm mb-3">
                {medicine.stock > 0 
                    ? `In Stock: ${medicine.stock}` 
                    : "Out of Stock"}
            </p>

            {medicine.stock > 0 && medicine.stock <= 5 && (
                 <p className="text-red-500 text-xs font-semibold mb-2">
                    ⚠ Only {medicine.stock} left in stock!
                </p>
            )}


            {medicine.stock === 0 && (
                <span className="block bg-red-500 text-white text-xs px-3 py-1 rounded-md mb-3 w-fit">
                    Out of Stock
                </span>
             )}


            <button
                onClick={handleAddToCart}
                disabled={medicine.stock === 0}
                className={`w-full py-2 rounded-xl text-white font-semibold transition duration-200 ${
                    medicine.stock === 0
                     ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                }`}
            >
                {medicine.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </button>

        </div>
    )
}

export default MedicineCart;