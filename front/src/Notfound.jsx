import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from './assets/LOGO.png'

function Notfound() {
  const navigate = useNavigate()
  
  return (
    <div className="bg-gradient-to-b from-primary-main to-[#0A101F] min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Particle dots */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
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
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxQTFDMjMiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiMxRTI0MkIiIGZpbGwtb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6TTMwIDBoMzB2MzBIMzB6IiBmaWxsPSIjMUUyNDJCIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
      </div>
      
      {/* Main content */}
      <div className="max-w-[800px] w-full flex flex-col items-center gap-6 z-10">
        {/* Logo */}
        <div className="mb-2">
          <img src={logo} alt="NoteApp Logo" className="h-8" />
        </div>
        
        {/* 404 SVG Illustration */}
        <div className="w-full max-w-[600px] relative animate-float-slow">
          <svg viewBox="0 0 800 400" className="w-full">
            {/* Background elements */}
            <circle cx="400" cy="200" r="150" fill="#1E293B" opacity="0.7" />
            <circle cx="400" cy="200" r="130" stroke="#334155" strokeWidth="2" strokeDasharray="10 5" opacity="0.4" className="animate-spin-slow" />
            
            {/* 404 Text */}
            <text x="400" y="220" fontFamily="Arial" fontSize="100" fontWeight="bold" fill="#FFD700" textAnchor="middle" opacity="0.8">404</text>
            
            {/* Broken note illustration */}
            <g transform="translate(280, 120)">
              {/* Main note */}
              <g className="animate-float-slow" style={{ transformOrigin: 'center', animationDuration: '6s' }}>
                <path d="M120 30 L230 30 L230 180 L120 180 L120 30" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <path d="M120 30 L140 10 L250 10 L230 30" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                <path d="M230 30 L250 10 L250 160 L230 180" fill="#1E293B" stroke="#334155" strokeWidth="2" />
                
                {/* Torn effect */}
                <path d="M120 120 L130 125 L120 130 L130 135 L120 140 L130 145 L120 150 L130 155 L120 160 L130 165 L120 170 L130 175 L120 180" stroke="#334155" strokeWidth="2" fill="none" />
                
                {/* Note lines */}
                <rect x="140" y="50" width="70" height="8" rx="4" fill="#FFD700" opacity="0.7" />
                <rect x="140" y="80" width="60" height="4" rx="2" fill="#475569" />
                <rect x="140" y="95" width="70" height="4" rx="2" fill="#475569" />
                <rect x="140" y="110" width="50" height="4" rx="2" fill="#475569" />
              </g>
              
              {/* Torn piece floating */}
              <g className="animate-float-reverse" style={{ transformOrigin: 'center', animationDuration: '5s' }}>
                <path d="M60 120 L120 120 L120 180 L100 190 L60 180 Z" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                <rect x="80" y="140" width="25" height="4" rx="2" fill="#475569" />
                <rect x="75" y="155" width="30" height="4" rx="2" fill="#475569" />
              </g>
              
              {/* Search magnifying glass */}
              <g className="animate-float" style={{ transformOrigin: '400px 200px', animationDuration: '7s' }}>
                <circle cx="40" cy="70" r="30" fill="none" stroke="#FFD700" strokeWidth="6" opacity="0.6" />
                <line x1="65" y1="95" x2="85" y2="115" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" opacity="0.6" />
                <line x1="40" y1="60" x2="40" y2="80" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
                <line x1="30" y1="70" x2="50" y2="70" stroke="#FFD700" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
              </g>
            </g>
            
            {/* Particles */}
            {[...Array(10)].map((_, i) => (
              <circle 
                key={i}
                cx={300 + Math.random() * 200} 
                cy={100 + Math.random() * 200} 
                r={Math.random() * 3 + 1}
                fill="#FFD700"
                opacity={Math.random() * 0.5 + 0.2}
                className="animate-pulse"
              />
            ))}
            
            {/* Question mark */}
            <g transform="translate(500, 170)">
              <circle cx="0" cy="0" r="25" fill="#334155" />
              <text x="0" y="8" fontFamily="Arial" fontSize="36" fontWeight="bold" fill="#FFD700" textAnchor="middle">?</text>
            </g>
          </svg>
        </div>
        
        {/* Text content */}
        <div className="text-center">
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            We've searched everywhere, but we couldn't find the page you're looking for. It might have been moved, deleted, or never existed.
          </p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/')}
            className="bg-primary-yello text-gray-900 font-bold py-2.5 px-5 rounded-lg hover:bg-yellow-500 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-yello/20 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Return Home
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
          
          <button 
            onClick={() => window.history.back()}
            className="bg-gray-800 text-white font-bold py-2.5 px-5 rounded-lg border border-gray-700 hover:bg-gray-700 transition-all transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Go Back
            </span>
            <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
      
      {/* Footer message */}
      <div className="absolute bottom-6 text-gray-500 text-sm">
        Error code: 404 - Page not found
      </div>
    </div>
  )
}

export default Notfound