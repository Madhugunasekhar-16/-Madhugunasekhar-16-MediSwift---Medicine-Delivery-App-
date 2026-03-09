import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminMedicines = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setMedicines(data.medicines);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this medicine?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setMedicines((prev) => prev.filter((med) => med._id !== id));
        alert("Medicine deleted successfully");
      } else {
        alert("Failed to delete medicine");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Medicines</h1>
        <button onClick={() => navigate("/admin/add-medicine")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add Medicine
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Image</th>  
              <th className="p-4">Name</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Prescription</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {medicines.map((med) => (
              <tr key={med._id} className="border-t">

                <td className="p-4">   
                  <img
                    src={med.image || "https://via.placeholder.com/50"}
                    alt={med.name}
                    className="w-12 h-12 object-cover rounded-lg"
                    onError={(e) => e.target.src = "https://via.placeholder.com/50"}
                  />
                </td>

                <td className="p-4">{med.name}</td>
                <td className="p-4">₹{med.price}</td>
                <td className="p-4">{med.stock}</td>
                <td className="p-4">{med.prescriptionRequired ? "Required" : "No"}</td>

                <td className="p-4 space-x-2">
                  <button onClick={() => navigate(`/admin/edit-medicine/${med._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(med._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMedicines;