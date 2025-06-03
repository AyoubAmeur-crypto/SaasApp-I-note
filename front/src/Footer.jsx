import React from 'react'
import { FaFeatherAlt, FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa'
import { MdEmail, MdSupportAgent } from 'react-icons/md'
import logo from './assets/LOGO.png'



function Footer() {
  return (
    <footer className="w-full flex justify-center mt-16 mb-6 px-4">
      <div className="w-full lg:w-[1080px] md:w-[720px] sm:w-[380px] backdrop-blur-lg rounded-xl overflow-hidden shadow-lg transition-all duration-300 bg-gradient-to-br from-primary-second/80 to-slate-900/80 border border-primary-yello/10 relative z-10">
        {/* Premium Glass effect with shimmer */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[200%] opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
        </div>
        
        {/* Decorative corner accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-yello/5 rounded-bl-full transform translate-x-16 -translate-y-16 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-yello/5 rounded-tr-full transform -translate-x-16 translate-y-16 opacity-70"></div>
        
        {/* Accent top line with glow effect */}
        <div className="h-1 w-full bg-gradient-to-r from-primary-yello to-amber-600"></div>
        
        <div className="p-6 md:p-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* Logo and company info section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative  h-14 flex items-center justify-center">
                  
                  <img src={logo} alt="Notes Manager Logo" className="h-6" />
                </div>
                <div>
                  
                  <div className="h-0.5 w-3/4 bg-gradient-to-r from-primary-yello to-transparent mt-1"></div>
                </div>
              </div>
              <p className="text-gray-400 text-sm max-w-xs md:max-w-md">
                Organize your thoughts, tasks, and goals with our premium note management system. 
                Elevate your productivity with our intuitive interface.
              </p>
              
              {/* Decorative line with nodes */}
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className={`h-1.5 w-1.5 rounded-full ${i % 2 === 0 ? 'bg-primary-yello' : 'bg-primary-yello/40'}`}></div>
                    {i < 4 && <div className="h-px w-8 bg-gradient-to-r from-primary-yello/80 to-primary-yello/10"></div>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick links section */}
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <h4 className="text-white font-semibold text-md mb-1 relative inline-flex">
                Quick Links
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary-yello to-transparent"></span>
              </h4>
              <div className="grid grid-cols-2 gap-x-12 gap-y-3 md:gap-x-8">
                <a href="#" className="text-gray-400 hover:text-primary-yello transition-colors text-sm flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 bg-primary-yello/40 rounded-full group-hover:bg-primary-yello transition-colors"></span> 
                  <span className="relative">
                    Dashboard
                    <span className="absolute -bottom-px left-0 w-0 h-px bg-primary-yello group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-yello transition-colors text-sm flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 bg-primary-yello/40 rounded-full group-hover:bg-primary-yello transition-colors"></span> 
                  <span className="relative">
                    My Notes
                    <span className="absolute -bottom-px left-0 w-0 h-px bg-primary-yello group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-yello transition-colors text-sm flex items-center gap-1.5 group" >
                  <span className="w-1.5 h-1.5 bg-primary-yello/40 rounded-full group-hover:bg-primary-yello transition-colors"></span> 
                  <span className="relative">
                    Settings
                    <span className="absolute -bottom-px left-0 w-0 h-px bg-primary-yello group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-yello transition-colors text-sm flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 bg-primary-yello/40 rounded-full group-hover:bg-primary-yello transition-colors"></span> 
                  <span className="relative">
                    Profile
                    <span className="absolute -bottom-px left-0 w-0 h-px bg-primary-yello group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-yello transition-colors text-sm flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 bg-primary-yello/40 rounded-full group-hover:bg-primary-yello transition-colors"></span> 
                  <span className="relative">
                    Help
                    <span className="absolute -bottom-px left-0 w-0 h-px bg-primary-yello group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary-yello transition-colors text-sm flex items-center gap-1.5 group">
                  <span className="w-1.5 h-1.5 bg-primary-yello/40 rounded-full group-hover:bg-primary-yello transition-colors"></span> 
                  <span className="relative">
                    Contact
                    <span className="absolute -bottom-px left-0 w-0 h-px bg-primary-yello group-hover:w-full transition-all duration-300"></span>
                  </span>
                </a>
              </div>
            </div>
            
            {/* Social and contact links */}
            <div className="flex flex-col gap-3 items-center md:items-end">
              <h4 className="text-white font-semibold text-md mb-1 relative inline-flex">
                Connect With Us
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary-yello to-transparent"></span>
              </h4>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="p-2.5 rounded-full bg-primary-yello/10 text-primary-yello hover:bg-primary-yello/20 transition-all transform hover:-translate-y-1 hover:shadow-md hover:shadow-primary-yello/20"
                  aria-label="GitHub"
                >
                  <FaGithub className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2.5 rounded-full bg-primary-yello/10 text-primary-yello hover:bg-primary-yello/20 transition-all transform hover:-translate-y-1 hover:shadow-md hover:shadow-primary-yello/20"
                  aria-label="Twitter"
                >
                  <FaTwitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2.5 rounded-full bg-primary-yello/10 text-primary-yello hover:bg-primary-yello/20 transition-all transform hover:-translate-y-1 hover:shadow-md hover:shadow-primary-yello/20"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="p-2.5 rounded-full bg-primary-yello/10 text-primary-yello hover:bg-primary-yello/20 transition-all transform hover:-translate-y-1 hover:shadow-md hover:shadow-primary-yello/20"
                  aria-label="Email"
                >
                  <MdEmail className="h-5 w-5" />
                </a>
              </div>
              <div className="mt-4">
                <button className="bg-gradient-to-r from-primary-yello to-amber-600 py-2.5 px-5 rounded-lg text-white text-sm font-medium hover:shadow-lg hover:shadow-primary-yello/30 transition-all transform hover:-translate-y-1 flex items-center gap-2 group relative overflow-hidden">
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-primary-yello opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <MdSupportAgent className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Contact Support</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Footer bottom section with copyright */}
          <div className="border-t border-gray-700/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 <span className="text-primary-yello">NotesManager</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-400 hover:text-primary-yello text-xs transition-colors">Privacy Policy</a>
              <span className="h-3 w-px bg-gray-700"></span>
              <a href="#" className="text-gray-400 hover:text-primary-yello text-xs transition-colors">Terms of Service</a>
              <span className="h-3 w-px bg-gray-700"></span>
              <a href="#" className="text-gray-400 hover:text-primary-yello text-xs transition-colors">Cookies</a>
            </div>
            <div className="text-gray-500 text-xs flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              System Status: <span className="text-green-400 font-medium">Online</span>
            </div>
          </div>
        </div>
        
        {/* Accent bottom line with glow effect */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-600 to-primary-yello"></div>
      </div>
      
      {/* Add animations */}
      <style jsx>{`
        @keyframes glass-sheen {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(200%) skewX(-45deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        .animate-glass-sheen {
          animation: glass-sheen 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </footer>
  )
}

export default Footer