import { useState, useEffect } from "react";

import MedicineCart from "../components/MedicineCard";

const Medicines = () => {

  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPrescription, setFilterPrescription] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/medicines`);
        const data = await response.json();

        if (!response.ok) {
          setError("Failed to load medicines");
          return;
        }

        setMedicines(data.medicines);

      } catch (error) {
        console.error("Error fetching medicines:", error);
        setError("Server error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((medicine) => {

    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesPrescription =
      filterPrescription === "all" ||
      (filterPrescription === "required" && medicine.prescriptionRequired) ||
      (filterPrescription === "not-required" && !medicine.prescriptionRequired);

    return matchesSearch && matchesPrescription;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Medicines
        </h1>

        {/* GLOBAL API ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-6">

          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/2"
          />

          <select
            value={filterPrescription}
            onChange={(e) => setFilterPrescription(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full md:w-1/4"
          >
            <option value="all">All</option>
            <option value="required">Prescription Required</option>
            <option value="not-required">No Prescription</option>
          </select>

        </div>

        {filteredMedicines.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg font-medium">
              No medicines found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredMedicines.map((medicine) => (
              <MedicineCart
                key={medicine._id}
                medicine={medicine}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};

export default Medicines;