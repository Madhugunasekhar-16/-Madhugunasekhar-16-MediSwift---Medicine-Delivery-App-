import { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaChevronRight, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import MedicineCard from "../components/MedicineCard";

const Medicines = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  
  
  const [showPopup, setShowPopup] = useState(false);
  const [lastAddedCount, setLastAddedCount] = useState(0);

  const categories = ["All", "Pain Relief", "Antibiotics", "Diabetes Care", "Heart Health", "Digestive Health", "Vitamins", "Personal Care"];

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines`);
        const data = await response.json();
        setMedicines(data.medicines || data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  
  const handleAddToCartSuccess = (quantity) => {
    setLastAddedCount(quantity);
    setShowPopup(true);
   
    setTimeout(() => setShowPopup(false), 5000);
  };

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Shop Medicines</h1>
          <p className="text-slate-500 mt-2">Search and add healthcare essentials to your cart.</p>
        </header>

       
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-10 flex flex-col lg:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for medicines (e.g. Paracetamol)..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-medium" 
            />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar py-2">
            {categories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-sm font-bold transition-all ${
                  selectedCategory === cat 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "bg-white text-slate-600 border border-slate-100 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

       
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 animate-pulse rounded-[2rem]"></div>
            ))}
          </div>
        ) : filteredMedicines.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <p className="text-slate-400 text-lg font-bold">No medicines found match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-32">
            {filteredMedicines.map(med => (
              <MedicineCard 
                key={med._id} 
                medicine={med} 
                onSuccess={handleAddToCartSuccess} 
              />
            ))}
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-[450px] bg-blue-600 text-white p-5 rounded-[2rem] shadow-2xl z-50 flex justify-between items-center animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl">
              <FaShoppingCart className="text-xl" />
            </div>
            <div>
              <p className="font-black text-base">{lastAddedCount} items added to cart</p>
              <p className="text-blue-100 text-xs font-medium">Continue shopping or check out</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => navigate("/cart")}
              className="bg-white text-blue-600 px-5 py-2.5 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              View Cart <FaChevronRight size={10} />
            </button>
            <button onClick={() => setShowPopup(false)} className="p-2 text-white/50 hover:text-white">
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Medicines;