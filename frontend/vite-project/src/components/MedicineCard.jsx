import { useState } from "react";
import { FaShoppingCart, FaExclamationTriangle, FaPlus, FaMinus } from "react-icons/fa";

const MedicineCard = ({ medicine, onSuccess }) => {
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const increment = () => {
    if (qty < medicine.stock) setQty(prev => prev + 1);
  };

  const decrement = () => {
    if (qty > 1) setQty(prev => prev - 1);
  };

  const handleAddToCart = async () => {
    setLoading(true);
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
        body: JSON.stringify({ medicineId: medicine._id, quantity: qty })
      });

      const data = await response.json();
      
      if (response.ok) {
       
        onSuccess(qty);
        window.dispatchEvent(new Event("cartUpdated"));
    
        setQty(1);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-sm p-5 w-full hover:shadow-xl hover:-translate-y-1 transform transition duration-300 border border-slate-100 flex flex-col h-full group">
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <img
          src={medicine.image || "https://placehold.co/400x300?text=No+Image"}
          alt={medicine.name}
          className="w-full h-44 object-cover bg-slate-50 group-hover:scale-105 transition-transform duration-500"
          onError={(e) => e.target.src = "https://placehold.co/400x300?text=Error+Loading"}
        />
        {medicine.prescriptionRequired && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
            Rx Required
          </span>
        )}
      </div>

      <div className="flex-1">
        <div className="text-blue-600 text-[10px] font-black uppercase tracking-wider mb-1">
          {medicine.category}
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">{medicine.name}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-3">{medicine.description}</p>
        
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Total Price</p>
            <p className="text-xl font-black text-slate-900">₹{medicine.price * qty}</p>
          </div>
          
         
          {medicine.stock > 0 && (
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button 
                onClick={decrement}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-slate-400 hover:text-blue-600 shadow-sm transition-colors"
              >
                <FaMinus size={8} />
              </button>
              <span className="font-bold text-slate-800 text-xs w-5 text-center">{qty}</span>
              <button 
                onClick={increment}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-lg text-slate-400 hover:text-blue-600 shadow-sm transition-colors"
              >
                <FaPlus size={8} />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className={`text-[11px] font-bold ${medicine.stock > 0 ? "text-green-500" : "text-red-500"}`}>
            {medicine.stock > 0 ? `In Stock: ${medicine.stock}` : "Out of Stock"}
          </p>
          {medicine.stock > 0 && medicine.stock <= 5 && (
            <p className="text-red-500 text-[10px] font-bold flex items-center gap-1">
              <FaExclamationTriangle /> Low stock!
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={medicine.stock === 0 || loading}
        className={`w-full py-3.5 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2 ${
          medicine.stock === 0 
            ? "bg-slate-200 cursor-not-allowed text-slate-400" 
            : "bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-100"
        }`}
      >
        <FaShoppingCart size={14} /> 
        {loading ? "Adding..." : medicine.stock === 0 ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
};

export default MedicineCard;