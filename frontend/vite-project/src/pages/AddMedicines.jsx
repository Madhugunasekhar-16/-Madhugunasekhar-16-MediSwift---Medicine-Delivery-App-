import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMedicine = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "", description: "", price: "",
    stock: "", prescriptionRequired: false, expiryDate: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
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
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("prescriptionRequired", formData.prescriptionRequired);
      data.append("expiryDate", formData.expiryDate);
      if (image) data.append("image", image);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        alert("Medicine added successfully!");
        navigate("/admin/medicines");
      } else {
        alert(result.message || "Failed to add medicine");
      }
    } catch (error) {
      console.error("Add medicine error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Medicine</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Medicine Name"
          onChange={handleChange} className="w-full border p-2 rounded" required />

        <textarea name="description" placeholder="Description"
          onChange={handleChange} className="w-full border p-2 rounded" rows={3} />

        <input type="number" name="price" placeholder="Price"
          onChange={handleChange} className="w-full border p-2 rounded" required />

        <input type="number" name="stock" placeholder="Stock"
          onChange={handleChange} className="w-full border p-2 rounded" required />

        <input type="date" name="expiryDate"
          onChange={handleChange} className="w-full border p-2 rounded" required />

        <label className="flex gap-2 items-center cursor-pointer">
          <input type="checkbox" name="prescriptionRequired" onChange={handleChange} />
          Prescription Required
        </label>

        <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <p className="text-sm text-gray-400 mt-1">JPG, PNG up to 5MB</p>
        </div>

        {preview && (
          <img src={preview} alt="preview"
            className="w-full h-48 object-cover rounded-lg border" />
        )}

        <button type="submit" disabled={loading}
          className={`w-full py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}>
          {loading ? "Uploading..." : "Add Medicine"}
        </button>
      </form>
    </div>
  );
};

export default AddMedicine;