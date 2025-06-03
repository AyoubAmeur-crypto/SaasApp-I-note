import React, { useState, useEffect } from 'react'
import { FaLock, FaArrowLeft, FaEye, FaEyeSlash, FaKey, FaShieldAlt, FaCheckCircle } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import logo from './assets/LOGO.png'
import axios from 'axios'

function ChangePassword() {
  const navigate = useNavigate()
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordVisible, setPasswordVisible] = useState({
    newPassword: false,
    confirmPassword: false
  })
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: ''
  })
  const [notification, setNotification] = useState({ show: false, message: '', isClosing: false })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false)

  // Track mouse for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check password strength
  useEffect(() => {
    if (passwords.newPassword) {
      // Simple password strength checker
      const strength = calculatePasswordStrength(passwords.newPassword);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength({ score: 0, feedback: '' });
    }
  }, [passwords.newPassword]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score === 0) feedback = 'Very weak';
    else if (score === 1) feedback = 'Weak';
    else if (score === 2) feedback = 'Fair';
    else if (score === 3) feedback = 'Good';
    else if (score === 4) feedback = 'Strong';
    else feedback = 'Very strong';

    return { score, feedback };
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChange = (e) => {


    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const {email} = useParams()

  // This is just the UI shell - you'll add your logic later
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const changePassword = await axios.post("http://localhost:3000/changePassword",{email:email,newPassword:passwords.newPassword})

         setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setNotification({ 
        show: true, 
        message: changePassword.data
      });
      setTimeout(() => setNotification(prev => ({ ...prev, isClosing: true })), 3700);
      setTimeout(() => setNotification({ show: false, message: '', isClosing: false }), 4000);
    }, 1500);

    setTimeout(()=>{

        navigate("/login")
    },3000)
        
    } catch (error) {

         setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setNotification({ 
        show: true, 
        message: error.response.data
      });
      setTimeout(() => setNotification(prev => ({ ...prev, isClosing: true })), 3700);
      setTimeout(() => setNotification({ show: false, message: '', isClosing: false }), 4000);
    }, 1500);
        
    }
   
    
    
  };

  // Password requirements check
  const passwordRequirements = [
    { text: 'At least 8 characters', met: passwords.newPassword.length >= 8 },
    { text: 'At least one uppercase letter', met: /[A-Z]/.test(passwords.newPassword) },
    { text: 'At least one number', met: /[0-9]/.test(passwords.newPassword) },
    { text: 'At least one special character', met: /[^A-Za-z0-9]/.test(passwords.newPassword) },
    { text: 'Passwords match', met: passwords.newPassword && passwords.newPassword === passwords.confirmPassword }
  ];

  const allRequirementsMet = passwordRequirements.every(req => req.met);

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
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white hover:text-primary-yello transition-colors flex items-center gap-2 z-10"
      >
        <FaArrowLeft /> Back
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
              <FaShieldAlt /> Create New Password
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
                <h2 className="text-white text-xl font-semibold mb-2">Set Your New Password</h2>
                <p className="text-gray-300 text-sm">
                  Create a strong password that you'll remember but others can't guess.
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div className="space-y-1">
                  <label htmlFor="newPassword" className="text-gray-300 text-xs font-medium pl-1 block">New Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-hover:text-primary-yello transition-colors duration-200">
                      <FaLock className="text-sm" />
                    </div>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={passwordVisible.newPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      className="py-2.5 pl-10 pr-10 bg-primary-main/80 text-white text-sm rounded-lg w-full border-l-4 border-primary-yello/80 focus:outline-none focus:ring-2 focus:ring-primary-yello/50 focus:border-primary-yello transition-all duration-300"
                      value={passwords.newPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary-yello transition-colors duration-200"
                      onClick={() => togglePasswordVisibility('newPassword')}
                    >
                      {passwordVisible.newPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {passwords.newPassword && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-400">Password Strength</span>
                        <span className={`text-xs font-medium ${
                          passwordStrength.score < 2 ? 'text-red-400' : 
                          passwordStrength.score < 4 ? 'text-yellow-400' : 
                          'text-green-400'
                        }`}>
                          {passwordStrength.feedback}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            passwordStrength.score < 2 ? 'bg-red-500' : 
                            passwordStrength.score < 4 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Confirm Password */}
                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-gray-300 text-xs font-medium pl-1 block">Confirm Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-hover:text-primary-yello transition-colors duration-200">
                      <FaLock className="text-sm" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={passwordVisible.confirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      className="py-2.5 pl-10 pr-10 bg-primary-main/80 text-white text-sm rounded-lg w-full border-l-4 border-primary-yello/80 focus:outline-none focus:ring-2 focus:ring-primary-yello/50 focus:border-primary-yello transition-all duration-300"
                      value={passwords.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary-yello transition-colors duration-200"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                    >
                      {passwordVisible.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                  </div>
                  
                  {/* Password Match Indicator */}
                  {passwords.confirmPassword && (
                    <div className="mt-1 flex items-center gap-1.5">
                      {passwords.newPassword === passwords.confirmPassword ? (
                        <>
                          <FaCheckCircle className="text-green-500 text-xs" />
                          <span className="text-xs text-green-400">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-red-400">Passwords don't match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={!allRequirementsMet || isLoading}
                  className="w-full bg-primary-yello text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-yello/20 relative overflow-hidden group disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating Password...
                      </>
                    ) : (
                      <>
                        <FaKey className="mr-2" /> Update Password
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </form>
            </div>
            
            {/* Illustration Side */}
            <div className="hidden md:block w-1/2 bg-gradient-to-br from-gray-900/60 to-transparent relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary-yello/10 animate-spin-slow opacity-30"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-primary-yello/20 animate-spin-slow-reverse opacity-50"></div>
              
              {/* Password Security Illustration */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-float-slow" style={{ animationDuration: '6s' }}>
                  {/* Background Circle */}
                  <circle cx="150" cy="150" r="100" fill="#1E293B" opacity="0.7" />
                  <circle cx="150" cy="150" r="85" stroke="#FFD700" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" className="animate-rotate-slow" />
                  
                  {/* Shield Base */}
                  <g className="animate-pulse" style={{ animationDuration: '4s' }}>
                    <path d="M150 70 L90 110 V190 L150 230 L210 190 V110 Z" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                    <path d="M150 85 L105 115 V185 L150 215 L195 185 V115 Z" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                  </g>
                  
                  {/* Lock */}
                  <g transform="translate(150, 150)" className="animate-float" style={{ animationDuration: '5s' }}>
                    <rect x="-25" y="-5" width="50" height="40" rx="6" fill="#334155" />
                    <path d="M-15 -5 V-25 C-15 -40, 15 -40, 15 -25 V-5" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="0" cy="15" r="10" fill="#1E293B" stroke="#FFD700" strokeWidth="1" />
                    <rect x="-2" y="8" width="4" height="14" rx="2" fill="#FFD700" />
                  </g>
                  
                  {/* Rotating Keys */}
                  <g className="animate-spin-slow" style={{ transformOrigin: '150px 150px' }}>
                    <g transform="translate(220, 150)">
                      <path d="M0 0 L20 0 L25 -5 L20 -10 L25 -15 L15 -20 L20 -25 L0 -25 Z" fill="#334155" />
                      <circle cx="0" cy="-12.5" r="5" fill="#1E293B" />
                      <circle cx="0" cy="-12.5" r="2" fill="#FFD700" opacity="0.8" />
                    </g>
                  </g>
                  
                  <g className="animate-spin-slow-reverse" style={{ transformOrigin: '150px 150px' }}>
                    <g transform="translate(80, 150)">
                      <path d="M0 0 L-20 0 L-25 -5 L-20 -10 L-25 -15 L-15 -20 L-20 -25 L0 -25 Z" fill="#334155" />
                      <circle cx="0" cy="-12.5" r="5" fill="#1E293B" />
                      <circle cx="0" cy="-12.5" r="2" fill="#FFD700" opacity="0.8" />
                    </g>
                  </g>
                  
                  {/* Password Requirements Visualization */}
                  <g transform="translate(150, 245)">
                    <rect x="-50" y="-15" width="100" height="30" rx="4" fill="#0F172A" opacity="0.8" />
                    <text x="0" y="0" fontFamily="monospace" fontSize="10" fill="#FFD700" textAnchor="middle" opacity="0.8">**********</text>
                    <g transform="translate(-40, 0)">
                      <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#334155" />
                      <path d="M-2 0 L0 2 L2 -2" stroke="#FFD700" strokeWidth="1" />
                    </g>
                    <g transform="translate(-20, 0)">
                      <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#334155" />
                      <text x="0" y="2" fontSize="8" fill="#FFD700" textAnchor="middle">A</text>
                    </g>
                    <g transform="translate(0, 0)">
                      <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#334155" />
                      <text x="0" y="2" fontSize="8" fill="#FFD700" textAnchor="middle">1</text>
                    </g>
                    <g transform="translate(20, 0)">
                      <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#334155" />
                      <text x="0" y="2" fontSize="8" fill="#FFD700" textAnchor="middle">#</text>
                    </g>
                    <g transform="translate(40, 0)">
                      <rect x="-5" y="-5" width="10" height="10" rx="2" fill="#334155" />
                      <text x="0" y="2" fontSize="8" fill="#FFD700" textAnchor="middle">8+</text>
                    </g>
                  </g>
                  
                  {/* Secure Connection Lines */}
                  {[...Array(5)].map((_, i) => (
                    <path 
                      key={i}
                      d={`M${150 + 50 * Math.cos(i * Math.PI / 2.5)} ${150 + 50 * Math.sin(i * Math.PI / 2.5)} L${150 + 70 * Math.cos(i * Math.PI / 2.5)} ${150 + 70 * Math.sin(i * Math.PI / 2.5)}`} 
                      stroke="#FFD700" 
                      strokeWidth="1" 
                      strokeDasharray="3 3"
                      opacity="0.4"
                    />
                  ))}
                  
                  {/* Decorative Elements */}
                  <g transform="translate(150, 50)">
                    <path d="M-20 0 L20 0 M-15 5 L15 5 M-10 10 L10 10" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
                  </g>
                  
                  {/* Binary Code Background */}
                  {[...Array(20)].map((_, i) => (
                    <text 
                      key={i}
                      x={70 + Math.random() * 160} 
                      y={70 + Math.random() * 160} 
                      fill="#334155" 
                      fontSize="8"
                      opacity={0.3 + Math.random() * 0.2}
                    >
                      {Math.random() > 0.5 ? '1' : '0'}
                    </text>
                  ))}
                  
                  {/* Title */}
                  <text x="150" y="70" fontFamily="Arial" fontSize="10" fill="#FFD700" textAnchor="middle" opacity="0.8">SECURE PASSWORD</text>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Requirements Section */}
          <div className="bg-gray-900/40 p-4 border-t border-gray-700/30">
            <h3 className="text-white text-sm font-medium mb-3 flex items-center gap-2">
              <FaShieldAlt className="text-primary-yello" /> Password Requirements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met ? 'bg-green-500/20' : 'bg-gray-700/50'}`}>
                    {req.met && <FaCheckCircle className="text-green-500 text-xs" />}
                  </div>
                  <span className={`text-xs ${req.met ? 'text-green-400' : 'text-gray-400'}`}>{req.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Secure password update • <span className="text-primary-yello/80 hover:text-primary-yello cursor-pointer">Privacy Policy</span> • <span className="text-primary-yello/80 hover:text-primary-yello cursor-pointer">Need help?</span>
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

export default ChangePassword