import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#1e1514] text-white pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black tracking-tight no-underline">
              <span className="text-blue-500">Medi</span>Swift
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your health is our priority. Providing reliable healthcare solutions and 
              medicine delivery at your fingertips.
            </p>
          </div>

        
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 p-0 list-none">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 no-underline text-sm transition-colors">Home</Link></li>
              <li><Link to="/medicines" className="text-gray-400 hover:text-blue-400 no-underline text-sm transition-colors">Medicines</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 no-underline text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>

         
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3 p-0 list-none">
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 no-underline text-sm transition-colors">Contact Us</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-blue-400 no-underline text-sm transition-colors">Profile</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-blue-400 no-underline text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Connect With Us</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-blue-900/30 flex items-center justify-center rounded-full text-white hover:bg-blue-600 transition-all">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-900/30 flex items-center justify-center rounded-full text-white hover:bg-pink-600 transition-all">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-red-900/30 flex items-center justify-center rounded-full text-white hover:bg-red-600 transition-all">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

      
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 MediSwift. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-white no-underline">Terms of Service</Link>
            <Link to="/privacy" className="hover:text-white no-underline">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;