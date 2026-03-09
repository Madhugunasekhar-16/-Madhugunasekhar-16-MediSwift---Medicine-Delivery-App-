/* import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#f3e9e2] min-h-screen px-6 py-12">

     
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Order Medicines <span className="text-blue-500">Fast</span> &
            <br />
            Get Them Delivered <span className="text-blue-500">Safely</span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            MediSwift makes medicine delivery simple and reliable.
            Upload prescriptions, browse medicines, and receive
            them at your doorstep quickly.
          </p>

          
          <div className="flex gap-4 mt-6">

            <Link
              to="/medicines"
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition"
            >
              Browse Medicines
            </Link>

            <Link
              to="/login"
              className="border border-blue-500 text-blue-500 px-6 py-3 rounded-full hover:bg-blue-100 transition"
            >
              Login
            </Link>

          </div>

         
          <div className="flex gap-10 mt-10">

            <div>
              <h2 className="text-2xl font-bold text-blue-500">500+</h2>
              <p className="text-gray-600">Medicines</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-500">10k+</h2>
              <p className="text-gray-600">Customers</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-500">24/7</h2>
              <p className="text-gray-600">Support</p>
            </div>

          </div>
        </div>

    
        <div>
          <img
            src="https://images.unsplash.com/photo-1580281658629-1c6d0c4d7f5b"
            alt="Medicine delivery"
            className="rounded-xl shadow-lg"
          />
        </div>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-6xl mx-auto">

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

export default Home; */ 


import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ADMIN REDIRECT GUARD
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin-dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#fdfbf9] min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-8 py-20">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1]">
            Healthcare <span className="text-blue-600">Simplified</span>,
            <br />
            Medicines <span className="text-blue-600">Streamlined</span>
          </h1>

          <p className="text-gray-500 mt-8 text-xl leading-relaxed max-w-lg">
            Connect with verified pharmacies at your convenience. Browse medicines, 
            upload prescriptions, and track your orders — all in one secure platform.
          </p>

          <div className="flex gap-4 mt-10">
            <Link to="/medicines" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition transform hover:-translate-y-1">
              Find Medicines
            </Link>

            {user ? (
              <Link to="/my-orders" className="border border-blue-600 text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-blue-50 transition">
                Track Orders
              </Link>
            ) : (
              <Link to="/login" className="border border-gray-200 bg-white text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition">
                Learn More
              </Link>
            )}
          </div>

          {/* PHARMACY STATS */}
          <div className="flex gap-12 mt-16 border-t border-gray-100 pt-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">500+</h2>
              <p className="text-blue-600 font-medium">Medicines</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">10k+</h2>
              <p className="text-blue-600 font-medium">Customers</p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">50+</h2>
              <p className="text-blue-600 font-medium">Pharmacies</p>
            </div>
          </div>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div className="relative">
          <div className="absolute -inset-4 bg-blue-100 rounded-3xl rotate-3 -z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=800&q=80"
            alt="Pharmacy management"
            className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;