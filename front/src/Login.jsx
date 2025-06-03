import React, { useState, useEffect } from 'react'
import logo from './assets/LOGO.png'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaLock, FaSignInAlt, FaEnvelope, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleChange = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const UserData = await axios.post("http://localhost:3000/login", { email, pass })
      setError("")
      localStorage.setItem("userData", UserData.data)
      setSuccess("Login successful! Redirecting...")
      setTimeout(() => {
        navigate("/Notes")
      }, 1000)
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data)
      } else {
        setError("Something went wrong. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="bg-gradient-to-b from-primary-main to-[#0A101F] min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particle dots */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-primary-yello/30"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                opacity: Math.random() * 0.5,
                animation: `pulse ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Animated gradient blobs */}
        <div 
          className="absolute top-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-primary-yello/5 blur-[80px]"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-1/4 w-[200px] h-[200px] rounded-full bg-blue-500/5 blur-[60px]"
          style={{
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`
          }}
        ></div>
        
        {/* Subtle wave pattern */}
        <div className="absolute inset-0 opacity-10 animate-wave-slow">
          <svg width="100%" height="100%" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M0,0 C150,20 300,50 450,20 C600,-10 750,30 900,60 C1050,90 1200,60 1200,60 V120 H0 Z" 
              fill="#FFD700" 
              opacity="0.15"
            ></path>
          </svg>
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxQTFDMjMiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiMxRTI0MkIiIGZpbGwtb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6TTMwIDBoMzB2MzBIMzB6IiBmaWxsPSIjMUUyNDJCIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        
        {/* Light beams */}
        <div 
          className="absolute h-[200%] w-[5px] bg-gradient-to-b from-transparent via-primary-yello/10 to-transparent rotate-[25deg] left-1/4 top-[-50%] animate-beam-sweep"
          style={{
            left: `${40 + mousePosition.x * 0.01}%`
          }}
        ></div>
        <div 
          className="absolute h-[200%] w-[2px] bg-gradient-to-b from-transparent via-primary-yello/5 to-transparent rotate-[-15deg] left-2/3 top-[-50%] animate-beam-sweep-delay"
          style={{
            left: `${70 + mousePosition.x * -0.01}%`
          }}
        ></div>
      </div>
      
      {/* Main Content Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center z-10 px-4 py-8">
        {/* Logo Section */}
        <div className="w-full flex justify-center mb-6">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 50 50" className="flex-shrink-0">
              <rect x="5" y="5" width="40" height="40" rx="6" fill="#1E293B" />
              <rect x="10" y="10" width="30" height="8" rx="2" fill="#FFD700" opacity="0.9" />
              <rect x="10" y="22" width="30" height="4" rx="1" fill="#475569" />
              <rect x="10" y="30" width="30" height="4" rx="1" fill="#475569" />
              <rect x="10" y="38" width="20" height="4" rx="1" fill="#475569" />
            </svg>
            <img src={logo} alt="NoteApp Logo" className="h-6" />
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-4xl bg-primary-second bg-opacity-50 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl shadow-black/20 overflow-hidden relative">
          {/* Glass sheen effect */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div 
              className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"
            ></div>
          </div>
          
          {/* Card Content */}
          <div className="flex flex-col lg:flex-row">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 p-6 lg:p-8 relative">
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
                  <path d="M0 0L80 0L0 80L0 0Z" fill="#FFD700" fillOpacity="0.1" />
                </svg>
              </div>
              
              <div className="relative">
                <h1 className="text-white text-2xl sm:text-3xl font-bold mb-2">
                  Welcome <span className="text-primary-yello">Back</span>
                </h1>
                <p className="text-gray-300 mb-6 text-sm">Access your notes and continue your productivity journey</p>
                
                {/* Alert Messages */}
                {error && (
                  <div className="bg-red-900/20 border-l-4 border-red-500 text-red-100 p-3 rounded-lg mb-4 animate-slideUp">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm">{error}</p>
                    </div>
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-900/20 border-l-4 border-green-500 text-green-100 p-3 rounded-lg mb-4 animate-slideUp">
                    <div className="flex items-center">
                      <svg className="w-6 h-6 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-sm">{success}</p>
                    </div>
                  </div>
                )}
                
                {/* Form */}
                <form onSubmit={handleChange} className="space-y-4">
                  {/* Email/Username Input */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-gray-300 text-xs font-medium pl-1 block">Email or Username</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-hover:text-primary-yello transition-colors duration-200">
                        <FaUser className="text-sm" />
                      </div>
                      <input
                        id="email"
                        type="text"
                        placeholder="Enter your email or username"
                        className="py-2.5 pl-10 bg-primary-main/80 text-white text-sm rounded-lg w-full border-l-4 border-primary-yello/80 focus:outline-none focus:ring-2 focus:ring-primary-yello/50 focus:border-primary-yello transition-all duration-300"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                    </div>
                  </div>
                  
                  {/* Password Input */}
                  <div className="space-y-1">
                    <label htmlFor="password" className="text-gray-300 text-xs font-medium pl-1 block">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-hover:text-primary-yello transition-colors duration-200">
                        <FaLock className="text-sm" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="py-2.5 pl-10 bg-primary-main/80 text-white text-sm rounded-lg w-full border-l-4 border-primary-yello/80 focus:outline-none focus:ring-2 focus:ring-primary-yello/50 focus:border-primary-yello transition-all duration-300"
                        onChange={(e) => setPass(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-primary-yello/70 hover:text-primary-yello transition-colors"
                        tabIndex="-1"
                      >
                        {showPassword ? <FaEyeSlash className="h-5 w-5" /> : <FaEye className="h-5 w-5" />}
                      </button>
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-yello text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-yello/20 relative overflow-hidden group mt-6"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Signing in...
                        </>
                      ) : (
                        <>
                          <FaSignInAlt className="mr-2" /> Sign In
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                  
                  {/* Reset Password Link */}
                  <div className="pt-2 text-center">
                    <p className="text-gray-300 text-sm">
                      Forgot your password?{" "}
                      <span
                        className="text-primary-yello font-semibold cursor-pointer hover:underline transition-colors"
                        onClick={() => navigate("/resetPassword")}
                      >
                        Reset password
                      </span>
                    </p>
                  </div>
                  
                  {/* Sign Up Link */}
                  <div className="pt-4 mt-2 border-t border-gray-700/30 text-center">
                    <p className="text-gray-300 text-sm pt-2">
                      Don't have an account?{" "}
                      <span
                        className="text-primary-yello font-semibold cursor-pointer hover:underline transition-colors"
                        onClick={() => navigate("/signup")}
                      >
                        Create Account
                      </span>
                    </p>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Illustration Section */}
            <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-gray-900/60 to-transparent relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary-yello/10 animate-spin-slow opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-primary-yello/20 animate-spin-slow-reverse opacity-50"></div>
              
              {/* Enhanced Login Illustration */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float" style={{ animationDuration: '6s' }}>
                  {/* Base Circle */}
                  <circle cx="200" cy="200" r="150" fill="#1E293B" opacity="0.7" />
                  <circle cx="200" cy="200" r="130" stroke="#FFD700" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" className="animate-rotate-slow" />
                  
                  {/* Main Book Stack */}
                  <g className="animate-float-slow" style={{ transformOrigin: 'center', animationDuration: '8s' }}>
                    {/* Open Book */}
                    <g transform="translate(120, 130)">
                      {/* Book Cover */}
                      <path d="M0 20 L0 170 L80 170 L80 20 C50 10, 30 10, 0 20" fill="#334155" stroke="#0F172A" strokeWidth="2" />
                      <path d="M80 20 L80 170 L160 170 L160 20 C130 30, 110 30, 80 20" fill="#334155" stroke="#0F172A" strokeWidth="2" />
                      
                      {/* Book Spine */}
                      <path d="M80 20 C50 10, 30 10, 0 20" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                      <path d="M80 20 C110 30, 130 30, 160 20" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                      
                      {/* Pages - Left Side */}
                      <path d="M5 25 L5 165 L75 165 L75 25 C50 15, 30 15, 5 25" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                      
                      {/* Text Lines - Left Page */}
                      <line x1="15" y1="45" x2="65" y2="45" stroke="#94A3B8" strokeWidth="1" />
                      <line x1="15" y1="60" x2="65" y2="60" stroke="#94A3B8" strokeWidth="1" />
                      <line x1="15" y1="75" x2="65" y2="75" stroke="#94A3B8" strokeWidth="1" />
                      <line x1="15" y1="90" x2="50" y2="90" stroke="#94A3B8" strokeWidth="1" />
                      <line x1="15" y1="105" x2="60" y2="105" stroke="#94A3B8" strokeWidth="1" />
                      <line x1="15" y1="120" x2="55" y2="120" stroke="#94A3B8" strokeWidth="1" />
                      <line x1="15" y1="135" x2="45" y2="135" stroke="#94A3B8" strokeWidth="1" />
                      <line x1="15" y1="150" x2="40" y2="150" stroke="#94A3B8" strokeWidth="1" />
                      
                      {/* Pages - Right Side */}
                      <path d="M85 25 L85 165 L155 165 L155 25 C130 35, 110 35, 85 25" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
                      
                      {/* Login Form on Right Page */}
                      <rect x="95" y="45" width="50" height="8" rx="2" fill="#FFD700" opacity="0.6" />
                      
                      <rect x="95" y="65" width="50" height="18" rx="3" fill="#1E293B" opacity="0.7" />
                      <rect x="98" y="70" width="6" height="8" rx="1" fill="#FFD700" opacity="0.5" />
                      <line x1="108" y1="74" x2="138" y2="74" stroke="#94A3B8" strokeWidth="1" />
                      
                      <rect x="95" y="90" width="50" height="18" rx="3" fill="#1E293B" opacity="0.7" />
                      <rect x="98" y="95" width="6" height="8" rx="1" fill="#FFD700" opacity="0.5" />
                      <line x1="108" y1="99" x2="138" y2="99" stroke="#94A3B8" strokeWidth="1" />
                      
                      <rect x="95" y="120" width="50" height="12" rx="3" fill="#FFD700" opacity="0.8" />
                      <text x="120" y="129" textAnchor="middle" fill="#0F172A" fontSize="8" fontWeight="bold">LOGIN</text>
                      
                      <line x1="95" y1="145" x2="145" y2="145" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="2 1" />
                    </g>
                    
                    {/* Book Stack */}
                    <g transform="translate(110, 175)">
                      {/* Bottom Book */}
                      <rect x="0" y="35" width="180" height="20" rx="2" fill="#334155" />
                      <rect x="-5" y="35" width="8" height="20" rx="1" fill="#1E293B" />
                      <rect x="-3" y="35" width="3" height="20" rx="1" fill="#FFD700" opacity="0.5" />
                      
                      {/* Middle Book */}
                      <rect x="10" y="15" width="160" height="20" rx="2" fill="#1E293B" />
                      <rect x="5" y="15" width="8" height="20" rx="1" fill="#334155" />
                      <rect x="7" y="15" width="3" height="20" rx="1" fill="#FFD700" opacity="0.6" />
                    </g>
                  </g>
                  
                  {/* Lock Icon */}
                  <g transform="translate(280, 140)" className="animate-pulse" style={{ animationDuration: '3s' }}>
                    <circle cx="0" cy="0" r="30" fill="#0F172A" stroke="#FFD700" strokeWidth="2" />
                    <rect x="-15" y="-5" width="30" height="25" rx="4" fill="#334155" />
                    <rect x="-12" y="-2" width="24" height="19" rx="2" fill="#1E293B" />
                    <circle cx="0" cy="7" r="4" fill="#FFD700" opacity="0.7" />
                    <path d="M0 7 L0 12" stroke="#FFD700" strokeWidth="2" />
                    <path d="M-20 -10 C-20 -25, 20 -25, 20 -10" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 2" />
                  </g>
                  
                  {/* Key */}
                  <g transform="translate(330, 200) rotate(-30)" className="animate-float-reverse" style={{ animationDuration: '7s' }}>
                    <circle cx="0" cy="0" r="10" fill="#FFD700" opacity="0.6" />
                    <rect x="10" y="-3" width="25" height="6" rx="2" fill="#FFD700" opacity="0.6" />
                    <rect x="20" y="-6" width="4" height="12" rx="1" fill="#FFD700" opacity="0.6" />
                    <rect x="28" y="-6" width="4" height="12" rx="1" fill="#FFD700" opacity="0.6" />
                  </g>
                  
                  {/* Flying Data */}
                  {[...Array(6)].map((_, i) => (
                    <g key={i} className="animate-float" style={{ animationDuration: `${3 + i * 0.5}s`, animationDelay: `${i * 0.2}s` }}>
                      <circle 
                        cx={280 + Math.sin(i * 0.7) * 30} 
                        cy={220 + Math.cos(i * 0.7) * 30} 
                        r="4" 
                        fill="#FFD700" 
                        opacity="0.6" 
                      />
                    </g>
                  ))}
                  
                  {/* Connection Lines */}
                  <path d="M220 140 L250 140" stroke="#FFD700" strokeWidth="2" strokeDasharray="5 3" />
                  <path d="M220 180 L280 200" stroke="#FFD700" strokeWidth="2" strokeDasharray="5 3" />
                  
                  {/* Decorative Text */}
                  <text x="200" y="70" fontFamily="Arial" fontSize="14" fill="#FFD700" textAnchor="middle" opacity="0.8">WELCOME BACK</text>
                  <text x="200" y="335" fontFamily="Arial" fontSize="12" fill="#FFD700" textAnchor="middle" opacity="0.6">UNLOCK YOUR NOTES</text>
                  
                  {/* Pulse Circles */}
                  <circle cx="100" cy="150" r="20" fill="#FFD700" opacity="0.15" className="animate-pulse" style={{ animationDuration: '4s' }} />
                  <circle cx="80" cy="250" r="15" fill="#FFD700" opacity="0.15" className="animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
                  
                  {/* User Silhouette */}
                  <g transform="translate(100, 120)" className="animate-float-slow" style={{ animationDuration: '9s' }}>
                    <circle cx="0" cy="0" r="25" fill="#334155" stroke="#0F172A" strokeWidth="1" />
                    <circle cx="0" cy="-10" r="10" fill="#1E293B" />
                    <path d="M-15 15 C-15 0, 15 0, 15 15" fill="#1E293B" />
                    <circle cx="0" cy="0" r="24" fill="none" stroke="#FFD700" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Secure login • <span className="text-primary-yello/80 hover:text-primary-yello cursor-pointer">Privacy Policy</span> • <span className="text-primary-yello/80 hover:text-primary-yello cursor-pointer">Need help?</span>
          </p>
        </div>
      </div>
      
      {/* Enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes pulse-border {
          0%, 100% { border-color: rgba(255, 215, 0, 0.1); }
          50% { border-color: rgba(255, 215, 0, 0.3); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float 7s ease-in-out infinite reverse;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .animate-pulse-border {
          animation: pulse-border 2s infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 30s linear infinite;
        }
        
        .animate-spin-slow {
          animation: rotate-slow 15s linear infinite;
        }
        
        .animate-spin-slow-reverse {
          animation: rotate-slow 20s linear infinite reverse;
        }
        
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes wave-slow {
          0% { transform: translateY(10px); }
          100% { transform: translateY(-10px); }
        }
        
        .animate-wave-slow {
          animation: wave-slow 15s ease-in-out infinite alternate;
        }
        
        @keyframes glass-sheen {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(200%) skewX(-45deg); }
        }
        
        .animate-glass-sheen {
          animation: glass-sheen 8s ease-in-out infinite;
        }
        
        @keyframes beam-sweep {
          0% { transform: translateX(-100px) rotate(25deg); }
          100% { transform: translateX(100px) rotate(25deg); }
        }
        
        .animate-beam-sweep {
          animation: beam-sweep 8s ease-in-out infinite;
        }
        
        .animate-beam-sweep-delay {
          animation: beam-sweep 8s ease-in-out 4s infinite;
        }
      `}</style>
    </div>
  )
}

export default Login