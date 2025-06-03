import React, { useEffect, useState ,useRef} from 'react'
import { jwtDecode } from 'jwt-decode'
import { FaUser, FaEnvelope, FaLock, FaUserEdit, FaCheck, FaArrowLeft, FaEye, FaEyeSlash, FaExclamationTriangle, FaCheckCircle, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditProfile() {
    const navigate = useNavigate()
    const token = localStorage.getItem("userData")
    const [dataUser,setDataUser]=useState(jwtDecode(token))    
    const [showPasswordChange, setShowPasswordChange] = useState(false)
    const [notification, setNotification] = useState({ show: false, message: '', isClosing: false })
    const [dataChange,setChangeData]=useState({firstName:null,lastName:null,userName:null,Email:null})
    const [passwordSetting,setPassswordSetting]=useState({currentOne:'',newOne:'',confirmedOne:''})
    const [formError, setFormError] = useState({ show: false, message: '', type: 'error' }) // New state for form errors
    
    // Password validation states
    const [passwordStrength, setPasswordStrength] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
        match: false
    })
    
    // Password visibility states (doesn't change logic, just improves UX)
    const [passwordVisibility, setPasswordVisibility] = useState({
        current: false,
        new: false,
        confirm: false
    })

    // Validate password as user types
    useEffect(() => {
        if (passwordSetting.newOne) {
            setPasswordStrength({
                length: passwordSetting.newOne.length >= 8,
                lowercase: /[a-z]/.test(passwordSetting.newOne),
                uppercase: /[A-Z]/.test(passwordSetting.newOne),
                number: /[0-9]/.test(passwordSetting.newOne),
                special: /[^A-Za-z0-9]/.test(passwordSetting.newOne),
                match: passwordSetting.newOne === passwordSetting.confirmedOne && passwordSetting.newOne !== ''
            });
        }
    }, [passwordSetting.newOne, passwordSetting.confirmedOne]);

    const handlePasswordChnage = async (e)=>{
        e.preventDefault()
        
        // Clear previous errors
        setFormError({ show: false, message: '', type: 'error' });

        // Validate password before submission
        if (!passwordStrength.length || !passwordStrength.lowercase || 
            !passwordStrength.uppercase || !passwordStrength.number || 
            !passwordStrength.special) {
            setFormError({ 
                show: true, 
                message: 'Your password does not meet all requirements', 
                type: 'error' 
            });
            return;
        }
        
        if (!passwordStrength.match) {
            setFormError({ 
                show: true, 
                message: 'Passwords do not match', 
                type: 'error' 
            });
            return;
        }

        try {
            const changePassword = await axios.post("http://localhost:3000/changePasswordwithToken",{
                email:dataUser.email,
                Currentpassword:passwordSetting.currentOne,
                newOne:passwordSetting.newOne,
                confirmedOne:passwordSetting.confirmedOne
            },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            setNotification({
                show: true,
                message: changePassword.data,
                isClosing: false
            });
          
            setTimeout(() => {
                setNotification(prev => ({ ...prev, isClosing: true }));
            }, 3700);
          
            setTimeout(() => {
                setNotification({ show: false, message: '', isClosing: false });
            }, 4000);

            setFormError({ show: true, message: 'Password updated successfully!', type: 'success' });
            setPassswordSetting({currentOne:'',newOne:'',confirmedOne:''})
                
        } catch (error) {
            console.error("Profile update error:", error.response?.data || error);

            setNotification({
                show: true,
                message: error.response.data,
                isClosing: false
            });
          
            setTimeout(() => {
                setNotification(prev => ({ ...prev, isClosing: true }));
            }, 3700);
          
            setTimeout(() => {
                setNotification({ show: false, message: '', isClosing: false });
            }, 4000);
            
            setFormError({ 
                show: true, 
                message: error.response?.data || 'Error updating password', 
                type: 'error' 
            });
        }
    }
    
    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        
        // Clear previous errors
        setFormError({ show: false, message: '', type: 'error' });

        try {
            // Only send the fields that have actually changed
            const updatedFields = {};
            
            if (dataChange.firstName !== null) updatedFields.firstName = dataChange.firstName;
            if (dataChange.lastName !== null) updatedFields.lastName = dataChange.lastName;
            if (dataChange.userName !== null) updatedFields.userName = dataChange.userName;
            if (dataChange.Email !== null) updatedFields.email = dataChange.Email;
            
            // Only make the API call if there are fields to update
            if (Object.keys(updatedFields).length > 0) {
                const UpdateProfile = await axios.put(
                    `http://localhost:3000/UpdateProfile/${dataUser.id}`,
                    updatedFields,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                
                localStorage.setItem("userData", UpdateProfile.data);
                
                setChangeData({
                    firstName: null,
                    lastName: null,
                    userName: null,
                    Email: null
                });
                
                // Show success notification
                setNotification({
                    show: true,
                    message: 'Profile updated successfully',
                    isClosing: false
                });
                
                setFormError({ show: true, message: 'Profile updated successfully!', type: 'success' });
                
                setTimeout(() => {
                    setNotification(prev => ({ ...prev, isClosing: true }));
                }, 3700);
                
                setTimeout(() => {
                    setNotification({ show: false, message: '', isClosing: false });
                }, 4000);
            } else {
                // No changes were made
                setNotification({
                    show: true,
                    message: 'No changes to update',
                    isClosing: false
                });
                
                setFormError({ show: true, message: 'No changes to update', type: 'info' });
                
                setTimeout(() => {
                    setNotification(prev => ({ ...prev, isClosing: true }));
                }, 3700);
                
                setTimeout(() => {
                    setNotification({ show: false, message: '', isClosing: false });
                }, 4000);
            }
        } catch (error) {
            console.error("Profile update error:", error.response?.data || error);
            
            setNotification({
                show: true,
                message: error.response?.data || "An error occurred",
                isClosing: false
            });
            
            setFormError({ 
                show: true, 
                message: error.response?.data || "An error occurred", 
                type: 'error' 
            });
            
            setTimeout(() => {
                setNotification(prev => ({ ...prev, isClosing: true }));
            }, 3700);
            
            setTimeout(() => {
                setNotification({ show: false, message: '', isClosing: false });
            }, 4000);
        }
    }

    useEffect(()=>{
        const newToken = localStorage.getItem("userData")

        if(newToken){
            setDataUser(jwtDecode(newToken))
        }
    },[notification.show])
    
    // Toggle password visibility - UI enhancement only
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

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
        <div className="bg-gradient-to-b from-primary-main to-primary-second w-full min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative background elements */}
            <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      ></canvas>
      
      {/* Radial gradient overlays */}
      <div className="fixed inset-0 bg-gradient-to-b from-primary-second/30 to-primary-main/95 pointer-events-none z-0"></div>
      <div className="fixed top-0 left-1/4 w-1/2 h-1/2 bg-primary-yello/5 blur-[150px] rounded-full animate-pulse-slow pointer-events-none z-0"></div>
      <div className="fixed bottom-0 right-1/4 w-1/2 h-1/2 bg-primary-yello/5 blur-[150px] rounded-full animate-pulse-slow-delay pointer-events-none z-0"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxQTFDMjMiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiMxRTI0MkIiIGZpbGwtb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6TTMwIDBoMzB2MzBIMzB6IiBmaWxsPSIjMUUyNDJCIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')]"></div>
                
                {/* Glowing orbs */}
                <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-primary-yello/5 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary-yello/5 rounded-full blur-[120px] animate-pulse-slow-delay"></div>
                
                {/* Floating particles */}
                {[...Array(12)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-primary-yello/20"
                        style={{
                            width: `${Math.random() * 5 + 2}px`,
                            height: `${Math.random() * 5 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5,
                            animation: `float-around ${Math.random() * 20 + 10}s infinite ease-in-out ${Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>
            
            {/* Back button */}
            <button 
                onClick={() => navigate('/Notes')}
                className="absolute top-6 left-6 text-white hover:text-primary-yello transition-colors flex items-center gap-2 bg-primary-second/60 backdrop-blur-sm px-4 py-2 rounded-full"
            >
                <FaArrowLeft /> Back to Notes
            </button>
            
            {/* Dynamic animated SVG based on form state */}
            {formError.show && (
                <div className={`absolute top-6 right-6 max-w-xs transform transition-all duration-500 ${formError.type === 'success' ? 'animate-bounce-slow' : formError.type === 'error' ? 'animate-shake' : 'animate-pulse'}`}>
                    <div className={`flex items-center gap-3 p-3 rounded-lg backdrop-blur-sm 
                        ${formError.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                          formError.type === 'error' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                          'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                        
                        {formError.type === 'success' && (
                            <div className="w-12 h-12 relative">
                                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="fill-green-500/20" cx="50" cy="50" r="45" />
                                    <path 
                                        className="stroke-green-400 animate-draw-check" 
                                        strokeWidth="6" 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round"
                                        fill="none" 
                                        d="M30,50 L45,65 L70,35" 
                                    />
                                </svg>
                            </div>
                        )}
                        
                        {formError.type === 'error' && (
                            <div className="w-12 h-12 relative">
                                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="fill-red-500/20" cx="50" cy="50" r="45" />
                                    <path 
                                        className="stroke-red-400 animate-draw-x" 
                                        strokeWidth="6" 
                                        strokeLinecap="round" 
                                        d="M35,35 L65,65 M65,35 L35,65" 
                                    />
                                </svg>
                            </div>
                        )}
                        
                        {formError.type === 'info' && (
                            <div className="w-12 h-12 relative">
                                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="fill-blue-500/20" cx="50" cy="50" r="45" />
                                    <circle className="fill-blue-400" cx="50" cy="35" r="6" />
                                    <path 
                                        className="stroke-blue-400 animate-draw-i" 
                                        strokeWidth="6" 
                                        strokeLinecap="round" 
                                        d="M50,45 L50,65" 
                                    />
                                </svg>
                            </div>
                        )}
                        
                        <p className="font-medium">{formError.message}</p>
                    </div>
                </div>
            )}
            
            {/* Profile card */}
            <div className="w-full max-w-xl bg-gradient-to-b from-primary-second/90 to-primary-main/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-primary-yello/20 relative">
                {/* Card shine effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -inset-[200%] opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-yello/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-yello/40 to-transparent"></div>
                </div>
                
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-yello/90 to-amber-600/90 p-4 flex items-center justify-between relative overflow-hidden">
                    {/* Header shine effect */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -inset-[200%] opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen-fast"></div>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2 relative">
                        <FaUserEdit className="text-3xl" /> Profile Settings
                    </h1>
                    <div className="bg-primary-second rounded-full h-12 w-12 flex items-center justify-center text-primary-yello text-xl border-2 border-primary-yello/50 shadow-lg relative">
                        {dataUser.firstName?.charAt(0) || dataUser.userName?.charAt(0) || 'U'}
                        <div className="absolute -inset-1 rounded-full border border-primary-yello/30 animate-ping-slow"></div>
                    </div>
                </div>
                
                {/* Form */}
                <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h2 className="text-white text-lg font-semibold border-b border-gray-700/50 pb-2 flex items-center gap-2">
                            <svg className="h-5 w-5 text-primary-yello" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Personal Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                                    <svg className="h-4 w-4 text-primary-yello/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M20 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    First Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-focus-within:text-primary-yello transition-colors">
                                        <FaUser />
                                    </div>
                                    <input 
                                        type="text" 
                                        className="p-3 pl-10 bg-primary-main/50 text-white rounded-lg w-full border border-primary-yello/30 focus:border-primary-yello/70 focus:outline-none focus:ring-1 focus:ring-primary-yello transition-all duration-300" 
                                        value={dataChange.firstName !== null ? dataChange.firstName : dataUser.firstName}
                                        onChange={(e)=>setChangeData(prev=>({...prev,firstName:e.target.value}))}
                                        placeholder="First Name"
                                    />
                                    <div className="absolute inset-0 rounded-lg border border-primary-yello/0 group-focus-within:border-primary-yello/10 pointer-events-none"></div>
                                </div>
                            </div>
                            
                            {/* Last Name */}
                            <div className="space-y-2">
                                <label className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                                    <svg className="h-4 w-4 text-primary-yello/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M20 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M23 11H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Last Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-focus-within:text-primary-yello transition-colors">
                                        <FaUser />
                                    </div>
                                    <input 
                                        type="text" 
                                        className="p-3 pl-10 bg-primary-main/50 text-white rounded-lg w-full border border-primary-yello/30 focus:border-primary-yello/70 focus:outline-none focus:ring-1 focus:ring-primary-yello transition-all duration-300" 
                                        value={dataChange.lastName !== null ? dataChange.lastName : dataUser.lastName}
                                        onChange={(e)=>setChangeData(prev=>({...prev,lastName:e.target.value}))}
                                        placeholder="Last Name"
                                    />
                                    <div className="absolute inset-0 rounded-lg border border-primary-yello/0 group-focus-within:border-primary-yello/10 pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Username */}
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                                <svg className="h-4 w-4 text-primary-yello/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Username
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-focus-within:text-primary-yello transition-colors">
                                    <FaUser />
                                </div>
                                <input 
                                    type="text" 
                                    className="p-3 pl-10 bg-primary-main/50 text-white rounded-lg w-full border border-primary-yello/30 focus:border-primary-yello/70 focus:outline-none focus:ring-1 focus:ring-primary-yello transition-all duration-300" 
                                    value={dataChange.userName !== null ? dataChange.userName : dataUser.userName}
                                    onChange={(e)=>setChangeData(prev=>({...prev,userName:e.target.value}))}
                                    placeholder="Username"
                                />
                                <div className="absolute inset-0 rounded-lg border border-primary-yello/0 group-focus-within:border-primary-yello/10 pointer-events-none"></div>
                            </div>
                        </div>
                        
                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                                <svg className="h-4 w-4 text-primary-yello/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70 group-focus-within:text-primary-yello transition-colors">
                                    <FaEnvelope />
                                </div>
                                <input 
                                    type="email" 
                                    className="p-3 pl-10 bg-primary-main/50 text-white rounded-lg w-full border border-primary-yello/30 focus:border-primary-yello/70 focus:outline-none focus:ring-1 focus:ring-primary-yello transition-all duration-300" 
                                    value={dataChange.Email !== null ? dataChange.Email : dataUser.email}
                                    onChange={(e)=>setChangeData(prev=>({...prev,Email:e.target.value}))}
                                    placeholder="Email Address"
                                />
                                <div className="absolute inset-0 rounded-lg border border-primary-yello/0 group-focus-within:border-primary-yello/10 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Password Section - Toggle */}
                    <div className="pt-2">
                        <button 
                            type="button"
                            className="flex items-center gap-2 text-primary-yello hover:text-white transition-colors group"
                            onClick={() => setShowPasswordChange(!showPasswordChange)}
                        >
                            <div className="p-1.5 bg-primary-yello/10 rounded-md group-hover:bg-primary-yello/20 transition-colors">
                                <FaLock className="text-sm" />
                            </div>
                            <span className="font-medium">
                                {showPasswordChange ? 'Cancel Password Change' : 'Change Password'}
                            </span>
                            <div className="h-px flex-grow bg-gradient-to-r from-primary-yello/30 to-transparent max-w-[100px]"></div>
                        </button>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="pt-4">
                        <button 
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary-yello to-amber-600 text-white p-3.5 rounded-lg font-semibold transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-yello focus:ring-opacity-50 flex items-center justify-center gap-2 relative overflow-hidden shadow-lg"
                        >
                            {/* Button background animation */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-yello to-amber-600 opacity-0 hover:opacity-100 transition-opacity"></div>
                            
                            {/* Button content */}
                            <div className="relative flex items-center justify-center gap-2">
                                <FaCheck /> Save Changes
                            </div>
                        </button>
                    </div>
                </form>

                {/* Password Change Form - enhanced UI but same logic */}
                {showPasswordChange && (
                    <div className="px-6 pb-6">
                        <div className="bg-primary-main/30 backdrop-blur-sm rounded-lg p-5 border border-primary-yello/20">
                            <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                                <svg className="h-5 w-5 text-primary-yello" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                                    <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    <circle cx="12" cy="16" r="1" fill="currentColor"/>
                                </svg>
                                Password Security
                            </h3>
                            
                            <form onSubmit={handlePasswordChnage} className="space-y-4">
                                {/* Current Password */}
                                <div className="space-y-2">
                                    <label className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                                        <svg className="h-4 w-4 text-primary-yello/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                                            <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                        </svg>
                                        Current Password
                                    </label>
                                    <div className="relative group">
                                        <input 
                                            type={passwordVisibility.current ? "text" : "password"}
                                            onChange={(e)=>setPassswordSetting(prev=>({...prev,currentOne:e.target.value}))}
                                            className="p-3 pr-10 bg-primary-main/70 text-white rounded-lg w-full border border-primary-yello/30 focus:border-primary-yello/70 focus:outline-none focus:ring-1 focus:ring-primary-yello transition-all duration-300" 
                                            placeholder="Current password"
                                        />
                                        <button 
                                            type="button"
                                            onClick={() => togglePasswordVisibility('current')}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary-yello transition-colors"
                                        >
                                            {passwordVisibility.current ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                        <div className="absolute inset-0 rounded-lg border border-primary-yello/0 group-focus-within:border-primary-yello/10 pointer-events-none"></div>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* New Password */}
                                    <div className="space-y-2">
                                        <label className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                                            <svg className="h-4 w-4 text-primary-yello/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                                                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M12 16V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                            </svg>
                                            New Password
                                        </label>
                                        <div className="relative group">
                                            <input 
                                                type={passwordVisibility.new ? "text" : "password"}
                                                onChange={(e)=>setPassswordSetting(prev=>({...prev,newOne:e.target.value}))}
                                                className="p-3 pr-10 bg-primary-main/70 text-white rounded-lg w-full border border-primary-yello/30 focus:border-primary-yello/70 focus:outline-none focus:ring-1 focus:ring-primary-yello transition-all duration-300" 
                                                placeholder="New password"
                                                value={passwordSetting.newOne}
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => togglePasswordVisibility('new')}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary-yello transition-colors"
                                            >
                                                {passwordVisibility.new ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                            <div className="absolute inset-0 rounded-lg border border-primary-yello/0 group-focus-within:border-primary-yello/10 pointer-events-none"></div>
                                        </div>
                                    </div>
                                    
                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <label className="text-gray-300 text-sm font-medium flex items-center gap-1.5">
                                            <svg className="h-4 w-4 text-primary-yello/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                                                <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                                <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Confirm Password
                                        </label>
                                        <div className="relative group">
                                            <input 
                                                type={passwordVisibility.confirm ? "text" : "password"}
                                                onChange={(e)=>setPassswordSetting(prev=>({...prev,confirmedOne:e.target.value}))}
                                                className={`p-3 pr-10 bg-primary-main/70 text-white rounded-lg w-full border focus:outline-none focus:ring-1 transition-all duration-300 ${
                                                    passwordSetting.confirmedOne 
                                                        ? (passwordStrength.match 
                                                            ? 'border-green-500/50 focus:border-green-500/70 focus:ring-green-500' 
                                                            : 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500')
                                                        : 'border-primary-yello/30 focus:border-primary-yello/70 focus:ring-primary-yello'
                                                }`}
                                                placeholder="Confirm password"
                                                value={passwordSetting.confirmedOne}
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => togglePasswordVisibility('confirm')}
                                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-primary-yello transition-colors"
                                            >
                                                {passwordVisibility.confirm ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                            {passwordSetting.confirmedOne && (
                                                <div className="absolute right-10 inset-y-0 flex items-center">
                                                    {passwordStrength.match 
                                                        ? <FaCheckCircle className="text-green-400" /> 
                                                        : <FaTimes className="text-red-400" />
                                                    }
                                                </div>
                                            )}
                                            <div className="absolute inset-0 rounded-lg border border-primary-yello/0 group-focus-within:border-primary-yello/10 pointer-events-none"></div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Password Strength Indicators */}
                                <div className="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
                                    <h4 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                                        <svg className="h-4 w-4 text-primary-yello/70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        Password Requirements
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className={`flex items-center gap-2 text-xs ${passwordStrength.length ? 'text-green-400' : 'text-gray-400'}`}>
                                            {passwordStrength.length ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                            <span>At least 8 characters</span>
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs ${passwordStrength.lowercase ? 'text-green-400' : 'text-gray-400'}`}>
                                            {passwordStrength.lowercase ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                            <span>One lowercase letter</span>
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs ${passwordStrength.uppercase ? 'text-green-400' : 'text-gray-400'}`}>
                                            {passwordStrength.uppercase ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                            <span>One uppercase letter</span>
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs ${passwordStrength.number ? 'text-green-400' : 'text-gray-400'}`}>
                                            {passwordStrength.number ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                            <span>One number</span>
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs ${passwordStrength.special ? 'text-green-400' : 'text-gray-400'}`}>
                                            {passwordStrength.special ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                            <span>One special character</span>
                                        </div>
                                        <div className={`flex items-center gap-2 text-xs ${passwordStrength.match ? 'text-green-400' : 'text-gray-400'}`}>
                                            {passwordStrength.match ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                            <span>Passwords match</span>
                                        </div>
                                    </div>
                                    
                                    {/* Password Strength Bar */}
                                    <div className="mt-3">
                                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full rounded-full transition-all duration-500 ${
                                                    Object.values(passwordStrength).filter(Boolean).length <= 2 
                                                        ? 'bg-red-500 w-1/4' 
                                                        : Object.values(passwordStrength).filter(Boolean).length <= 4 
                                                            ? 'bg-yellow-500 w-1/2' 
                                                            : Object.values(passwordStrength).filter(Boolean).length === 5 
                                                                ? 'bg-blue-500 w-3/4' 
                                                                : 'bg-green-500 w-full'
                                                }`}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs mt-1 text-gray-400">
                                            <span>Weak</span>
                                            <span>Medium</span>
                                            <span>Strong</span>
                                            <span>Very Strong</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Update Password Button */}
                                <button 
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary-yello to-amber-600 text-white p-3.5 rounded-lg font-semibold transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-yello focus:ring-opacity-50 flex items-center justify-center gap-2 relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-yello to-amber-600 opacity-0 hover:opacity-100 transition-opacity"></div>
                                    <div className="relative flex items-center justify-center gap-2">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5 10.5V6.5C16.5 4.01472 14.4853 2 12 2C9.51472 2 7.5 4.01472 7.5 6.5V10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <rect x="4" y="10.5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <path d="M12 14.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        <span>Update Password</span>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Notification */}
            {notification.show && (
                <div className={`fixed bottom-4 right-4 bg-gradient-to-r from-primary-second to-primary-main px-5 py-4 rounded-lg shadow-xl border-l-4 border-primary-yello flex flex-col z-50 ${notification.isClosing ? 'animate-slideDown' : 'animate-slideUp'} max-w-sm backdrop-blur-sm`}>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary-yello/20 p-2 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-yello" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-white">{notification.message}</span>
                    </div>
                    <div className="w-full h-1 bg-gray-700/50 mt-3 rounded-full overflow-hidden">
                        <div className="h-full bg-primary-yello animate-progress rounded-full"></div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes slideDown {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(100%); opacity: 0; }
                }
                
                @keyframes glass-sheen {
                    0% { transform: translateX(-100%) skewX(-45deg); }
                    100% { transform: translateX(200%) skewX(-45deg); }
                }
                
                @keyframes glass-sheen-fast {
                    0% { transform: translateX(-100%) skewX(-45deg); }
                    100% { transform: translateX(200%) skewX(-45deg); }
                }
                
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 0.2; }
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
                
                @keyframes float-around {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(20px, 20px); }
                    50% { transform: translate(0, 40px); }
                    75% { transform: translate(-20px, 20px); }
                    100% { transform: translate(0, 0); }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
                
                @keyframes draw-check {
                    0% { stroke-dasharray: 0, 100; }
                    100% { stroke-dasharray: 100, 100; }
                }
                
                @keyframes draw-x {
                    0% { stroke-dasharray: 0, 100; stroke-dashoffset: 0; }
                    100% { stroke-dasharray: 100, 100; stroke-dashoffset: 0; }
                }
                
                @keyframes draw-i {
                    0% { stroke-dasharray: 0, 100; }
                    100% { stroke-dasharray: 100, 100; }
                }
                
                .animate-progress {
                    animation: progress 4s linear forwards;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out forwards;
                }
                
                .animate-slideDown {
                    animation: slideDown 0.3s ease-in forwards;
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
                
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                
                .animate-shake {
                    animation: shake 0.5s ease-in-out;
                }
                
                .animate-draw-check {
                    stroke-dasharray: 100, 100;
                    stroke-dashoffset: 0;
                    animation: draw-check 0.8s ease-in-out forwards;
                }
                
                .animate-draw-x {
                    stroke-dasharray: 100, 100;
                    stroke-dashoffset: 0;
                    animation: draw-x 0.8s ease-in-out forwards;
                }
                
                .animate-draw-i {
                    stroke-dasharray: 100, 100;
                    stroke-dashoffset: 0;
                    animation: draw-i 0.8s ease-in-out forwards;
                }
            `}</style>
        </div>
    )
}

export default EditProfile