import React, { useState, useRef, useEffect } from 'react'
import { FaLock, FaArrowLeft, FaKey, FaCheck, FaEnvelope, FaShieldAlt } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import logo from './assets/LOGO.png'
import axios from 'axios'

function OTPCode() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(300) // 5 minutes in seconds
  const inputRefs = useRef([])
  const [notification, setNotification] = useState({ 
    show: false, 
    message: '', 
    isClosing: false 
  })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const {email}= useParams()
  
  // Set up countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval)
          return 0
        }
        return prevTimer - 1
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Track mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  // Handle input changes for OTP fields
  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.charAt(0)
    }
    
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    
    // Auto-focus next input field
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }
  
  // Handle key press - move back on backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }
  
  // Handle paste event for OTP
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').trim()
    
    // If pasted data is 6 digits, distribute into inputs
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('')
      setOtp(digits)
      inputRefs.current[5].focus()
    }
  }
  const verifyOtp = async (e)=>{


    e.preventDefault()


    try {


      const verfiedOtp = await axios.post("http://localhost:3000/verifyOtp",{otp:otp,email:email})
setNotification(prev=>({...prev,show:true,message:verfiedOtp.data}))

setTimeout(()=>{setNotification(prev=>({...prev,isClosing:true}))},3700)
setTimeout(()=>{setNotification({show:false,message:'',isClosing:false})},4000)

setTimeout(()=>{

  navigate(`/changePassword/${email}`)
},1000)

      
    } catch (error) {


      setNotification(prev=>({...prev,show:true,message:error.response.data}))

setTimeout(()=>{setNotification(prev=>({...prev,isClosing:true}))},3700)
setTimeout(()=>{setNotification({show:false,message:'',isClosing:false})},4000)
      
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
        onClick={() => navigate('/resetPassword')}
        className="absolute top-6 left-6 text-white hover:text-primary-yello transition-colors flex items-center gap-2 z-10"
      >
        <FaArrowLeft /> Back to Reset Password
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
              <FaShieldAlt /> Verification Code
            </h1>
          </div>
          
          {/* Card Content */}
          <div className="p-8">
            {/* Premium Illustration */}
            <div className="flex justify-center mb-8">
              <svg width="300" height="220" viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float-slow" style={{ animationDuration: '10s' }}>
                {/* Base Circle */}
                <circle cx="150" cy="110" r="90" fill="#1E293B" opacity="0.6" />
                <circle cx="150" cy="110" r="75" stroke="#FFD700" strokeWidth="1" strokeDasharray="5 3" opacity="0.4" className="animate-spin-slow" />
                
                {/* Orbiting Elements */}
                <g className="animate-spin-slow" style={{ transformOrigin: '150px 110px' }}>
                  <circle cx="150" cy="20" r="15" fill="#334155" opacity="0.8" />
                  <circle cx="150" cy="20" r="7" fill="#1E293B" />
                  <circle cx="150" cy="20" r="3" fill="#FFD700" opacity="0.8" />
                </g>
                
                <g className="animate-spin-slow-reverse" style={{ transformOrigin: '150px 110px' }}>
                  <circle cx="240" cy="110" r="12" fill="#334155" opacity="0.8" />
                  <circle cx="240" cy="110" r="6" fill="#1E293B" />
                  <circle cx="240" cy="110" r="2" fill="#FFD700" opacity="0.8" />
                </g>
                
                {/* Mobile Device */}
                <g transform="translate(125, 65)" className="animate-float" style={{ animationDuration: '5s' }}>
                  <rect x="0" y="0" width="50" height="90" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                  <rect x="2" y="2" width="46" height="86" rx="6" fill="#1E293B" />
                  <rect x="6" y="6" width="38" height="60" rx="2" fill="#0F172A" />
                  
                  {/* OTP on Screen */}
                  <rect x="8" y="15" width="34" height="20" rx="2" fill="#1E293B" />
                  <rect x="10" y="20" width="30" height="10" rx="1" fill="#0F172A" />
                  
                  {/* OTP Digits */}
                  {[...Array(6)].map((_, i) => (
                    <g key={i} transform={`translate(${10 + i * 5}, 20)`}>
                      <rect x="0" y="0" width="4" height="10" rx="1" fill={i < 3 ? "#FFD700" : "#334155"} opacity={i < 3 ? "0.8" : "0.4"} />
                    </g>
                  ))}
                  
                  {/* Phone Navigation Button */}
                  <circle cx="25" cy="80" r="7" fill="#334155" />
                  <circle cx="25" cy="80" r="5" fill="#1E293B" />
                  <circle cx="25" cy="80" r="2" fill="#FFD700" opacity="0.3" />
                </g>
                
                {/* Email/Message with OTP */}
                <g transform="translate(60, 100)" className="animate-float-reverse" style={{ animationDuration: '8s' }}>
                  {/* Message Bubble */}
                  <path d="M0 10 C0 4, 4 0, 10 0 L60 0 C66 0, 70 4, 70 10 L70 40 C70 46, 66 50, 60 50 L15 50 L0 65 L0 10 Z" fill="#334155" />
                  <rect x="10" y="10" width="50" height="30" rx="2" fill="#1E293B" />
                  
                  {/* OTP Digits in Message */}
                  {[...Array(6)].map((_, i) => (
                    <rect key={i} x={13 + i * 8} y="16" width="5" height="12" rx="1" fill="#FFD700" opacity={0.6 + i * 0.05} />
                  ))}
                  
                  {/* Sending Animation */}
                  {[...Array(3)].map((_, i) => (
                    <circle 
                      key={i} 
                      cx={90 + i * 15} 
                      cy="25" 
                      r="3" 
                      fill="#FFD700" 
                      opacity={0.8 - i * 0.2}
                      className="animate-pulse" 
                      style={{ animationDelay: `${i * 0.3}s` }} 
                    />
                  ))}
                </g>
                
                {/* Lock and Shield */}
                <g transform="translate(210, 110)">
                  {/* Shield */}
                  <path d="M0 0 L-20 15 L-20 45 L0 60 L20 45 L20 15 Z" fill="#334155" />
                  <path d="M0 5 L-15 17 L-15 40 L0 52 L15 40 L15 17 Z" fill="#1E293B" />
                  
                  {/* Lock */}
                  <rect x="-10" y="20" width="20" height="15" rx="2" fill="#0F172A" />
                  <rect x="-6" y="22" width="12" height="11" rx="1" fill="#1E293B" />
                  <circle cx="0" cy="27" r="3" fill="#FFD700" opacity="0.9" />
                  <rect x="-1" y="26" width="2" height="5" rx="1" fill="#0F172A" />
                  <path d="M-5 20 V10 C-5 5, 5 5, 5 10 V20" stroke="#FFD700" strokeWidth="2" strokeDasharray="2 1" opacity="0.6" />
                </g>
                
                {/* User Silhouette */}
                <g transform="translate(75, 55)" className="animate-float-slow" style={{ animationDuration: '9s' }}>
                  <circle cx="0" cy="0" r="18" fill="#334155" stroke="#0F172A" strokeWidth="1" opacity="0.7" />
                  <circle cx="0" cy="-6" r="7" fill="#1E293B" />
                  <path d="M-10 8 C-10 0, 10 0, 10 8" fill="#1E293B" />
                  <circle cx="0" cy="0" r="17" fill="none" stroke="#FFD700" strokeWidth="1" strokeDasharray="3 2" opacity="0.4" />
                </g>
                
                {/* Connection Lines */}
                <path d="M93 55 L125 80" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" opacity="0.6" />
                <path d="M130 155 L100 125" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" opacity="0.6" />
                <path d="M175 125 L210 110" stroke="#FFD700" strokeWidth="1" strokeDasharray="2 1" opacity="0.6" />
                
                {/* Server/Database */}
                <g transform="translate(150, 170)">
                  <rect x="-15" y="-15" width="30" height="30" rx="3" fill="#334155" />
                  <rect x="-12" y="-12" width="24" height="24" rx="2" fill="#1E293B" />
                  <rect x="-8" y="-8" width="16" height="3" rx="1" fill="#FFD700" opacity="0.5" />
                  <rect x="-8" y="-3" width="16" height="3" rx="1" fill="#FFD700" opacity="0.3" />
                  <rect x="-8" y="2" width="16" height="3" rx="1" fill="#FFD700" opacity="0.2" />
                  <rect x="-8" y="7" width="16" height="3" rx="1" fill="#FFD700" opacity="0.1" />
                </g>
                
                {/* Data Flow */}
                <path d="M150 155 L150 170" stroke="#FFD700" strokeWidth="2" strokeDasharray="2 1" opacity="0.6" />
                <circle cx="150" cy="160" r="2" fill="#FFD700" opacity="0.8" className="animate-pulse" />
                
                {/* Decorative Title */}
                <text x="150" y="30" fontFamily="Arial" fontSize="10" fill="#FFD700" textAnchor="middle" opacity="0.7">SECURE VERIFICATION</text>
              </svg>
            </div>
            
            {/* Message */}
            <div className="mb-6 text-center">
              <h2 className="text-white text-xl font-semibold mb-2">Verify Your Identity</h2>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                Enter the 6-digit verification code we sent to your email. This helps us ensure it's really you requesting the password reset.
              </p>
            </div>
            
            {/* OTP Input */}
            <div className="space-y-6">
              <div className="flex justify-center gap-2 sm:gap-3">
                {otp.map((digit, index) => (
                  <div key={index} className="relative group">
                    <input
                      ref={el => inputRefs.current[index] = el}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      className="w-11 h-14 sm:w-12 text-center bg-primary-main/80 text-white text-xl font-bold rounded-md border-b-2 border-primary-yello/80 focus:outline-none focus:ring-2 focus:ring-primary-yello/50 focus:border-primary-yello transition-all duration-300"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                    />
                    <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                  </div>
                ))}
              </div>
              
              {/* Timer */}
              <div className="text-center space-y-1">
                <div className="bg-primary-main/40 rounded-full h-1.5 w-48 mx-auto overflow-hidden">
                  <div 
                    className="bg-primary-yello h-full rounded-full" 
                    style={{ 
                      width: `${(timer / 300) * 100}%`,
                      transition: 'width 1s linear'
                    }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm">
                  Time remaining: <span className="text-primary-yello font-medium">{formatTime(timer)}</span>
                </p>
              </div>
              
              {/* Resend Button */}
              <div className="text-center">
                <button 
                  type="button"
                  className={`text-sm flex items-center justify-center mx-auto gap-1 px-3 py-1 rounded-full border transition-all duration-300 ${
                    timer > 0 
                      ? 'text-gray-400 border-gray-700/50 cursor-not-allowed' 
                      : 'text-primary-yello border-primary-yello/50 hover:bg-primary-yello/10'
                  }`}
                  disabled={timer > 0}
                >
                  <FaEnvelope className="text-xs" />
                  {timer > 0 ? 'Resend code after timer expires' : 'Resend verification code'}
                </button>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-8">
              <button 
                type="button"
                disabled={otp.some(digit => digit === '')}
                onClick={verifyOtp}
                className="w-full bg-primary-yello text-gray-900 font-bold py-3.5 px-6 rounded-lg hover:bg-yellow-500 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-yello/20 relative overflow-hidden group disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <FaKey className="mr-2" /> Verify & Continue
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
            
            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-xs px-6">
                Didn't receive the code? Check your spam folder or verify that you entered the correct email address.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Secure verification • <span className="text-primary-yello/80 hover:text-primary-yello cursor-pointer">Privacy Policy</span> • <span className="text-primary-yello/80 hover:text-primary-yello cursor-pointer">Need help?</span>
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

export default OTPCode