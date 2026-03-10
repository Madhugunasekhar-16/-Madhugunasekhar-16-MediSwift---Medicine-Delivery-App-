import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaPen } from "react-icons/fa";

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
        setMedicines(data.medicines || data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMedicines();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setMedicines((prev) => prev.filter((med) => med._id !== id));
        alert("Deleted successfully");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-slate-800">Inventory Control</h1>
        <button onClick={() => navigate("/admin/add-medicine")}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-100">
          <FaPlus /> Add New
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-slate-500 text-sm">
              <th className="p-5 font-bold">Product</th>
              <th className="p-5 font-bold">Price</th>
              <th className="p-5 font-bold">Stock</th>
              <th className="p-5 font-bold">Status</th>
              <th className="p-5 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {medicines.map((med) => (
              <tr key={med._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-5">
                  <div className="flex items-center gap-4">
                    <img src={med.image || "https://placehold.co/50x50"} alt="" className="w-12 h-12 object-cover rounded-xl" />
                    <div>
                      <p className="font-bold text-slate-800">{med.name}</p>
                      <p className="text-xs text-slate-400">{med.category}</p>
                    </div>
                  </div>
                </td>
                <td className="p-5 font-bold text-slate-700">₹{med.price}</td>
                <td className="p-5">
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${med.stock > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                    {med.stock} units
                  </span>
                </td>
                <td className="p-5">
                  {med.prescriptionRequired ? <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded-md font-bold uppercase">Rx</span> : <span className="text-slate-300">-</span>}
                </td>
                <td className="p-5">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => navigate(`/admin/edit-medicine/${med._id}`)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><FaPen size={14}/></button>
                    <button onClick={() => handleDelete(med._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><FaTrash size={14}/></button>
                  </div>
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