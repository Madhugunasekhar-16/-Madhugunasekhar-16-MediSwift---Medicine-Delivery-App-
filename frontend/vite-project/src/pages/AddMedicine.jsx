import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaCapsules, FaBox, FaCalendarAlt, FaSearch, FaTimes } from "react-icons/fa";

const AddMedicine = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  
  // States for search and filter (UI alignment)
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    name: "", 
    category: "", 
    description: "", 
    price: "",
    stock: 0, 
    prescriptionRequired: false, 
    expiryDate: "",
  });

  const categories = ["Pain Relief", "Antibiotics", "Diabetes Care", "Heart Health", "Digestive Health", "Vitamins", "Personal Care"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setFormData({ ...formData, category: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) return alert("Please select a category");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      if (image) data.append("image", image);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (response.ok) {
        alert("Medicine added successfully!");
        navigate("/admin/medicines");
      } else {
        const result = await response.json();
        alert(result.message || "Failed to add medicine");
      }
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top Controls Row - Aligned Category (Left) and Search (Right) */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Category</span>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-slate-50 border border-slate-200 text-slate-700 py-2 px-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer text-sm font-medium"
            >
              <option value="">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          {(searchTerm || formData.category) && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 px-3 py-2 rounded-lg transition-colors"
            >
              <FaTimes size={10} /> Clear
            </button>
          )}
        </div>

        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 size-3.5" />
          <input
            type="text"
            placeholder="Search reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
      </div>

      {/* Main Form Card */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
            <FaCapsules size={24}/>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Add New Medicine</h1>
            <p className="text-slate-400 text-sm">Enter the details to update your inventory</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Medicine Name *</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange} 
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="e.g. Paracetamol 500mg"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              Price (₹) *
            </label>
            <input 
              type="number" 
              name="price" 
              value={formData.price}
              onChange={handleChange} 
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <FaBox className="text-slate-400"/> Stock Level *
            </label>
            <input 
              type="number" 
              name="stock" 
              value={formData.stock}
              onChange={handleChange} 
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
              required 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <FaCalendarAlt className="text-slate-400"/> Expiry Date
            </label>
            <input 
              type="date" 
              name="expiryDate" 
              value={formData.expiryDate}
              onChange={handleChange} 
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
            <textarea 
              name="description" 
              rows="3" 
              value={formData.description}
              onChange={handleChange} 
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none" 
              required 
              placeholder="Usage instructions or details..."
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="flex gap-3 items-center cursor-pointer p-3 hover:bg-slate-50 rounded-xl w-fit transition-colors border border-transparent hover:border-slate-100">
              <input 
                type="checkbox" 
                name="prescriptionRequired" 
                checked={formData.prescriptionRequired}
                onChange={handleChange} 
                className="w-5 h-5 accent-blue-600 rounded-lg" 
              />
              <span className="text-sm font-bold text-slate-700">Prescription Required (Rx)</span>
            </label>
          </div>

          <div className="md:col-span-2 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-blue-400 transition-all bg-slate-50/50">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="img-upload" 
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }
              }} 
            />
            <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center">
              {preview ? (
                <div className="relative group">
                  <img src={preview} className="h-40 w-40 object-cover rounded-2xl shadow-md border-4 border-white" />
                  <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs font-bold">Change Image</p>
                  </div>
                </div>
              ) : (
                <>
                  <FaCloudUploadAlt size={48} className="text-blue-400 mb-3" />
                  <span className="text-slate-600 font-bold">Upload Medicine Image</span>
                  <p className="text-slate-400 text-xs mt-1">PNG, JPG or WebP (Max 2MB)</p>
                </>
              )}
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="md:col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all disabled:bg-slate-300 disabled:shadow-none mt-4"
          >
            {loading ? "Processing..." : "Confirm & Add Medicine"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMedicine;