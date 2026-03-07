import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditMedicine = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [medicine, setMedicine] = useState({
    name: "",
    price: "",
    stock: "",
    prescriptionRequired: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMedicine = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/medicines/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setMedicine(data);
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

    setMedicine({
      ...medicine,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/medicines/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(medicine),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Medicine updated successfully");
        navigate("/admin/medicines");
      } else {
        alert(data.message || "Failed to update medicine");
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

        <input
          type="text"
          name="name"
          value={medicine.name}
          onChange={handleChange}
          placeholder="Medicine Name"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          value={medicine.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="stock"
          value={medicine.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2 rounded"
        />

        <label className="flex gap-2">
          <input
            type="checkbox"
            name="prescriptionRequired"
            checked={medicine.prescriptionRequired}
            onChange={handleChange}
          />
          Prescription Required
        </label>

        <button
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Medicine"}
        </button>

      </form>
    </div>
  );
};

export default EditMedicine;