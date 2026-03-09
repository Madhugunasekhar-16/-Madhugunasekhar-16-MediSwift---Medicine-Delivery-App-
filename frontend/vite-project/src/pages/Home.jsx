import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#f3e9e2] min-h-screen px-6 py-12">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Order Medicines <span className="text-orange-500">Fast</span> &
            <br />
            Get Them Delivered <span className="text-orange-500">Safely</span>
          </h1>

          <p className="text-gray-600 mt-6 text-lg">
            MediSwift makes medicine delivery simple and reliable.
            Upload prescriptions, browse medicines, and receive
            them at your doorstep quickly.
          </p>

          <div className="flex gap-4 mt-6">
            <Link
              to="/medicines"
              className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition"
            >
              Browse Medicines
            </Link>

            <Link
              to="/login"
              className="border border-orange-500 text-orange-500 px-6 py-3 rounded-full hover:bg-orange-100 transition"
            >
              Login
            </Link>
          </div>

          <div className="flex gap-10 mt-10">
            <div>
              <h2 className="text-2xl font-bold text-orange-500">500+</h2>
              <p className="text-gray-600">Medicines</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-orange-500">10k+</h2>
              <p className="text-gray-600">Customers</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-orange-500">24/7</h2>
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

export default Home;