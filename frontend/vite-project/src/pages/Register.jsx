import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful! Redirecting to login...");
      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Register error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-blue-50 flex items-center justify-center px-6 relative overflow-hidden font-sans">
      
     
      <div className="absolute top-20 right-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>

   
      <div className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        
        <div className="text-center mb-8">
          <div className="inline-block bg-blue-600 text-white p-3 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <span className="font-bold text-xl">MS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join MediSwift for authentic medicines</p>
        </div>

       
        {message && <div className="bg-green-100 text-green-700 text-sm text-center mb-4 py-2 rounded-xl">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 text-sm text-center mb-4 py-2 rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>

         
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
          </div>

          
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 disabled:bg-gray-400 disabled:scale-100 transition-all mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;