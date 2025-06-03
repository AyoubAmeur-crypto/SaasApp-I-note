import React, { useEffect, useRef } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoDocumentTextOutline } from "react-icons/io5"
import { FaUserShield, FaCrown, FaHeadset } from "react-icons/fa"

function Policies() {
  // Reference for canvas animation
  const canvasRef = useRef(null);

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = 'rgba(10, 10, 15, 0.8)';
      ctx.fillRect(0, 0, width, height);
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Particle settings
    const particleCount = 50;
    const particles = [];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(251, 191, 36, ${Math.random() * 0.25})`, // primary-yello with varying opacity
      });
    }
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Fade effect by applying semi-transparent bg
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(particle => {
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x > width) particle.x = 0;
        if (particle.x < 0) particle.x = width;
        if (particle.y > height) particle.y = 0;
        if (particle.y < 0) particle.y = height;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className='w-full bg-primary-main min-h-screen relative'>
      {/* Dynamic Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      ></canvas>
      
      {/* Radial gradient overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary-second/30 to-primary-main/95 pointer-events-none z-0"></div>
      <div className="fixed top-0 left-1/4 w-1/2 h-1/2 bg-primary-yello/5 blur-[150px] rounded-full animate-pulse-slow pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-1/2 h-1/2 bg-primary-yello/5 blur-[150px] rounded-full animate-pulse-slow-delay pointer-events-none z-0"></div>
      
      <div className="flex flex-col items-center w-7xl p-3 relative z-10">
        <NavBar/>
        
        <div className="bg-gradient-to-b from-primary-second/90 to-primary-main/95 rounded-xl w-full lg:w-[1080px] md:w-[720px] sm:w-[380px] mt-8 overflow-hidden border border-primary-yello/20 shadow-lg relative backdrop-blur-sm">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -inset-[200%] opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
            
            {/* Animated corner gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-yello/5 rounded-full transform translate-x-32 -translate-y-32 blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-yello/5 rounded-full transform -translate-x-32 translate-y-32 blur-3xl animate-float-delay"></div>
            
            {/* Light streaks */}
            <div className="absolute top-1/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary-yello/20 to-transparent opacity-70 animate-sweep"></div>
            <div className="absolute top-3/4 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary-yello/20 to-transparent opacity-70 animate-sweep-delay"></div>
          </div>

          {/* Header with glowing border */}
          <div className="relative p-8 pb-4 border-b border-primary-yello/30">
            <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-primary-yello/10 border border-primary-yello/30 relative">
                <IoDocumentTextOutline className="text-primary-yello text-2xl" />
                {/* Pulsing ring effect */}
                <div className="absolute inset-0 rounded-full border border-primary-yello/30 animate-ping-slow"></div>
              </div>
              <h1 className="text-white text-3xl font-bold">App Policies</h1>
            </div>
            <p className="text-gray-400 mt-3 max-w-2xl text-sm">
              We're committed to transparency and protecting your data. Please review our policies to understand how we operate our service.
            </p>
          </div>
          
          <div className="p-8 space-y-10 relative">
            {/* Terms of Service */}
            <div className="bg-gradient-to-br from-primary-second/50 to-black/30 rounded-xl p-6 border border-primary-yello/10 hover:border-primary-yello/30 transition-all duration-300 shadow-md group hover:shadow-primary-yello/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary-yello/10 border border-primary-yello/30 group-hover:bg-primary-yello/20 transition-all duration-300 relative">
                  <IoShieldCheckmarkOutline className="text-primary-yello text-xl" />
                  <svg className="absolute -inset-1 text-primary-yello/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" strokeWidth="3" stroke="currentColor" fill="none" className="animate-reverse-spin" />
                    <path d="M50,10 A40,40 0 0,1 90,50" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-primary-yello text-xl font-semibold mb-4 flex items-center">
                    Terms of Service
                    <span className="h-px w-16 bg-gradient-to-r from-primary-yello to-transparent ml-3"></span>
                  </h2>
                  <div className="text-gray-300 text-sm space-y-3">
                    <p>By using our note-taking application, you agree to these terms, which grant you a limited, non-exclusive, non-transferable license to use the application.</p>
                    <p>We reserve the right to modify, suspend, or discontinue any aspect of the service at any time. Changes to these terms will be posted on this page with an updated revision date.</p>
                    <p>Your account is personal to you, and you're responsible for maintaining the confidentiality of your password and restricting access to your devices.</p>
                  </div>
                </div>
              </div>
            </div>
          
            {/* Privacy Policy */}
            <div className="bg-gradient-to-br from-primary-second/50 to-black/30 rounded-xl p-6 border border-primary-yello/10 hover:border-primary-yello/30 transition-all duration-300 shadow-md group hover:shadow-primary-yello/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary-yello/10 border border-primary-yello/30 group-hover:bg-primary-yello/20 transition-all duration-300 relative">
                  <FaUserShield className="text-primary-yello text-xl" />
                  <svg className="absolute -inset-1 text-primary-yello/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" strokeWidth="3" stroke="currentColor" fill="none" className="animate-reverse-spin" />
                    <path d="M50,10 A40,40 0 0,1 90,50" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-primary-yello text-xl font-semibold mb-4 flex items-center">
                    Privacy Policy
                    <span className="h-px w-16 bg-gradient-to-r from-primary-yello to-transparent ml-3"></span>
                  </h2>
                  <div className="text-gray-300 text-sm space-y-3">
                    <p>We collect personal information such as your name, email address, and optional profile details. We also collect usage data to improve our service.</p>
                    <p>The content of your notes is encrypted and stored securely. We do not access, share, or analyze the content of your notes except in the limited circumstances described in this policy.</p>
                    <p>We may use anonymized, aggregated data for analytical purposes to improve our service.</p>
                    <p>You can request a copy of your data or deletion of your account at any time through the account settings.</p>
                  </div>
                </div>
              </div>
            </div>
          
            {/* Data Security */}
            <div className="bg-gradient-to-br from-primary-second/50 to-black/30 rounded-xl p-6 border border-primary-yello/10 hover:border-primary-yello/30 transition-all duration-300 shadow-md group hover:shadow-primary-yello/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary-yello/10 border border-primary-yello/30 group-hover:bg-primary-yello/20 transition-all duration-300 relative">
                  <IoLockClosedOutline className="text-primary-yello text-xl" />
                  <svg className="absolute -inset-1 text-primary-yello/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" strokeWidth="3" stroke="currentColor" fill="none" className="animate-reverse-spin" />
                    <path d="M50,10 A40,40 0 0,1 90,50" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-primary-yello text-xl font-semibold mb-4 flex items-center">
                    Data Security
                    <span className="h-px w-16 bg-gradient-to-r from-primary-yello to-transparent ml-3"></span>
                  </h2>
                  <div className="text-gray-300 text-sm space-y-3">
                    <p>We implement industry-standard security measures to protect your data, including encryption at rest and in transit.</p>
                    
                    {/* Visual security representation with animation */}
                    <div className="bg-black/20 rounded-lg p-4 my-4 relative overflow-hidden group-hover:bg-black/30 transition-all duration-500">
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -inset-[200%] opacity-10 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen-fast"></div>
                      </div>
                      
                      <div className="flex justify-between items-center mb-3 relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs text-gray-400">End-to-End Encryption</span>
                        </div>
                        <svg className="h-5 w-5 text-primary-yello" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 10V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <rect x="5" y="10" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="16" r="1" fill="currentColor"/>
                        </svg>
                      </div>
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-1.5 w-full md:w-[48%] bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary-yello to-amber-600 animate-pulse-width" 
                              style={{ 
                                width: `${90 - i * 12}%`,
                                animationDelay: `${i * 0.2}s`
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <p>Your notes are encrypted with advanced encryption standards, and only you can access them with your credentials.</p>
                    <p>We conduct regular security audits and updates to ensure the ongoing protection of your data.</p>
                    <p>In the event of a data breach, we will notify affected users within 72 hours of discovery.</p>
                  </div>
                </div>
              </div>
            </div>
          
            {/* Rest of the sections remain the same */}
            {/* ... */}

            {/* Contact Information with enhanced effects */}
            <div className="bg-gradient-to-r from-primary-yello/10 to-transparent rounded-xl p-6 border border-primary-yello/30 relative overflow-hidden group hover:border-primary-yello/50 transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-yello/10 rounded-full blur-xl transform translate-x-16 -translate-y-16 group-hover:bg-primary-yello/20 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-yello/10 rounded-full blur-xl transform -translate-x-16 translate-y-16 group-hover:bg-primary-yello/20 transition-all duration-700"></div>
              
              {/* Animated particles only visible on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary-yello/30"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animation: `float-around ${5 + Math.random() * 10}s linear infinite`,
                      animationDelay: `${Math.random() * 5}s`
                    }}
                  />
                ))}
              </div>
              
              <div className="flex items-start gap-4 relative">
                <div className="p-3 rounded-full bg-primary-yello/20 border border-primary-yello/30 group-hover:bg-primary-yello/30 transition-all duration-300 relative">
                  <FaHeadset className="text-primary-yello text-xl" />
                  <div className="absolute inset-0 rounded-full border border-primary-yello/30 animate-ping-slow opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div>
                  <h2 className="text-primary-yello text-xl font-semibold mb-2">Questions or Concerns?</h2>
                  <p className="text-white text-sm">If you have any questions about these policies or our service, please contact us at:</p>
                  <div className="bg-black/20 rounded-lg px-4 py-3 mt-3 border border-primary-yello/20 inline-block relative overflow-hidden group-hover:border-primary-yello/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-yello/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <p className="text-primary-yello font-semibold relative">support@notesapp.com</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-yello animate-pulse"></div>
                    <p className="text-white text-xs">Last updated: April 13, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Footer/>
      </div>
      
      <style jsx>{`
        @keyframes glass-sheen {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(200%) skewX(-45deg); }
        }
        
        @keyframes glass-sheen-fast {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(200%) skewX(-45deg); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(1); opacity: 0; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes pulse-slow-delay {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float {
          0%, 100% { transform: translate(32px, -32px) scale(1); }
          50% { transform: translate(32px, -32px) scale(1.1); }
        }
        
        @keyframes float-delay {
          0%, 100% { transform: translate(-32px, 32px) scale(1); }
          50% { transform: translate(-32px, 32px) scale(1.1); }
        }
        
        @keyframes sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes sweep-delay {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes reverse-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes pulse-width {
          0%, 100% { width: attr(data-width); }
          50% { width: calc(attr(data-width) + 5%); }
        }
        
        @keyframes float-around {
          0% { transform: translate(0, 0); }
          25% { transform: translate(20px, 20px); }
          50% { transform: translate(0, 40px); }
          75% { transform: translate(-20px, 20px); }
          100% { transform: translate(0, 0); }
        }
        
        .animate-glass-sheen {
          animation: glass-sheen 8s ease-in-out infinite;
        }
        
        .animate-glass-sheen-fast {
          animation: glass-sheen-fast 5s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 6s ease-in-out 3s infinite;
        }
        
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float-delay 10s ease-in-out infinite;
        }
        
        .animate-sweep {
          animation: sweep 15s linear infinite;
        }
        
        .animate-sweep-delay {
          animation: sweep-delay 15s linear 7.5s infinite;
        }
        
        .animate-reverse-spin {
          animation: reverse-spin 12s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Policies