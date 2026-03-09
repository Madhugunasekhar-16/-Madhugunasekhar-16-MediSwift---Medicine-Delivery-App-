import { FaClock, FaSmile, FaStar, FaShieldAlt, FaTruck, FaUserMd } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO / ABOUT SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Image with Blue Decorative Element */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-100/50 rounded-[2.5rem] -rotate-2"></div>
                <img 
                    src="https://plus.unsplash.com/premium_photo-1682129892808-3476952259c7?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Medical Professional" 
                    className="relative rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3]"
                />
            </div>

            {/* Right: Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4">
                  About <span className="text-blue-600">MediSwift</span>
                </h1>
                <div className="h-1.5 w-20 bg-blue-600 rounded-full"></div>
              </div>

              <h2 className="text-2xl font-bold text-slate-700 leading-tight">
                Reimagining Healthcare Access
              </h2>

              <p className="text-slate-600 text-lg leading-relaxed">
                At MediSwift, we believe healthcare should be simple, accessible, and stress-free. 
                Our platform bridges the gap between patients and pharmacies, 
                empowering you to take control of your health journey.
              </p>

              {/* Blue Trust Counters */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <div className="text-center">
                  <div className="text-blue-600 text-3xl font-black mb-1">24/7</div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Support</p>
                </div>
                <div className="text-center border-x border-slate-100">
                  <div className="text-blue-600 text-3xl font-black mb-1">98%</div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Success</p>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 text-3xl font-black mb-1 flex justify-center items-center gap-1">
                    4.5<FaStar className="text-xl" />
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MISSION SECTION (Light Blue Background) */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-8 uppercase tracking-tight">Our Mission</h2>
          <div className="relative">
            <span className="absolute -top-8 -left-4 text-7xl text-blue-200 font-serif">“</span>
            <p className="text-xl md:text-2xl text-slate-700 italic font-medium leading-relaxed relative z-10">
              To transform healthcare delivery by creating intuitive digital solutions 
              that make quality medicines and healthcare services accessible to everyone, 
              anytime, anywhere.
            </p>
            <span className="absolute -bottom-12 -right-4 text-7xl text-blue-200 font-serif">”</span>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (Cards) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mx-auto mb-6">
              <FaShieldAlt />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Secure & Verified</h4>
            <p className="text-slate-500 text-sm leading-relaxed">We only partner with licensed pharmacies to ensure your medicine is 100% authentic.</p>
          </div>

          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mx-auto mb-6">
              <FaTruck />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Swift Delivery</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Our logistics network is optimized to get your essentials to your doorstep in record time.</p>
          </div>

          <div className="p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mx-auto mb-6">
              <FaUserMd />
            </div>
            <h4 className="text-xl font-bold text-slate-800 mb-4">Expert Support</h4>
            <p className="text-slate-500 text-sm leading-relaxed">Our dedicated team of professionals is available 24/7 to assist with your health needs.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;