import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="bg-[#fdfbf9] min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-8 py-20">
        
       
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