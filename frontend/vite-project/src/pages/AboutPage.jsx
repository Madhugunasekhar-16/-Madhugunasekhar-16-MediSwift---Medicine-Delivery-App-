import { FaClock, FaSmile, FaStar, FaShieldAlt, FaTruck, FaUserMd } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 md:py-20 px-6 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800">
              About <span className="text-blue-600">MediSwift</span>
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              We believe healthcare should be simple and accessible. MediSwift bridges the gap between patients and certified pharmacies.
            </p>
            <div className="flex justify-center lg:justify-start gap-8 border-t pt-8">
              <div><div className="text-blue-600 text-2xl font-bold">24/7</div><p className="text-xs text-gray-400 uppercase">Support</p></div>
              <div><div className="text-blue-600 text-2xl font-bold">98%</div><p className="text-xs text-gray-400 uppercase">Success</p></div>
              <div><div className="text-blue-600 text-2xl font-bold flex items-center">5 <FaStar className="ml-1 text-lg" /></div><p className="text-xs text-gray-400 uppercase">Rating</p></div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-blue-50 rounded-3xl -rotate-2"></div>
            <img 
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800" 
              alt="Medical" className="relative rounded-2xl shadow-xl w-full aspect-video object-cover" 
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;