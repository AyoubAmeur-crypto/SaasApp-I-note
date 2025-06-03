import React, { useEffect, useState ,useRef} from 'react'
import logo from './assets/LOGO.png'
import NavBar from './NavBar'
import {jwtDecode} from 'jwt-decode'
import PersonalNotes from './PersonalNotes'
import { MdEditNote, MdOutlineNoteAlt, MdStarOutline, MdStar } from "react-icons/md";
import { RiDragDropFill } from "react-icons/ri";
import { FaRegLightbulb, FaCheckCircle, FaBrain, FaFeatherAlt } from "react-icons/fa";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { MdDragIndicator } from "react-icons/md";

import './animation.css'
import Footer from './Footer'

function Notes() {
  const [name, setName] = useState("")
  const [modal, setModal] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startdate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [NoteError, setNoteError] = useState("")
  const [refreshNote, setRefreshNote] = useState(0)
  const [notification, setNotification] = useState({message:'', isOpening:false, isClosing:false})
  const navigate = useNavigate()   
  // Removed mouse position tracking
 
  useEffect(() => {
    try {
      const dataValue = localStorage.getItem("userData")
      if(dataValue){
        const token = jwtDecode(dataValue)
        setName(token.firstName)
      }
    } catch (error) {
      console.log("smtg happende due to this", error);
    }
  }, [])
  
  const token = localStorage.getItem("userData")
  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !startdate || !endDate) {
      setNoteError("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/addNote",
        { title, description, startdate, endDate },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Note created successfully");
      
      // Close modal and update UI
      setRefreshNote(prev => prev + 1);
      setModal(false);
      
      // Reset form fields
      setTitle("");
      setDescription("");
      setStartDate(null);
      setEndDate(null);
      setNoteError("");
      
      // Show notification
      setNotification({
        isOpening: true,
        isClosing: false,
        message: 'Note Added Successfully'
      });
      
      // Start the exit animation after 3.7 seconds
      setTimeout(() => {
        setNotification(prev => ({
          ...prev,
          isClosing: true
        }));
      }, 3700);
      
      // Complete hide after animation finishes (4 seconds)
      setTimeout(() => {
        setNotification({
          isOpening: false,
          isClosing: false,
          message: ''
        });
      }, 4000);
      
    } catch (error) {
      console.log("Error occurred:", error);
      
      if (error.response && error.response.data) {
        setNoteError(error.response.data);
        
        // Show error notification
        setNotification({
          isOpening: true,
          isClosing: false,
          message: `Error: ${error.response.data}`
        });
        
        // Start the exit animation after 3.7 seconds
        setTimeout(() => {
          setNotification(prev => ({
            ...prev,
            isClosing: true
          }));
        }, 3700);
        
        // Complete hide after animation finishes
        setTimeout(() => {
          setNotification({
            isOpening: false,
            isClosing: false,
            message: ''
          });
        }, 4000);
      }
    }
  }
  
  return (
    <div className='w-full min-h-screen relative overflow-hidden'>
      {/* Premium Dynamic Background Elements - REMOVED MOUSE TRACKING */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Gradient Background with depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-main to-[#0A101F] opacity-98"></div>
        
        {/* Static gradient blobs - NO MOUSE TRACKING */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary-yello/5 blur-[120px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px]"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxQTFDMjMiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMzBoMzB2MzBIMHoiIGZpbGw9IiMxRTI0MkIiIGZpbGwtb3BhY2l0eT0iLjQiLz48cGF0aCBkPSJNMCAwaDMwdjMwSDB6TTMwIDBoMzB2MzBIMzB6IiBmaWxsPSIjMUUyNDJCIiBmaWxsLW9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')] opacity-5"></div>
        
        {/* Animated Particles - Premium Style */}
        {[...Array(30)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              background: i % 3 === 0 ? "#FFD700" : i % 3 === 1 ? "#334155" : "#1E293B",
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              animation: `pulse ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s, float ${Math.random() * 15 + 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Static light beams - NO MOUSE TRACKING */}
        <div className="absolute h-[200%] w-[5px] bg-gradient-to-b from-transparent via-primary-yello/10 to-transparent rotate-[25deg] left-1/3 top-[-50%] animate-beam-sweep"></div>
        <div className="absolute h-[200%] w-[2px] bg-gradient-to-b from-transparent via-primary-yello/5 to-transparent rotate-[-15deg] right-1/3 top-[-50%] animate-beam-sweep-delay"></div>
        
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
      </div>

      <div className="flex flex-col items-center w-7xl p-3 relative z-10">
        <NavBar/>
        
        {/* Enhanced Hero Section with Premium Glass Effect */}
        <div className="bg-primary-second/40 backdrop-blur-xl rounded-xl w-full lg:w-[1080px] md:w-[720px] sm:w-[380px] mt-[30px] flex flex-col lg:flex-row items-center gap-6 p-6 border border-white/5 shadow-2xl shadow-black/20 transition-all duration-500 hover:shadow-primary-yello/10 relative overflow-hidden">
          {/* Glass sheen effect */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <div 
              className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"
            ></div>
          </div>
          
          {/* Left Section: Premium Branding */}
          <div className="w-full lg:w-[50%] flex flex-col lg:p-5 relative z-10">
            <a href="">
              <img
                src={logo}
                alt="Logo"
                className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[210px] p-3 animate-float-slow"
                style={{ animationDuration: '6s' }}
              />
            </a>
            
            <div className="relative mt-4 p-5 rounded-lg border border-white/10 bg-gradient-to-br from-primary-main/60 to-transparent backdrop-blur-sm group overflow-hidden hover:shadow-lg hover:shadow-primary-yello/20 transition-all duration-500">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary-yello/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary-yello/10 rounded-tr-full transform -translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700"></div>
              
              <h1 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold relative z-10">
                Great ideas start with <br />
                <span className="text-primary-yello animate-pulse-text relative">
                  a single note.
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary-yello/50"></span>
                </span> 
                <span className="block mt-2">Capture everything, forget nothing.</span>
              </h1>
              
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary-yello/30 to-transparent transform translate-y-1 group-hover:translate-y-0 transition-transform duration-700"></div>
            </div>

            {/* Premium Action Button */}
            <div className="flex flex-col gap-4 mt-6">
              <button onclick={()=>{navigate("/PersonalNotes")}} className="bg-gradient-to-r from-primary-yello to-yellow-600 text-white text-lg font-semibold p-3 rounded-lg relative overflow-hidden group transform transition-all duration-300 hover:shadow-lg hover:shadow-primary-yello/30 hover:-translate-y-1" >
                <span className="relative z-10 flex items-center justify-center">
                  <FaRegLightbulb className="mr-2" /> Explore Your Notes
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>

          {/* Right Section: Enhanced Premium SVG Illustration */}
          <div className="relative hidden sm:block lg:w-1/2">
            <svg 
              width="100%" 
              height="380" 
              viewBox="0 0 500 380" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg" 
              className="relative z-10 animate-float"
              style={{ animationDuration: '8s' }}
            >
              {/* SVG content remains the same */}
              {/* Decorative Circles */}
              <circle cx="250" cy="190" r="160" fill="#1E293B" opacity="0.4" />
              <circle cx="250" cy="190" r="140" stroke="#FFD700" strokeWidth="1" strokeDasharray="10 5" opacity="0.6" className="animate-rotate-slow" />
              <circle cx="250" cy="190" r="110" stroke="#FFD700" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.3" className="animate-rotate-slow-reverse" />
              
              {/* Decorative Paths */}
              <path d="M250 50 L250 70" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" />
              <path d="M250 310 L250 330" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" />
              <path d="M110 190 L130 190" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" />
              <path d="M370 190 L390 190" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" />
              <path d="M150 90 L170 110" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="2 2" />
              <path d="M330 270 L350 290" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="2 2" />
              <path d="M150 290 L170 270" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="2 2" />
              <path d="M330 110 L350 90" stroke="#FFD700" strokeWidth="0.5" strokeLinecap="round" strokeDasharray="2 2" />
              
              {/* Central Note with Glass Effect */}
              <g className="animate-float-slow" style={{ transformOrigin: 'center', animationDuration: '6s' }}>
                {/* Main Note Card */}
                <rect x="170" y="120" width="160" height="140" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1" />
                <rect x="170" y="120" width="160" height="140" rx="8" fill="url(#noteGradient)" fillOpacity="0.5" />
                
                {/* Title Bar */}
                <rect x="180" y="130" width="140" height="30" rx="4" fill="#FFD700" opacity="0.9" />
                <text x="250" y="150" fontFamily="Arial" fontSize="12" fill="#0F172A" textAnchor="middle" fontWeight="bold">PREMIUM NOTE</text>
                
                {/* Content Lines */}
                <rect x="180" y="170" width="140" height="6" rx="2" fill="#334155" />
                <rect x="180" y="185" width="140" height="6" rx="2" fill="#334155" />
                <rect x="180" y="200" width="140" height="6" rx="2" fill="#334155" />
                <rect x="180" y="215" width="80" height="6" rx="2" fill="#334155" />
                
                {/* Save Button */}
                <rect x="270" y="230" width="50" height="20" rx="4" fill="#FFD700" opacity="0.8">
                  <animate attributeName="opacity" values="0.7;0.9;0.7" dur="3s" repeatCount="indefinite" />
                </rect>
                <text x="295" y="244" textAnchor="middle" fill="#0F172A" fontSize="10" fontWeight="bold">SAVE</text>
              </g>
              
              {/* Floating Notes */}
              <g className="animate-float-reverse" style={{ transformOrigin: 'center', animationDelay: '1s', animationDuration: '7s' }}>
                <rect x="110" y="100" width="100" height="80" rx="6" fill="#334155" opacity="0.7" transform="rotate(-15, 110, 100)" />
                <rect x="120" y="110" width="80" height="10" rx="2" fill="#FFD700" opacity="0.6" transform="rotate(-15, 110, 100)" />
                <rect x="120" y="130" width="80" height="6" rx="1" fill="#1E293B" transform="rotate(-15, 110, 100)" />
                <rect x="120" y="145" width="80" height="6" rx="1" fill="#1E293B" transform="rotate(-15, 110, 100)" />
                <rect x="120" y="160" width="50" height="6" rx="1" fill="#1E293B" transform="rotate(-15, 110, 100)" />
                <circle cx="135" cy="120" r="12" fill="#0F172A" transform="rotate(-15, 110, 100)" />
                <path d="M135 116 L135 124 M131 120 L139 120" stroke="#FFD700" strokeWidth="1.5" transform="rotate(-15, 110, 100)" />
              </g>
              
              <g className="animate-float-slow" style={{ transformOrigin: 'center', animationDelay: '0.5s', animationDuration: '8s' }}>
                <rect x="320" y="80" width="100" height="80" rx="6" fill="#334155" opacity="0.7" transform="rotate(10, 370, 80)" />
                <rect x="330" y="90" width="80" height="10" rx="2" fill="#FFD700" opacity="0.6" transform="rotate(10, 370, 80)" />
                <rect x="330" y="110" width="80" height="6" rx="1" fill="#1E293B" transform="rotate(10, 370, 80)" />
                <rect x="330" y="125" width="80" height="6" rx="1" fill="#1E293B" transform="rotate(10, 370, 80)" />
                <rect x="330" y="140" width="50" height="6" rx="1" fill="#1E293B" transform="rotate(10, 370, 80)" />
                <circle cx="390" cy="100" r="12" fill="#0F172A" transform="rotate(10, 370, 80)" />
                <path d="M390 96 C387 96, 387 100, 390 100 C393 100, 393 104, 390 104" stroke="#FFD700" strokeWidth="1.5" transform="rotate(10, 370, 80)" />
              </g>
              
              <g className="animate-float" style={{ transformOrigin: 'center', animationDelay: '1.5s', animationDuration: '9s' }}>
                <rect x="320" y="220" width="100" height="80" rx="6" fill="#334155" opacity="0.7" transform="rotate(5, 370, 260)" />
                <rect x="330" y="230" width="80" height="10" rx="2" fill="#FFD700" opacity="0.6" transform="rotate(5, 370, 260)" />
                <rect x="330" y="250" width="80" height="6" rx="1" fill="#1E293B" transform="rotate(5, 370, 260)" />
                <rect x="330" y="265" width="80" height="6" rx="1" fill="#1E293B" transform="rotate(5, 370, 260)" />
                <rect x="330" y="280" width="50" height="6" rx="1" fill="#1E293B" transform="rotate(5, 370, 260)" />
                <circle cx="390" cy="240" r="12" fill="#0F172A" transform="rotate(5, 370, 260)" />
                <path d="M387 236 L393 244 M387 244 L393 236" stroke="#FFD700" strokeWidth="1.5" transform="rotate(5, 370, 260)" />
              </g>
              
              <g className="animate-float-reverse" style={{ transformOrigin: 'center', animationDelay: '2s', animationDuration: '7.5s' }}>
                <rect x="100" y="220" width="100" height="80" rx="6" fill="#334155" opacity="0.7" transform="rotate(-8, 100, 260)" />
                <rect x="110" y="230" width="80" height="10" rx="2" fill="#FFD700" opacity="0.6" transform="rotate(-8, 100, 260)" />
                <rect x="110" y="250" width="80" height="6" rx="1" fill="#1E293B" transform="rotate(-8, 100, 260)" />
                <rect x="110" y="265" width="80" height="6" rx="1" fill="#1E293B" transform="rotate(-8, 100, 260)" />
                <rect x="110" y="280" width="50" height="6" rx="1" fill="#1E293B" transform="rotate(-8, 100, 260)" />
                <circle cx="170" cy="240" r="12" fill="#0F172A" transform="rotate(-8, 100, 260)" />
                <path d="M170 240 M170 235 L170 245 M165 240 L175 240" stroke="#FFD700" strokeWidth="1.5" transform="rotate(-8, 100, 260)" />
              </g>
              
              {/* Moving pen */}
              <g className="animate-pen-write" style={{ transformOrigin: '250px 190px' }}>
                <path d="M290 200 L370 140" stroke="#FFD700" strokeWidth="1" strokeDasharray="5 3" />
                <g transform="translate(370, 140) rotate(-45)">
                  <rect x="0" y="0" width="30" height="8" rx="2" fill="#334155" />
                  <rect x="0" y="0" width="10" height="8" rx="2" fill="#FFD700" />
                  <path d="M30 4 L36 0 L36 8 Z" fill="#334155" />
                </g>
              </g>
              
              {/* Animated Feature Icons */}
              <g className="animate-pulse-slow" style={{ animationDuration: '4s' }}>
                <circle cx="150" cy="190" r="16" fill="#0F172A" stroke="#FFD700" strokeWidth="1" />
                <path d="M143 190 L150 197 L158 185" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              
              <g className="animate-pulse-slow" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                <circle cx="350" cy="190" r="16" fill="#0F172A" stroke="#FFD700" strokeWidth="1" />
                <path d="M345 185 L350 190 L355 185 M345 195 L350 190 L355 195" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              
              <g className="animate-pulse-slow" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
                <circle cx="250" cy="90" r="16" fill="#0F172A" stroke="#FFD700" strokeWidth="1" />
                <path d="M250 85 L250 95 M245 90 L255 90" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              
              <g className="animate-pulse-slow" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}>
                <circle cx="250" cy="290" r="16" fill="#0F172A" stroke="#FFD700" strokeWidth="1" />
                <path d="M245 285 L255 295 M245 295 L255 285" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              
              {/* Binary data effect in background */}
              {[...Array(40)].map((_, i) => (
                <text 
                  key={i}
                  x={130 + Math.random() * 240} 
                  y={100 + Math.random() * 180} 
                  fill="#334155" 
                  fontSize="8"
                  opacity={0.2 + Math.random() * 0.2}
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </text>
              ))}
              
              {/* Gradients */}
              <defs>
                <linearGradient id="noteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.05" />
                  <stop offset="50%" stopColor="#334155" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#1E293B" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Rest of the component remains the same */}
        <div className="w-full lg:w-[1080px] md:w-[720px] sm:w-[380px] mt-8 bg-primary-second/30 backdrop-blur-lg border border-white/5 rounded-xl p-5 shadow-lg transform transition-all duration-500 hover:shadow-primary-yello/20 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="relative group">
              <h1 className='text-white font-semibold text-2xl flex items-center'>
                Welcome Back, 
                <span className='bg-gradient-to-r from-primary-yello to-amber-500 ml-3 px-4 py-2 rounded-lg text-white relative overflow-hidden group-hover:shadow-lg group-hover:shadow-primary-yello/30 transition-all duration-500'>
                  {name}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white opacity-50 animate-slide-right"></span>
                </span>
              </h1>
              <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gradient-to-r from-primary-yello to-transparent group-hover:w-full transition-all duration-700"></div>
            </div>
            
            {/* Add Note Button with Premium Animation */}
            <button 
              className='bg-gradient-to-r from-primary-yello to-amber-500 p-3 flex items-center gap-2 text-white rounded-lg hover:shadow-lg hover:shadow-primary-yello/30 transition-all transform hover:-translate-y-1 relative overflow-hidden group'
              onClick={() => setModal(!modal)}
            >
              <MdEditNote className='text-xl text-white relative z-10' />
              <span className="relative z-10 font-semibold">Create Note</span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-primary-yello opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </button>
          </div>
        </div>

        {/* Notes Title Section with Animated Underline */}
        <div className="w-full lg:w-[1080px] md:w-[720px] sm:w-[380px] mt-8 flex justify-center">
          <div className="relative">
            <h1 className='text-white text-2xl font-bold bg-gradient-to-r from-primary-yello to-amber-500 p-3 px-8 rounded-lg shadow-lg shadow-primary-yello/20 animate-pulse-shadow flex items-center'>
              <MdOutlineNoteAlt className="mr-2 text-2xl" /> MY NOTES
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2/3 h-[2px] bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
          </div>
        </div>

        {/* The rest of your component... */}
        {/* Priority management section */}
        <div className="w-full lg:w-[1080px] md:w-[720px] sm:w-[380px] mt-8">
          <div className="bg-primary-second/30 backdrop-blur-lg rounded-xl p-6 border border-white/5 shadow-xl transition-all duration-500 hover:shadow-primary-yello/10 relative overflow-hidden">
            {/* Glass sheen effect */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
            </div>
            
            <h2 className="text-white text-xl font-semibold mb-4 relative inline-flex items-center">
              <FaBrain className="mr-2 text-primary-yello" />
              Priority Management
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-primary-yello to-transparent"></span>
            </h2>
            
            <div className="flex flex-row items-center gap-3 mb-6 bg-primary-main/50 p-4 rounded-xl border-l-4 border-primary-yello relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-yello/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <RiDragDropFill className='text-3xl text-primary-yello animate-bounce-gentle' />
              <div>
                <h2 className='text-white text-lg font-semibold'>
                  Organize by Priority Level
                </h2>
                <p className="text-gray-300 text-sm mt-1">
                  Drag & drop your notes between priority levels to organize your workflow efficiently.
                </p>
              </div>
            </div>
            
            {/* Priority levels grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* High Priority */}
              <div className="bg-gradient-to-br from-primary-yello to-amber-600 rounded-xl p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-yello/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-primary-main/90 rounded-lg p-4 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-primary-yello font-bold text-lg flex items-center">
                      <MdStar className="mr-2" /> High Priority
                    </h3>
                    <span className="bg-primary-yello text-primary-main text-xs font-bold px-2 py-1 rounded-full">URGENT</span>
                  </div>
                  <p className="text-gray-300 text-sm">Tasks requiring immediate attention and action</p>
                  <div className="w-full h-1 bg-gray-700/50 rounded-full mt-4 overflow-hidden">
                    <div className="h-full w-3/4 bg-primary-yello rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Medium Priority */}
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-primary-main/90 rounded-lg p-4 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-amber-500 font-bold text-lg flex items-center">
                      <MdStarOutline className="mr-2" /> Medium Priority
                    </h3>
                    <span className="bg-amber-500 text-primary-main text-xs font-bold px-2 py-1 rounded-full">IMPORTANT</span>
                  </div>
                  <p className="text-gray-300 text-sm">Tasks to complete soon but not immediately urgent</p>
                  <div className="w-full h-1 bg-gray-700/50 rounded-full mt-4 overflow-hidden">
                    <div className="h-full w-1/2 bg-amber-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Low Priority */}
              <div className="bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl p-1 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="bg-primary-main/90 rounded-lg p-4 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-gray-400 font-bold text-lg flex items-center">
                      <MdStarOutline className="mr-2" /> Low Priority
                    </h3>
                    <span className="bg-gray-500 text-primary-main text-xs font-bold px-2 py-1 rounded-full">STANDARD</span>
                  </div>
                  <p className="text-gray-300 text-sm">Tasks to complete when higher priorities are done</p>
                  <div className="w-full h-1 bg-gray-700/50 rounded-full mt-4 overflow-hidden">
                    <div className="h-full w-1/4 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modal */}
        {modal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center animate-fadeIn">
            <div className="bg-primary-second/90 backdrop-blur-xl w-[90%] max-w-lg rounded-xl p-6 border border-white/5 shadow-2xl shadow-black/20 animate-popIn relative overflow-hidden">
              {/* Glass sheen effect */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary-yello/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary-yello/10 rounded-tr-full"></div>
              
              {/* Modal header */}
              <div className="flex justify-between items-center border-b border-gray-700/50 pb-4 mb-5">
                <h2 className="text-white text-xl font-bold flex items-center gap-2">
                  <FaFeatherAlt className="text-primary-yello" />
                  Create New Note
                </h2>
                <button 
                  className="text-primary-yello hover:text-white transition-all transform hover:rotate-90 duration-300 w-8 h-8 rounded-full hover:bg-red-500/20 flex items-center justify-center"
                  onClick={() => setModal(false)}
                >
                  ✕
                </button>
              </div>
              
              {/* Form content */}
              <form className="flex flex-col gap-5" onSubmit={HandleSubmit}>
                {NoteError && (
                  <div
                    role="alert"
                    className="bg-red-900/30 backdrop-blur-sm border-l-4 border-red-500 text-red-100 p-3 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:translate-x-1 shadow-md"
                  >
                    <svg
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-5 w-5 flex-shrink-0 mr-2 text-red-400 animate-pulse"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="text-xs font-semibold">{NoteError}</p>
                  </div>
                )}
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70">
                    <MdOutlineNoteAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="p-3 pl-10 bg-primary-main/80 text-white rounded-lg w-full border-l-4 border-primary-yello focus:outline-none focus:ring-2 focus:ring-primary-yello/50 transition-all duration-300"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                </div>

                <div className="relative group">
                  <textarea
                    placeholder="Note Description"
                    onChange={(e) => setDescription(e.target.value)}
                    className="p-3 bg-primary-main/80 text-white rounded-lg w-full h-[180px] resize-none border-l-4 border-primary-yello focus:outline-none focus:ring-2 focus:ring-primary-yello/50 transition-all duration-300"
                  ></textarea>
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className="p-3 pl-10 bg-primary-main/80 text-white rounded-lg w-full border-l-4 border-primary-yello focus:outline-none focus:ring-2 focus:ring-primary-yello/50 appearance-none transition-all duration-300"
                      placeholder="Start Date"
                    />
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                    <label className="absolute -top-2 left-10 bg-primary-second px-2 text-xs text-primary-yello font-medium">Start Date</label>
                  </div>
                  
                  <div className="relative w-full group">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      onChange={(e) => setEndDate(e.target.value)}
                      className="p-3 pl-10 bg-primary-main/80 text-white rounded-lg w-full border-l-4 border-primary-yello focus:outline-none focus:ring-2 focus:ring-primary-yello/50 appearance-none transition-all duration-300"
                      placeholder="Due Date"
                    />
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                    <label className="absolute -top-2 left-10 bg-primary-second px-2 text-xs text-primary-yello font-medium">Due Date</label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-primary-yello text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary-yello/20 relative overflow-hidden group mt-4"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Note
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </form>
            </div>
          </div>
        )}
        
        {/* Notification */}
        {notification.isOpening && (
          <div className={`fixed bottom-4 right-4 bg-primary-second/80 backdrop-blur-xl px-4 py-3 rounded-lg shadow-lg border-l-4 border-primary-yello flex flex-col z-50 ${notification.isClosing ? 'animate-slideDown' : 'animate-slideUp'}`}>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-yello/20 flex items-center justify-center">
                <FaCheckCircle className="text-primary-yello" />
              </div>
              <span className="text-white">{notification.message}</span>
            </div>
            
            <div className="w-full h-1 bg-gray-700/50 mt-2 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary-yello to-amber-500 animate-progress rounded-full"></div>
            </div>
          </div>
        )}
        
        <PersonalNotes refreshNote={refreshNote} setRefreshNote={setRefreshNote} />
        <Footer/>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes pulse-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes pulse-shadow {
          0%, 100% { box-shadow: 0 0 10px 0 rgba(255, 215, 0, 0.2); }
          50% { box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.4); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pen-write {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-5px, 5px) rotate(-2deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          70% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes rotate-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes rotate-slow-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideDown {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        
        @keyframes progress {
          0% { width: 100%; }
          100% { width: 0%; }
        }
        
        @keyframes wave-slow {
          0% { transform: translateY(10px); }
          100% { transform: translateY(-10px); }
        }
        
        @keyframes glass-sheen {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(200%) skewX(-45deg); }
        }
        
        @keyframes beam-sweep {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
        
        @keyframes beam-sweep-delay {
          0% { opacity: 0.05; }
          50% { opacity: 0.2; }
          100% { opacity: 0.05; }
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
        
        .animate-pulse-text {
          animation: pulse-text 3s ease-in-out infinite;
        }
        
        .animate-pulse-shadow {
          animation: pulse-shadow 3s ease-in-out infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-slide-right {
          animation: slide-right 2s linear infinite;
        }
        
        .animate-pen-write {
          animation: pen-write 3s ease-in-out infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-popIn {
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .animate-rotate-slow {
          animation: rotate-slow 30s linear infinite;
        }
        
        .animate-rotate-slow-reverse {
          animation: rotate-slow-reverse 25s linear infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-in forwards;
        }
        
        .animate-progress {
          animation: progress 4s linear forwards;
        }
        
        .animate-wave-slow {
          animation: wave-slow 15s ease-in-out infinite alternate;
        }
        
        .animate-glass-sheen {
          animation: glass-sheen 8s ease-in-out infinite;
        }
        
        .animate-beam-sweep {
          animation: beam-sweep 8s ease-in-out infinite;
        }
        
        .animate-beam-sweep-delay {
          animation: beam-sweep-delay 8s ease-in-out 4s infinite;
        }
        
        /* Fix date input styling */
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
        }
        
        input[type="date"]::-webkit-inner-spin-button {
          display: none;
        }
        
        input[type="date"]::-webkit-clear-button {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default Notes