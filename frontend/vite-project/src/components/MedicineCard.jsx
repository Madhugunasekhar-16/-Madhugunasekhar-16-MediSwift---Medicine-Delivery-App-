import { FaShoppingCart, FaExclamationTriangle } from "react-icons/fa";

const MedicineCard = ({ medicine }) => {
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("Please login to add items to cart");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ medicineId: medicine._id, quantity: 1 })
      });

      const data = await response.json();
      if (response.ok) alert("Medicine added to cart successfully");
      else alert(data.message);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm p-5 w-full hover:shadow-xl hover:-translate-y-1 transform transition duration-300 border border-slate-100 flex flex-col h-full">
      <div className="relative">
        <img
          src={medicine.image || "https://placehold.co/400x300?text=No+Image"}
          alt={medicine.name}
          className="w-full h-44 object-cover rounded-2xl mb-4 bg-slate-50"
          onError={(e) => e.target.src = "https://placehold.co/400x300?text=Error+Loading"}
        />
        {medicine.prescriptionRequired && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
            Rx Required
          </span>
        )}
      </div>

      <div className="flex-1">
        <div className="text-blue-600 text-[10px] font-black uppercase tracking-wider mb-1">{medicine.category}</div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">{medicine.name}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-3">{medicine.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-black text-slate-900">₹{medicine.price}</p>
          <div className="text-right">
             <p className={`text-[11px] font-bold ${medicine.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                {medicine.stock > 0 ? `Stock: ${medicine.stock}` : "Out of Stock"}
             </p>
          </div>
        </div>

        {medicine.stock > 0 && medicine.stock <= 5 && (
          <p className="text-red-500 text-[10px] font-bold mb-3 flex items-center gap-1">
            <FaExclamationTriangle /> Low stock!
          </p>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={medicine.stock === 0}
        className={`w-full py-3 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 ${
          medicine.stock === 0 ? "bg-slate-200 cursor-not-allowed text-slate-400" : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-md shadow-blue-100"
        }`}
      >
        <FaShoppingCart size={14} /> {medicine.stock === 0 ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
};

export default MedicineCard;