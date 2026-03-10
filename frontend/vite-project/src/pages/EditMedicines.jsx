import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaImage, FaSave } from "react-icons/fa";

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [medicine, setMedicine] = useState({
    name: "", 
    description: "", 
    price: "",
    stock: "", 
    category: "", 
    prescriptionRequired: false, 
    expiryDate: "",
  });

  const categories = [
    "Pain Relief", "Antibiotics", "Diabetes Care", 
    "Heart Health", "Digestive Health", "Vitamins", "Personal Care"
  ];

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/medicines/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          
          const medData = data.medicine || data; 
          setMedicine(medData);
          setPreview(medData.image || null); 
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    fetchMedicine();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicine({ ...medicine, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData(); 
      
      
      data.append("name", medicine.name);
      data.append("description", medicine.description || "");
      data.append("price", medicine.price);
      data.append("stock", medicine.stock);
      data.append("category", medicine.category || ""); 
      data.append("prescriptionRequired", medicine.prescriptionRequired);
      data.append("expiryDate", medicine.expiryDate || "");
      if (image) data.append("image", image);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (response.ok) {
        alert("Medicine updated successfully!");
        navigate("/admin/medicines");
      } else {
        const result = await response.json();
        alert(result.message || "Update failed");
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
        <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><FaEdit size={22}/></div>
        <h1 className="text-2xl font-bold text-slate-800">Edit Medicine Details</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-slate-600 mb-2">Medicine Name</label>
          <input type="text" name="name" value={medicine.name} onChange={handleChange}
            className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">Category</label>
          <select name="category" value={medicine.category} onChange={handleChange}
            className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500" required>
            <option value="">Select Category</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">Price (₹)</label>
          <input type="number" name="price" value={medicine.price} onChange={handleChange}
            className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">Stock Level</label>
          <input type="number" name="stock" value={medicine.stock} onChange={handleChange}
            className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:border-blue-500" required />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">Expiry Date</label>
          <input type="date" name="expiryDate" 
            value={medicine.expiryDate ? medicine.expiryDate.slice(0, 10) : ""} 
            onChange={handleChange} className="w-full border border-slate-200 p-3 rounded-xl outline-none" />
        </div>

        <div className="md:col-span-2">
          <label className="flex gap-3 items-center cursor-pointer bg-slate-50 p-4 rounded-xl border border-slate-100">
            <input type="checkbox" name="prescriptionRequired" checked={medicine.prescriptionRequired} onChange={handleChange} className="w-5 h-5 accent-blue-600" />
            <span className="text-slate-700 font-medium">Prescription is strictly required for this medicine</span>
          </label>
        </div>

        <div className="md:col-span-2 space-y-4">
          <label className="block text-sm font-bold text-slate-600">Product Image</label>
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:bg-slate-50 transition-all group">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="edit-img" />
            <label htmlFor="edit-img" className="cursor-pointer flex flex-col items-center">
              {preview ? (
                <img src={preview} className="h-40 object-contain rounded-lg mb-2 shadow-sm" alt="Preview" />
              ) : (
                <FaImage size={40} className="text-slate-300 mb-2" />
              )}
              <span className="text-blue-600 font-bold text-sm">Change Product Photo</span>
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="md:col-span-2 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all disabled:bg-slate-300">
          <FaSave /> {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditMedicine;