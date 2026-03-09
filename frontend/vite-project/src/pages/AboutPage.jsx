import { FaClock, FaSmile, FaStar, FaShieldAlt, FaTruck, FaUserMd } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="py-10 md:py-20 px-4 sm:px-6 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Grid: 1 column on mobile/tablet, 2 columns on desktops */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
            
            {/* Text Content: order-1 ensures it appears first on mobile */}
            <div className="space-y-6 md:space-y-8 order-1 text-center lg:text-left">
              <div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 mb-4">
                  About <span className="text-blue-600">MediSwift</span>
                </h1>
                <div className="h-1.5 w-16 md:w-20 bg-blue-600 rounded-full mx-auto lg:mx-0"></div>
              </div>

              <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                At MediSwift, we believe healthcare should be simple, accessible, and stress-free. 
                Our platform bridges the gap between patients and pharmacies, empowering you to 
                take control of your health journey with ease.
              </p>

              {/* Responsive Trust Counters: Stacks on mobile, 3-cols on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-blue-600 text-2xl md:text-3xl font-black">24/7</div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Support</p>
                </div>
                
                <div className="flex flex-col items-center lg:items-start border-y sm:border-y-0 sm:border-x border-slate-100 py-4 sm:py-0">
                  <div className="text-blue-600 text-2xl md:text-3xl font-black">98%</div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Success</p>
                </div>
                
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-blue-600 text-2xl md:text-3xl font-black flex items-center gap-1">
                    5<FaStar className="text-lg md:text-xl" />
                  </div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Rating</p>
                </div>
              </div>
            </div>

            {/* Image: order-2 ensures it follows the text on mobile */}
            <div className="relative order-2">
              <div className="absolute -inset-2 md:-inset-4 bg-blue-100/50 rounded-[1.5rem] md:rounded-[2.5rem] -rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80" 
                alt="Medical Supplies" 
                className="relative rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full object-cover aspect-video lg:aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 md:py-24 bg-blue-50 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">Our Vision</h2>
          <h3 className="text-2xl md:text-4xl font-extrabold text-slate-800 mb-8 uppercase">Our Mission</h3>
          <p className="text-lg md:text-2xl text-slate-700 italic font-medium leading-relaxed">
            "To transform healthcare delivery by creating intuitive digital solutions 
            accessible to everyone, anytime, anywhere."
          </p>
        </div>
      </section>

      {/* FEATURES SECTION (Optional extra for responsiveness) */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
            <FaShieldAlt className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="font-bold text-slate-800 mb-2">Secure Platform</h4>
            <p className="text-slate-500 text-sm">Your data and prescriptions are handled with end-to-end security.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
            <FaTruck className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="font-bold text-slate-800 mb-2">Fast Delivery</h4>
            <p className="text-slate-500 text-sm">Get your medicines delivered to your doorstep in record time.</p>
          </div>
          <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm text-center">
            <FaUserMd className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="font-bold text-slate-800 mb-2">Verified Pharmacies</h4>
            <p className="text-slate-500 text-sm">We only partner with certified and licensed pharmaceutical providers.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;