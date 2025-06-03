import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from './assets/LOGO.png'
import { FaUser, FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { IoMdCalendar } from "react-icons/io";
import { TbNotes } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import ReactDOM from 'react-dom';

function NavBar() {
    // Keeping all the existing logic
    const navigate = useNavigate()
    const [fname, setFname] = useState("")
    const [mail, setMail] = useState("")
    const [lname, setLname] = useState("")
    const [username, setUsername] = useState("")
    const [modal, setModal] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 })
    const dataValue = localStorage.getItem("userData")
    const token = jwtDecode(dataValue)

    const handleLogout = () => {
        localStorage.removeItem("userData")
        navigate("/")
    }

    const navigateToProfile = () => {
        navigate(`/EditProfile/${token.userName}`)
        setModal(false) // Close modal when navigating
    }

    // Update button position when modal opens
    const handleProfileClick = () => {
        if (!modal) {
            const button = document.getElementById('profile-button');
            if (button) {
                const rect = button.getBoundingClientRect();
                setButtonPosition({
                    top: rect.bottom + window.scrollY,
                    right: window.innerWidth - rect.right
                });
            }
        }
        setModal(!modal);
    }

    useEffect(() => {
        try {
            if (dataValue) {
                setFname(token.firstName)
                setMail(token.email)
                setLname(token.lastname)
                setUsername(token.userName)
            }
        } catch (error) {
            console.error("Error decoding token:", error)
        }
    }, [dataValue, token])

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            const profileButton = document.getElementById('profile-button');
            const dropdown = document.getElementById('profile-dropdown');
            
            if (modal && profileButton && dropdown && 
                !profileButton.contains(event.target) && 
                !dropdown.contains(event.target)) {
                setModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [modal]);

    return (
        <div className='bg-gradient-to-r from-primary-second/90 to-slate-900/90 backdrop-blur-lg p-4 mt-4 rounded-xl lg:w-[1080px] w-7xl h-auto flex flex-row items-center justify-between gap-4 border border-primary-yello/10 shadow-lg transition-all duration-300 hover:shadow-primary-yello/15 relative overflow-hidden z-10'>
            {/* Enhanced decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Glass shimmer effect */}
                <div className="absolute -inset-[200%] opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
                
                {/* Glowing border lines */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
                
                {/* Glowing orbs */}
                <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-32 h-32 rounded-full bg-primary-yello blur-3xl opacity-5"></div>
                <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-32 h-32 rounded-full bg-primary-yello blur-3xl opacity-5"></div>
                
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxQTFDMjMiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiMxRTI0MkIiIGZpbGwtb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6TTMwIDBoMzB2MzBIMzB6IiBmaWxsPSIjMUUyNDJCIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')] opacity-3"></div>
                
                {/* Small decorative particles */}
                {[...Array(5)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute rounded-full bg-primary-yello/30"
                        style={{
                            width: `${Math.random() * 3 + 1}px`,
                            height: `${Math.random() * 3 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5,
                            animation: `pulse ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Enhanced Logo with premium animation */}
            <NavLink to='/Notes' className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center gap-3 transform transition-all duration-300 group-hover:scale-105">

                    <img src={logo} className='h-5' alt="" />
                   
                    <div className="hidden sm:block">
                        <h3 className="text-white text-sm font-bold mt-2">
                            <span className="text-primary-yello text-sm">Notes</span>Manager
                        </h3>
                        <div className="h-0.5 w-3/4 bg-gradient-to-r from-primary-yello to-transparent"></div>
                    </div>
                </div>
            </NavLink>

            {/* Enhanced Desktop Navigation Links */}
            <div className="hidden md:flex flex-row items-center gap-4 lg:gap-12 text-white">
                <NavLink
                    to='/Notes'
                    className={({ isActive }) =>
                        `flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 relative group
                        ${isActive 
                            ? 'text-primary-yello bg-primary-yello/10 border-b border-primary-yello/30' 
                            : 'hover:text-primary-yello hover:bg-primary-yello/5'}`
                    }
                >
                    <TbNotes className="text-lg" />
                    <span className="font-medium">NOTES</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-yello to-transparent group-hover:w-full transition-all duration-300"></span>
                </NavLink>

                <NavLink
                    to='/Calendar'
                    className={({ isActive }) =>
                        `flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 relative group
                        ${isActive 
                            ? 'text-primary-yello bg-primary-yello/10 border-b border-primary-yello/30' 
                            : 'hover:text-primary-yello hover:bg-primary-yello/5'}`
                    }
                >
                    <IoMdCalendar className="text-lg" />
                    <span className="font-medium">CALENDAR</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-yello to-transparent group-hover:w-full transition-all duration-300"></span>
                </NavLink>

                <NavLink
                    to='/policies'
                    className={({ isActive }) =>
                        `flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 relative group
                        ${isActive 
                            ? 'text-primary-yello bg-primary-yello/10 border-b border-primary-yello/30' 
                            : 'hover:text-primary-yello hover:bg-primary-yello/5'}`
                    }
                >
                    <IoShieldCheckmarkOutline className="text-lg" />
                    <span className="font-medium">POLICIES</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-yello to-transparent group-hover:w-full transition-all duration-300"></span>
                </NavLink>
            </div>

            

            {/* Mobile Menu Button - Keeping the existing logic but enhancing the UI */}
            <button
                className="md:hidden bg-primary-yello/10 text-primary-yello p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-yello border border-primary-yello/30 hover:bg-primary-yello/20 transition-all duration-300"
                onClick={() => setMobileMenu(!mobileMenu)}
            >
                {mobileMenu ? <HiOutlineX className="text-xl" /> : <HiOutlineMenu className="text-xl" />}
            </button>

            {/* Mobile Navigation Menu - Keeping existing markup */}
            {mobileMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-primary-second bg-opacity-95 backdrop-blur-lg rounded-lg shadow-lg border border-gray-700/30 z-50 p-2 md:hidden animate-fadeIn">
                    <NavLink
                        to='/Notes'
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-3 rounded-lg my-1 transition-all duration-300
                ${isActive ? 'bg-gray-800/50 text-primary-yello' : 'hover:bg-gray-800/30'}`
                        }
                        onClick={() => setMobileMenu(false)}
                    >
                        <TbNotes className="text-xl" />
                        <span>NOTES</span>
                    </NavLink>

                    <NavLink
                        to='/Calendar'
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-3 rounded-lg my-1 transition-all duration-300
                ${isActive ? 'bg-gray-800/50 text-primary-yello' : 'hover:bg-gray-800/30'}`
                        }
                        onClick={() => setMobileMenu(false)}
                    >
                        <IoMdCalendar className="text-xl" />
                        <span>CALENDAR</span>
                    </NavLink>

                    <NavLink
                        to='/policies'
                        className={({ isActive }) =>
                            `flex items-center gap-2 p-3 rounded-lg my-1 transition-all duration-300
                ${isActive ? 'bg-gray-800/50 text-primary-yello' : 'hover:bg-gray-800/30'}`
                        }
                        onClick={() => setMobileMenu(false)}
                    >
                        <IoShieldCheckmarkOutline className="text-xl" />
                        <span>POLICIES</span>
                    </NavLink>
                </div>
            )}

            {/* Enhanced Profile Button */}
            <div className="relative">
                <button
                    id="profile-button"
                    onClick={handleProfileClick}
                    className="p-2.5 rounded-full bg-gradient-to-r from-primary-yello/20 to-amber-600/20 hover:from-primary-yello/30 hover:to-amber-600/30 transition-all duration-300 group border border-primary-yello/30 hover:border-primary-yello/60 shadow-sm hover:shadow-md hover:shadow-primary-yello/10"
                >
                    <FaUser className="text-primary-yello text-xl group-hover:scale-110 transition-transform duration-300" />
                </button>
                
                {/* Subtle pulse animation around the button when dropdown is open */}
                {modal && (
                    <div className="absolute inset-0 rounded-full border-2 border-primary-yello/30 animate-ping-slow pointer-events-none"></div>
                )}
            </div>

            {/* Profile Dropdown Menu - Same as before, keeping all functionality */}
            {modal && ReactDOM.createPortal(
                <div 
                    id="profile-dropdown"
                    className="fixed z-[9999] shadow-2xl animate-fadeIn"
                    style={{
                        top: `${buttonPosition.top + 10}px`,
                        right: `${buttonPosition.right + 10}px`,
                    }}
                >
                    <div className="bg-primary-main bg-opacity-95 backdrop-blur-md rounded-xl w-[280px] border border-gray-700/30 overflow-hidden transform transition-all duration-300">
                        <div className="p-4 flex flex-col gap-3">
                            {/* User info with gold accent */}
                            <div className="relative bg-gradient-to-r from-primary-second to-slate-900 rounded-lg p-4 overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-primary-yello/10 rounded-full blur-xl"></div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-primary-yello/20 p-3 rounded-full border border-primary-yello/30">
                                        <FaUser className="text-primary-yello text-xl" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">{fname} {lname}</p>
                                        <p className="text-primary-yello text-sm">@{username}</p>
                                    </div>
                                </div>
                                <p className="text-gray-300 text-sm mt-2 bg-gray-800/40 p-2 rounded-md break-words overflow-hidden">
                                    {mail}
                                </p>
                            </div>

                            {/* Enhanced Buttons */}
                            <button
                                onClick={navigateToProfile}
                                className="bg-gray-800/70 hover:bg-primary-yello text-white py-2 px-4 rounded-lg mt-1 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                            >
                                <span className="absolute inset-0 w-0 bg-primary-yello transition-all duration-500 group-hover:w-full"></span>
                                <FaUser className="text-sm relative z-10" />
                                <span className="font-semibold relative z-10">EDIT PROFILE</span>
                            </button>

                            <button
                                onClick={handleLogout}
                                className="bg-gray-800/70 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
                            >
                                <span className="absolute inset-0 w-0 bg-red-600 transition-all duration-500 group-hover:w-full"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="font-semibold relative z-10">LOGOUT</span>
                            </button>
                        </div>
                        
                        {/* Decorative footer */}
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary-yello to-transparent opacity-50"></div>
                    </div>
                </div>,
                document.body
            )}

            {/* Add animations */}
            <style jsx>{`
                @keyframes glass-sheen {
                    0% { transform: translateX(-100%) skewX(-45deg); }
                    100% { transform: translateX(200%) skewX(-45deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.7; }
                    50% { transform: scale(1.05); opacity: 0.9; }
                }
                
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 0.8; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                    100% { transform: scale(1); opacity: 0; }
                }
                
                .animate-glass-sheen {
                    animation: glass-sheen 8s ease-in-out infinite;
                }
                
                .animate-ping-slow {
                    animation: ping-slow 2s ease-in-out infinite;
                }
            `}</style>
        </div>
    )
}

export default NavBar