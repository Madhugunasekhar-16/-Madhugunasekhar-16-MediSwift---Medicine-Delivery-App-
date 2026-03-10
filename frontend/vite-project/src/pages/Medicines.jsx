import { useState, useEffect } from "react";
import MedicineCard from "../components/MedicineCard";
import { FaFilter, FaSearch } from "react-icons/fa";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Pain Relief", "Antibiotics", "Diabetes Care", "Heart Health", "Digestive Health", "Vitamins", "Personal Care"];

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines`);
        const data = await response.json();
        setMedicines(data.medicines);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-slate-800 mb-8">Browse Medicines</h1>

       
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by medicine name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-all ${
                  selectedCategory === cat ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        
        {filteredMedicines.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 text-xl font-medium">No medicines found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredMedicines.map(med => <MedicineCard key={med._id} medicine={med} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicines;