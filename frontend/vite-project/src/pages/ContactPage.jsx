import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message sent! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#EEF4FF] py-10 md:py-16 lg:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
       
        <div className="bg-white p-6 sm:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm flex flex-col justify-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">Get In Touch</h1>
            <p className="text-slate-500 mb-10 text-base md:text-lg">
              Have questions or feedback? We're here to help. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
           
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-center sm:text-left">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                <p className="text-slate-700 font-semibold break-all">support@mediswift.com</p>
              </div>
            </div>

         
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-center sm:text-left">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
                <FaPhoneAlt />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Call Us</p>
                <p className="text-slate-700 font-semibold">+1 (555) 123-4567</p>
              </div>
            </div>

          
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 text-center sm:text-left">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-xl shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visit Us</p>
                <p className="text-slate-700 font-semibold">12563 Health Avenue Road, Medical District</p>
              </div>
            </div>
          </div>
        </div>

        
        <div className="bg-white p-6 sm:p-10 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 text-center lg:text-left">Send Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-wider">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-5 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-wider">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-5 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-wider">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                className="w-full px-5 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-2 ml-1 tracking-wider">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Enter your message here..."
                className="w-full px-5 py-3 md:py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none text-sm"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 md:py-4 bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 transition-all active:scale-95 text-sm md:text-base"
            >
              Send Message <FaPaperPlane className="text-xs md:text-sm" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;