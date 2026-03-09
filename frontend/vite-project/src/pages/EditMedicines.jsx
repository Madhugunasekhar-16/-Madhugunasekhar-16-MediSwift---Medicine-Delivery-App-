import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [medicine, setMedicine] = useState({
    name: "", description: "", price: "",
    stock: "", prescriptionRequired: false, expiryDate: "",
  });

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/medicines/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setMedicine(data);
          setPreview(data.image || null); 
        } else {
          alert("Failed to fetch medicine");
        }
      } catch (error) {
        console.error("Fetch medicine error:", error);
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
    setImage(file);
    setPreview(URL.createObjectURL(file)); 
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
      data.append("prescriptionRequired", medicine.prescriptionRequired);
      data.append("expiryDate", medicine.expiryDate || "");
      if (image) data.append("image", image);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Medicine updated successfully");
        navigate("/admin/medicines");
      } else {
        alert(result.message || "Failed to update medicine");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Medicine</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" value={medicine.name}
          onChange={handleChange} placeholder="Medicine Name"
          className="w-full border p-2 rounded" required />

        <textarea name="description" value={medicine.description || ""}
          onChange={handleChange} placeholder="Description"
          className="w-full border p-2 rounded" rows={3} />

        <input type="number" name="price" value={medicine.price}
          onChange={handleChange} placeholder="Price"
          className="w-full border p-2 rounded" required />

        <input type="number" name="stock" value={medicine.stock}
          onChange={handleChange} placeholder="Stock"
          className="w-full border p-2 rounded" required />

        <input type="date" name="expiryDate"
          value={medicine.expiryDate ? medicine.expiryDate.slice(0, 10) : ""}
          onChange={handleChange} className="w-full border p-2 rounded" />

        <label className="flex gap-2 items-center cursor-pointer">
          <input type="checkbox" name="prescriptionRequired"
            checked={medicine.prescriptionRequired} onChange={handleChange} />
          Prescription Required
        </label>

       
        <div className="border-2 border-dashed rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500 mb-2">
            {preview ? "Change Image" : "Upload Image"}
          </p>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

       
        {preview && (
          <img src={preview} alt="preview"
            className="w-full h-48 object-cover rounded-lg border" />
        )}

        <button type="submit" disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}>
          {loading ? "Updating..." : "Update Medicine"}
        </button>
      </form>
    </div>
  );
};

export default EditMedicine;