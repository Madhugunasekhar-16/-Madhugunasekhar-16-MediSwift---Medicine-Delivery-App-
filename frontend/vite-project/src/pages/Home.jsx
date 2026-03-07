import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-6">

      <div className="max-w-4xl text-center">
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-700 ">
          MediSwift – Fast & Reliable Medicine Delivery
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Order medicines online and get them delivered to your doorstep safely and quickly.
        </p>

        <Link
          to="/medicines"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Browse Medicines
        </Link>

      </div>

     
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full">
        
        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="font-semibold text-lg mb-2">Verified Medicines</h3>
          <p className="text-gray-600 text-sm">
            All medicines are sourced from trusted pharmacies.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="font-semibold text-lg mb-2">Prescription Support</h3>
          <p className="text-gray-600 text-sm">
            Upload prescriptions easily for required medicines.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
          <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Quick and secure delivery to your doorstep.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Home;