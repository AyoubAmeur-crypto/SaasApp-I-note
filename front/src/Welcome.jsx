import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from './assets/LOGO.png'

function Welcome() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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
                
                {/* Animated light beam */}
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

            {/* Main Content - Reduced height and more compact */}
            <div className="max-w-7xl w-full flex flex-col items-center gap-4 px-4 z-10 py-4">
                {/* Logo - smaller and more compact */}
                <div className="mb-1">
                    <svg width="120" height="40" viewBox="0 0 140 60" className="animate-float-slow">
                        <rect x="40" y="10" width="60" height="40" rx="6" fill="#0F172A" />
                        <rect x="45" y="15" width="50" height="10" rx="2" fill="#FFD700" opacity="0.9" />
                        <rect x="45" y="30" width="50" height="5" rx="1" fill="#334155" />
                        <rect x="45" y="40" width="30" height="5" rx="1" fill="#334155" />
                        <circle cx="88" cy="42" r="3" fill="#FFD700" opacity="0.8" />
                    </svg>
                </div>
                
                {/* Main hero section - more compact layout */}
                <div className="bg-primary-second bg-opacity-50 backdrop-blur-xl rounded-xl w-full max-w-[1020px] border border-white/5 shadow-2xl shadow-black/20 overflow-hidden relative">
                    {/* Glass sheen effect */}
                    <div className="absolute inset-0 overflow-hidden opacity-20">
                        <div 
                            className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"
                        ></div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row items-center">
                        {/* Left content - reduced padding */}
                        <div className="w-full lg:w-1/2 p-5 lg:p-8 relative">
                            <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                                <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
                                    <path d="M0 0L80 0L0 80L0 0Z" fill="#FFD700" fillOpacity="0.1" />
                                </svg>
                            </div>
                            
                            <div className="relative">
                                {/* App name and logo in single row */}
                                <div className="flex items-center gap-3 mb-5">
                                    <svg width="32" height="32" viewBox="0 0 50 50" className="flex-shrink-0">
                                        <rect x="5" y="5" width="40" height="40" rx="6" fill="#1E293B" />
                                        <rect x="10" y="10" width="30" height="8" rx="2" fill="#FFD700" opacity="0.9" />
                                        <rect x="10" y="22" width="30" height="4" rx="1" fill="#475569" />
                                        <rect x="10" y="30" width="30" height="4" rx="1" fill="#475569" />
                                        <rect x="10" y="38" width="20" height="4" rx="1" fill="#475569" />
                                    </svg>
                                    <img src={logo} className='h-4' alt="" />
                                </div>
                                
                                {/* Main headline - more compact */}
                                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 mb-5 border border-gray-700/30 relative overflow-hidden group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary-yello to-amber-500 opacity-0 group-hover:opacity-20 transition duration-1000 blur-xl rounded-xl"></div>
                                    
                                    <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                                        Great ideas start with <span className="text-primary-yello">a single note</span>
                                    </h1>
                                    <p className="text-gray-300 mt-2 text-sm md:text-base">
                                        Capture everything, organize anywhere, and never forget anything important again.
                                    </p>
                                </div>
                                
                                {/* Buttons - more compact */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                    <button 
                                        className="flex-1 bg-primary-yello text-gray-900 font-bold py-2.5 px-5 rounded-lg hover:bg-yellow-500 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-yello/20 relative overflow-hidden group"
                                        onClick={() => {
                                            setLoader(true)
                                            setTimeout(() => navigate('/signup'), 500)
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                            Sign Up
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </button>
                                    
                                    <button 
                                        className="flex-1 bg-gray-800 text-white font-bold py-2.5 px-5 rounded-lg border border-gray-700 hover:bg-gray-700 transition-all transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group"
                                        onClick={() => {
                                            setLoader(true)
                                            setTimeout(() => navigate('/login'), 500)
                                        }}
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                                                <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Log In
                                        </span>
                                        <span className="absolute inset-0 bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Right side illustration - reduced height */}
                        <div className="w-full lg:w-1/2 p-4 lg:p-0 bg-gradient-to-br from-gray-900/60 to-transparent lg:h-[400px] flex items-center justify-center relative overflow-hidden">
                            {/* Smaller decorative circles */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary-yello/10 animate-spin-slow opacity-30"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full border border-primary-yello/20 animate-spin-slow-reverse opacity-50"></div>
                            
                            {/* More compact SVG Illustration */}
                            <svg width="320" height="320" viewBox="0 0 400 400" className="relative z-10 animate-float" style={{ animationDuration: '6s' }}>
                                <circle cx="200" cy="200" r="130" fill="#1E293B" opacity="0.7" />
                                <circle cx="200" cy="200" r="110" stroke="#FFD700" strokeWidth="2" strokeDasharray="10 5" opacity="0.6" className="animate-rotate-slow" />
                                
                                {/* Main Note - scaled down */}
                                <g className="animate-float-slow" style={{ transformOrigin: 'center', animationDuration: '6s' }}>
                                    <rect x="140" y="130" width="120" height="100" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="2" />
                                    <rect x="150" y="140" width="100" height="20" rx="4" fill="#FFD700" opacity="0.9" />
                                    <rect x="150" y="170" width="100" height="6" rx="2" fill="#334155" />
                                    <rect x="150" y="185" width="100" height="6" rx="2" fill="#334155" />
                                    <rect x="150" y="200" width="100" height="6" rx="2" fill="#334155" />
                                    <rect x="150" y="215" width="60" height="6" rx="2" fill="#334155" />
                                </g>
                                
                                {/* Reduced number of floating notes for cleaner look */}
                                <g className="animate-float-reverse" style={{ transformOrigin: 'center', animationDelay: '1s', animationDuration: '7s' }}>
                                    <rect x="100" y="100" width="70" height="60" rx="6" fill="#334155" opacity="0.8" transform="rotate(-15, 100, 100)" />
                                    <rect x="110" y="110" width="50" height="6" rx="2" fill="#FFD700" opacity="0.6" transform="rotate(-15, 100, 100)" />
                                    <rect x="110" y="122" width="50" height="4" rx="1" fill="#1E293B" transform="rotate(-15, 100, 100)" />
                                    <rect x="110" y="132" width="50" height="4" rx="1" fill="#1E293B" transform="rotate(-15, 100, 100)" />
                                </g>
                                
                                <g className="animate-float-slow" style={{ transformOrigin: 'center', animationDelay: '0.5s', animationDuration: '8s' }}>
                                    <rect x="270" y="100" width="70" height="60" rx="6" fill="#334155" opacity="0.8" transform="rotate(10, 300, 100)" />
                                    <rect x="280" y="110" width="50" height="6" rx="2" fill="#FFD700" opacity="0.6" transform="rotate(10, 300, 100)" />
                                    <rect x="280" y="122" width="50" height="4" rx="1" fill="#1E293B" transform="rotate(10, 300, 100)" />
                                    <rect x="280" y="132" width="50" height="4" rx="1" fill="#1E293B" transform="rotate(10, 300, 100)" />
                                </g>
                                
                                {/* Moving pen - smaller motion */}
                                <g className="animate-pen-write" style={{ transformOrigin: '200px 200px' }}>
                                    <path d="M240 180 L300 140" stroke="#FFD700" strokeWidth="2" strokeDasharray="5 3" />
                                    <g transform="translate(300, 140) rotate(-45)">
                                        <rect x="0" y="0" width="20" height="5" rx="2" fill="#334155" />
                                        <rect x="0" y="0" width="6" height="5" rx="2" fill="#FFD700" />
                                        <path d="M20 2.5 L24 0 L24 5 Z" fill="#334155" />
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                
                {/* Trust badges section - more compact */}
                <div className="bg-primary-second bg-opacity-30 backdrop-blur-sm rounded-lg w-full max-w-[1020px] p-3 border border-white/5 relative">
                    {/* Subtle pulsing border */}
                    <div className="absolute inset-0 rounded-lg border border-primary-yello/10 animate-pulse-border"></div>
                    
                    <div className="flex flex-col items-center">
                        <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">Trusted by the world's leading companies</p>
                        <div className="flex flex-wrap justify-evenly w-full gap-4 items-center">
                            {/* Company logos - smaller and more compact */}
                            <svg width="36" height="36" viewBox="0 0 50 50" className="opacity-40 hover:opacity-90 transition-opacity">
                                <path d="M34.7 25.3c0-4.8 3.9-7.1 4.1-7.2-2.2-3.3-5.7-3.7-6.9-3.8-2.9-0.3-5.8 1.7-7.3 1.7-1.5 0-3.8-1.7-6.3-1.7-3.2 0.1-6.2 1.9-7.8 4.7-3.4 5.8-0.9 14.4 2.4 19.1 1.6 2.3 3.5 4.9 6 4.8 2.4-0.1 3.3-1.6 6.2-1.6 2.9 0 3.7 1.6 6.2 1.5 2.6 0 4.2-2.3 5.7-4.6 1.8-2.7 2.6-5.2 2.6-5.3-0.1-0.1-4.9-1.9-4.9-7.6z" fill="white"/>
                                <path d="M30.6 13.5c1.3-1.6 2.2-3.9 2-6.1-1.9 0.1-4.2 1.3-5.6 2.9-1.2 1.4-2.3 3.7-2 5.9 2.1 0.2 4.3-1 5.6-2.7z" fill="white"/>
                            </svg>
                            
                            <svg width="80" height="30" viewBox="0 0 120 40" className="opacity-40 hover:opacity-90 transition-opacity">
                                <path d="M33.5 20c0-8.3 6.6-15 14.8-15 4.4 0 8.4 1.8 11.3 4.7l-3.3 3.3c-2-2-4.8-3.3-7.9-3.3-6.4 0-11.5 5.2-11.5 11.5 0 6.4 5.2 11.5 11.5 11.5 4.2 0 7.9-2.3 9.9-5.7l3.7 2.1c-2.7 4.7-7.7 7.9-13.6 7.9-8.2 0-14.9-6.7-14.9-15z" fill="white"/>
                                <path d="M77.5 34.3h-4V19.7h4v14.6zm0-19.6h-4v-4h4v4z" fill="white"/>
                                <path d="M88.5 34.3h-4V5h4v29.3z" fill="white"/>
                            </svg>
                            
                            <svg width="32" height="32" viewBox="0 0 40 40" className="opacity-40 hover:opacity-90 transition-opacity">
                                <path d="M22.2 9.5c-6.4 0-11.7 5.2-11.7 11.7 0 3.5 1.5 6.7 4.1 8.8l-0.5 3.5 3.6-0.6c1.4 0.7 3 1.1 4.6 1.1 6.4 0 11.7-5.2 11.7-11.7 0-6.4-5.2-11.7-11.7-11.7z" fill="none" stroke="white" strokeWidth="2"/>
                                <path d="M17.5 20.5l4 4 7-9" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            
                            <svg width="60" height="30" viewBox="0 0 80 40" className="opacity-40 hover:opacity-90 transition-opacity">
                                <path d="M15 10h10v20H15z" fill="white"/>
                                <path d="M30 10h10c5.5 0 10 4.5 10 10s-4.5 10-10 10H30V10z" fill="none" stroke="white" strokeWidth="2"/>
                                <path d="M55 10h10v10H55z" fill="white"/>
                                <path d="M55 25h10v5H55z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading overlay with improved animation */}
            {loader && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-primary-main/90 backdrop-blur-md transition-all duration-300">
                    {/* Animated loading spinner with rays */}
                    <div className="relative w-20 h-20 mb-4">
                        {/* Outer pulsing circle */}
                        <div className="absolute inset-0 rounded-full border-4 border-primary-yello/10 animate-ping-slow"></div>
                        
                        {/* Spinning loader */}
                        <div className="absolute inset-0 rounded-full border-4 border-primary-yello border-t-transparent animate-spin"></div>
                        
                        {/* Inner glow */}
                        <div className="absolute inset-[6px] rounded-full bg-primary-yello/5 animate-pulse"></div>
                        
                        {/* Rays of light radiating outward */}
                        {[...Array(8)].map((_, i) => (
                            <div 
                                key={i} 
                                className="absolute top-1/2 left-1/2 w-1 h-8 bg-gradient-to-t from-primary-yello/60 to-transparent"
                                style={{ 
                                    transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-14px)`,
                                    opacity: Math.random() * 0.3 + 0.2,
                                    animationDelay: `${i * 0.125}s`
                                }}
                            ></div>
                        ))}
                        
                        {/* Center dot */}
                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary-yello rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
                    </div>
                    
                    <h2 className="text-white text-lg font-bold">Loading...</h2>
                    <p className="text-gray-300 text-sm mt-1 max-w-xs text-center">
                        Your adventure is about to begin
                    </p>
                    
                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-gray-700 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-primary-yello rounded-full animate-progress"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Welcome