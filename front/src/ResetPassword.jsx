import React, { useState, useEffect } from 'react'
import { FaLock, FaArrowLeft, FaEnvelope, FaKey, FaShieldAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import logo from './assets/LOGO.png'
import axios from 'axios'

function ResetPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [notification, setNotification] = useState({ show: false, message: '', isClosing: false })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const requestOtp = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const checkEmail = await axios.post("http://localhost:3000/verifyEmail", { email: email })

      if(checkEmail) {
        setNotification(prev => ({ ...prev, show: true, message: `Verification code sent to ${email}` }))
        setTimeout(() => { setNotification(prev => ({ ...prev, isClosing: true })) }, 3700)
        setTimeout(() => { setNotification({ show: false, message: '', isClosing: false }) }, 4000)
        setTimeout(() => { navigate(`/otpCode/${email}`) }, 1000)
      }
    } catch (error) {
      if(error.response && error.response.data) {
        setNotification(prev => ({ ...prev, show: true, message: error.response.data }))
        setTimeout(() => { setNotification(prev => ({ ...prev, isClosing: true })) }, 3700)
        setTimeout(() => { setNotification({ show: false, message: '', isClosing: false }) }, 4000)
      }
    } finally {
      setIsLoading(false)
    }
  }
 
  return (
    <div className="bg-gradient-to-b from-primary-main to-[#0A101F] min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4">
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

      {/* Back button */}
      <button 
        onClick={() => navigate('/login')}
        className="absolute top-6 left-6 text-white hover:text-primary-yello transition-colors flex items-center gap-2 z-10"
      >
        <FaArrowLeft /> Back to Login
      </button>
      
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
        <div className="w-full max-w-xl bg-primary-second bg-opacity-50 backdrop-blur-xl rounded-xl border border-white/5 shadow-2xl shadow-black/20 overflow-hidden relative">
          {/* Glass sheen effect */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div 
              className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"
            ></div>
          </div>
          
          {/* Card Header */}
          <div className="bg-gradient-to-r from-yellow-600/80 to-amber-500/80 p-4 shadow-md relative">
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden opacity-20">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjkuNzY2IDcuMzY2QTMwLjA5MyAzMC4wOTMgMCAwIDAgMTUgMi41YTMwLjA3MyAzMC4wNzMgMCAwIDAtMTIuODMgNC43OHYzMS43MTVjMCAuNTI3LjQwOC45ODcuOTQ0IDEuMDQ1YTMwLjE0NCAzMC4xNDQgMCAwIDEgMTEuOTc0LTIuNDhjNi4wODQgMCAxMS43MzMgMS44MzMgMTYuNDEgNC45NzFsLjA4NC4wNTcuMDgzLS4wNTdBMzAuMDUgMzAuMDUgMCAwIDEgNDUgMTAuNWMzLjQyOCAwIDYuNy42IDkuNzIzIDEuNjk0di0uMTI4QTMwLjA5NiAzMC4wOTYgMCAwIDAgNDUgNy41YTMwLjA3IDMwLjA3IDAgMCAwLTE1LjIzNCAzLjg2NnoiIGZpbGw9IiMwMDAiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbC1vcGFjaXR5PSIuMyIvPjwvc3ZnPg==')] opacity-5"></div>
            </div>
            <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <FaShieldAlt /> Reset Your Password
            </h1>
          </div>
          
          {/* Split Design Content */}
          <div className="flex flex-col md:flex-row">
            {/* Form Side */}
            <div className="w-full md:w-1/2 p-6 relative">
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
                  <path d="M0 0L80 0L0 80L0 0Z" fill="#FFD700" fillOpacity="0.1" />
                </svg>
              </div>
              
              <div className="mb-6">
                <h2 className="text-white text-xl font-semibold mb-2">Forgot your password?</h2>
                <p className="text-gray-300 text-sm">
                  Enter your email address and we'll send you a verification code to reset your password.
                </p>
              </div>
              
              <form onSubmit={requestOtp} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="email" className="text-gray-300 text-xs font-medium pl-1 block">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-hover:text-primary-yello transition-colors duration-200">
                      <FaEnvelope className="text-sm" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      className="py-2.5 pl-10 bg-primary-main/80 text-white text-sm rounded-lg w-full border-l-4 border-primary-yello/80 focus:outline-none focus:ring-2 focus:ring-primary-yello/50 focus:border-primary-yello transition-all duration-300"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary-yello text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-yello/20 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaKey className="mr-2" /> Send Verification Code
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
                
                <div className="pt-4 text-center">
                  <p className="text-gray-400 text-xs">
                    We'll email you a 6-digit verification code to confirm your identity.
                  </p>
                </div>
              </form>
            </div>
            
            {/* Illustration Side */}
            <div className="hidden md:block w-1/2 bg-gradient-to-br from-gray-900/60 to-transparent relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary-yello/10 animate-spin-slow opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-primary-yello/20 animate-spin-slow-reverse opacity-50"></div>
              
              {/* Enhanced Password Reset Illustration */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float-slow" style={{ animationDuration: '6s' }}>
                  {/* Background Circle */}
                  <circle cx="150" cy="150" r="100" fill="#1E293B" opacity="0.7" />
                  <circle cx="150" cy="150" r="85" stroke="#FFD700" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" className="animate-rotate-slow" />
                  
                  {/* Email with Reset Link */}
                  <g className="animate-float" style={{ transformOrigin: 'center', animationDuration: '8s' }}>
                    <rect x="90" y="130" width="120" height="80" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                    <path d="M90 140 L150 170 L210 140" stroke="#FFD700" strokeWidth="2" />
                    <rect x="100" y="150" width="100" height="50" rx="2" fill="#1E293B" opacity="0.8" />
                    
                    {/* Email Content */}
                    <rect x="110" y="160" width="80" height="5" rx="1" fill="#475569" />
                    <rect x="110" y="170" width="80" height="5" rx="1" fill="#475569" />
                    <rect x="110" y="180" width="50" height="5" rx="1" fill="#475569" />
                    
                    {/* Reset Button in Email */}
                    <rect x="120" y="190" width="60" height="10" rx="2" fill="#FFD700" opacity="0.7" />
                    <text x="150" y="197" fontFamily="Arial" fontSize="7" fill="#0F172A" textAnchor="middle" fontWeight="bold">RESET CODE</text>
                  </g>
                  
                  {/* Broken Lock */}
                  <g transform="translate(150, 100)" className="animate-float-reverse" style={{ animationDuration: '7s' }}>
                    <rect x="-20" y="0" width="40" height="35" rx="4" fill="#334155" />
                    <path d="M-15 0 V-15 C-15 -25, 15 -25, 15 -15 V 0" stroke="#475569" strokeWidth="3" />
                    <path d="M-15 0 V-15 C-15 -25, 15 -25, 15 -15 V 0" stroke="#FFD700" strokeWidth="3" strokeDasharray="5 5" opacity="0.6" />
                    <circle cx="0" cy="15" r="7" fill="#1E293B" />
                    <rect x="-2" y="10" width="4" height="10" rx="2" fill="#1E293B" />
                  </g>
                  
                  {/* New Lock with Shield */}
                  <g transform="translate(200, 200)" className="animate-pulse" style={{ animationDuration: '3s' }}>
                    <path d="M0 -25 L-20 -5 L-20 15 L0 35 L20 15 L20 -5 Z" fill="#334155" />
                    <path d="M0 -20 L-15 0 L-15 15 L0 30 L15 15 L15 0 Z" fill="#1E293B" />
                    <circle cx="0" cy="5" r="7" fill="#0F172A" />
                    <path d="M-5 5 L0 10 L5 0" stroke="#FFD700" strokeWidth="2" />
                  </g>
                  
                  {/* OTP Digits */}
                  <g transform="translate(100, 220)" className="animate-float" style={{ animationDuration: '5s' }}>
                    {[...Array(6)].map((_, i) => (
                      <g key={i} transform={`translate(${i * 15}, 0)`}>
                        <rect x="0" y="0" width="12" height="16" rx="2" fill="#0F172A" stroke="#FFD700" strokeWidth="1" opacity="0.8" />
                        <text x="6" y="12" fontFamily="Arial" fontSize="10" fill="#FFD700" textAnchor="middle" opacity="0.9">
                          {i + 1}
                        </text>
                      </g>
                    ))}
                  </g>
                  
                  {/* User */}
                  <g transform="translate(80, 80)" className="animate-float-slow" style={{ animationDuration: '9s' }}>
                    <circle cx="0" cy="0" r="15" fill="#334155" stroke="#0F172A" strokeWidth="1" />
                    <circle cx="0" cy="-5" r="6" fill="#1E293B" />
                    <path d="M-8 8 C-8 2, 8 2, 8 8" fill="#1E293B" />
                    <circle cx="0" cy="0" r="14" fill="none" stroke="#FFD700" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  </g>
                  
                  {/* Connection Lines */}
                  <path d="M95 80 L130 130" stroke="#FFD700" strokeWidth="1" strokeDasharray="5 3" />
                  <path d="M150 100 L150 130" stroke="#FFD700" strokeWidth="1" strokeDasharray="5 3" />
                  <path d="M170 170 L200 200" stroke="#FFD700" strokeWidth="1" strokeDasharray="5 3" />
                  <path d="M150 210 L120 220" stroke="#FFD700" strokeWidth="1" strokeDasharray="5 3" />
                  
                  {/* Decorative Particles */}
                  {[...Array(8)].map((_, i) => (
                    <circle 
                      key={i}
                      cx={100 + Math.sin(i * 0.7) * 80} 
                      cy={150 + Math.cos(i * 0.7) * 80} 
                      r="2" 
                      fill="#FFD700" 
                      opacity="0.6" 
                      className="animate-pulse"
                      style={{ animationDuration: `${2 + i * 0.3}s` }}
                    />
                  ))}
                  
                  {/* Title */}
                  <text x="150" y="70" fontFamily="Arial" fontSize="10" fill="#FFD700" textAnchor="middle" opacity="0.8">PASSWORD RECOVERY</text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Secure password reset • <span className="text-primary-yello/80 hover:text-primary-yello cursor-pointer">Privacy Policy</span> • <span className="text-primary-yello/80 hover:text-primary-yello cursor-pointer">Need help?</span>
          </p>
        </div>
      </div>
      
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed bottom-4 right-4 bg-primary-second px-4 py-3 rounded-lg shadow-lg border-l-4 border-primary-yello flex flex-col z-50 ${notification.isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-yello" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-white">{notification.message}</span>
          </div>
          <div className="w-full h-1 bg-gray-700 mt-2 rounded-full overflow-hidden">
            <div className="h-full bg-primary-yello animate-progress rounded-full"></div>
          </div>
        </div>
      )}
      
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
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-in forwards;
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
        
        .animate-progress {
          animation: progress 4s linear forwards;
        }
        
        @keyframes progress {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideDown {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
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

export default ResetPassword