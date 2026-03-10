import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaCapsules, FaBox, FaCalendarAlt } from "react-icons/fa";

const AddMedicine = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
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
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><FaCapsules size={24}/></div>
        <h1 className="text-2xl font-bold text-slate-800">Add New Medicine</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Medicine Name *</label>
          <input type="text" name="name" onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Category *</label>
          <select name="category" onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" required>
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹) *</label>
          <input type="number" name="price" onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-xl outline-none" required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><FaBox className="text-slate-400"/> Stock Level *</label>
          <input type="number" name="stock" onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-xl outline-none" required />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><FaCalendarAlt className="text-slate-400"/> Expiry Date</label>
          <input type="date" name="expiryDate" onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-xl outline-none" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
          <textarea name="description" rows="3" onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none" required placeholder="Usage instructions or details..."></textarea>
        </div>

        <div className="md:col-span-2">
          <label className="flex gap-2 items-center cursor-pointer p-2 hover:bg-slate-50 rounded-lg w-fit">
            <input type="checkbox" name="prescriptionRequired" onChange={handleChange} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm font-semibold text-slate-700">Prescription Required</span>
          </label>
        </div>

        <div className="md:col-span-2 border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors bg-slate-50/30">
          <input type="file" accept="image/*" className="hidden" id="img-upload" onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }
          }} />
          <label htmlFor="img-upload" className="cursor-pointer flex flex-col items-center">
            {preview ? <img src={preview} className="h-32 object-contain mb-2 rounded-lg" /> : <FaCloudUploadAlt size={40} className="text-slate-300 mb-2" />}
            <span className="text-slate-500 text-sm font-medium">Click to upload medicine image</span>
          </label>
        </div>

        <button type="submit" disabled={loading} className="md:col-span-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-slate-300">
          {loading ? "Adding Product..." : "Confirm & Add Medicine"}
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;