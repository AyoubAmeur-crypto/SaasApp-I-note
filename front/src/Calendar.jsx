import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import '@fullcalendar/core/index.cjs'
import '@fullcalendar/daygrid/index.cjs'
import '@fullcalendar/timegrid/index.cjs'
import '@fullcalendar/list/index.cjs'
import axios from 'axios'
import NavBar from './NavBar'
import Footer from './Footer'
import { FaCalendarAlt, FaChevronLeft, FaChevronRight, FaCheck, FaClock } from 'react-icons/fa'

const Calendar = () => {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem("userData")
  
  // Use empty dependency array to prevent infinite loop
  useEffect(() => {
    const getMynote = async () => {
      try {
        const mynotes = await axios.get("http://localhost:3000/getNotes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setNotes(mynotes.data)
      } catch (error) {
        console.error("Error fetching notes:", error)
      } finally {
        setLoading(false)
      }
    }
    getMynote()
  }, []) // Empty dependency array to run once
  
  const events = notes.map(note => ({
    id: note._id,
    title: note.name,
    date: note.startDate,
    color: note.done ? '#10B981' : '#EF4444', // Modern green and red
    borderColor: note.done ? '#059669' : '#DC2626',
    textColor: '#FFFFFF'
  }))

 

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-primary-main to-primary-second relative overflow-hidden'>
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-main to-primary-second opacity-90"></div>
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
        
        {/* Light beam */}
        <div className="absolute h-[200%] w-[1px] bg-gradient-to-b from-transparent via-primary-yello/10 to-transparent transform rotate-[15deg] left-1/4 top-[-50%] animate-light-beam"></div>
        <div className="absolute h-[200%] w-[1px] bg-gradient-to-b from-transparent via-primary-yello/5 to-transparent transform rotate-[-15deg] right-1/3 top-[-50%] animate-light-beam-delay"></div>
      </div>

    <div className="flex flex-col items-center w-7xl p-3 relative z-10">
      
        <NavBar />
        
        <div className="container mx-auto px-4 py-8">
          {/* Calendar Header */}
          <div className="bg-primary-second/30 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-2xl mb-8 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -inset-[200%] opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-yello/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-yello/40 to-transparent"></div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <div className="bg-primary-yello/20 p-2 rounded-lg">
                  <FaCalendarAlt className="text-primary-yello text-2xl" />
                </div>
                <span>Your Calendar</span>
                <div className="bg-primary-yello/10 text-primary-yello text-xs font-normal px-2 py-1 rounded-md ml-2">
                  Premium
                </div>
              </h2>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="flex items-center gap-2 bg-primary-main/40 px-3 py-2 rounded-lg border border-white/5">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-gray-300 text-sm">Completed</span>
                    </div>
                    <span className="text-gray-500">|</span>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                      <span className="text-gray-300 text-sm">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Calendar Container */}
          <div className="bg-primary-second/30 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -inset-[200%] opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-yello/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-yello/40 to-transparent"></div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-32">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-primary-yello/30 border-t-primary-yello rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FaClock className="text-primary-yello animate-pulse" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <FullCalendar
                 
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}initialView="dayGridMonth"headerToolbar={{start: 'title',center: '',end: 'today prev,next dayGridMonth,timeGridWeek,listWeek',}}titleFormat={{ year: 'numeric', month: 'long' }}buttonText={{
    today: 'Today',
    month: 'Month',
    week: 'Week',
    list: 'List'
  }}
  editable={false}         // Set to false to prevent dragging
  selectable={true}        // Allow date selection but not drag
  events={events}
  height="auto"
  eventTimeFormat={{
    hour: 'numeric',
    minute: '2-digit',
    meridiem: 'short'}}
                  dayMaxEvents={3}
                />
              </div>
            )}
          </div>
          <Footer/>
        </div>
      </div>
      
      {/* Custom CSS for Calendar styling */}
      <style jsx global>{`
        /* Calendar Container Styling */
        .fc {
          --fc-border-color: rgba(255, 255, 255, 0.1);
          --fc-neutral-bg-color: rgba(17, 49, 68, 0.3);
          --fc-page-bg-color: transparent;
          --fc-list-event-hover-bg-color: rgba(255, 215, 0, 0.1);
          --fc-today-bg-color: rgba(251, 203, 10, 0.1);
          --fc-event-border-color: transparent;
          --fc-now-indicator-color: #FBCB0A;
          color: #E5E7EB;
          font-family: inherit;
        }
        
        /* Header Styling */
        .fc .fc-toolbar-title {
          color: #FBCB0A;
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .fc .fc-button-primary {
          background-color: rgba(17, 49, 68, 0.7) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
          color: #E5E7EB !important;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          transition: all 0.3s ease;
        }
        
        .fc .fc-button-primary:hover {
          background-color: rgba(251, 203, 10, 0.2) !important;
          border-color: rgba(251, 203, 10, 0.5) !important;
        }
        
        .fc .fc-button-primary:disabled {
          background-color: rgba(17, 49, 68, 0.4) !important;
          color: rgba(229, 231, 235, 0.6) !important;
        }
        
        .fc .fc-button-primary:not(:disabled).fc-button-active,
        .fc .fc-button-primary:not(:disabled):active {
          background-color: rgba(251, 203, 10, 0.3) !important;
          border-color: rgba(251, 203, 10, 0.6) !important;
          color: #FBCB0A !important;
        }
        
        /* Day Headers */
        .fc .fc-col-header-cell-cushion {
          color: #FBCB0A;
          font-weight: 600;
          padding: 10px 4px;
        }
        
        /* Day Numbers */
        .fc .fc-daygrid-day-number {
          color: #E5E7EB;
          opacity: 0.8;
          padding: 8px;
          font-size: 0.9rem;
        }
        
        /* Day Cells */
        .fc .fc-daygrid-day {
          border-color: rgba(255, 255, 255, 0.05);
          background-color: rgba(17, 49, 68, 0.2);
          transition: background-color 0.3s ease;
        }
        
        .fc .fc-daygrid-day:hover {
          background-color: rgba(17, 49, 68, 0.4);
        }
        
        /* Today Cell */
        .fc .fc-day-today {
          background-color: rgba(251, 203, 10, 0.1) !important;
        }
        
        /* Events */
        .fc-event {
          border-radius: 4px;
          padding: 3px;
          font-size: 0.85rem;
          border-left: 3px solid;
          margin-bottom: 2px;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .fc-event:hover {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          z-index: 10;
        }
        
        /* Event Time */
        .fc-event-time {
          font-weight: bold;
        }
        
        /* More Events Link */
        .fc-daygrid-more-link {
          color: #FBCB0A;
          font-size: 0.85rem;
        }
        
        /* Week View */
        .fc-timegrid-slot {
          height: 2.5rem;
        }
        
        .fc-timegrid-axis {
          color: #FBCB0A;
        }
        
        /* List View */
        .fc-list-day-cushion {
          background-color: rgba(17, 49, 68, 0.5) !important;
        }
        
        .fc-list-event td {
          border-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        .fc-list-event-dot {
          display: none;
        }
        
        .fc-list-event-title::before {
          content: '•';
          margin-right: 8px;
          color: inherit;
          font-size: 1.2em;
        }
        
        /* Animation Keyframes */
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
        
        @keyframes glass-sheen {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(200%) skewX(-45deg); }
        }
        
        @keyframes light-beam {
          0% { opacity: 0; transform: translateY(0) rotate(15deg); }
          50% { opacity: 0.5; transform: translateY(-30px) rotate(15deg); }
          100% { opacity: 0; transform: translateY(-60px) rotate(15deg); }
        }
        
        @keyframes light-beam-delay {
          0% { opacity: 0; transform: translateY(0) rotate(-15deg); }
          50% { opacity: 0.3; transform: translateY(-30px) rotate(-15deg); }
          100% { opacity: 0; transform: translateY(-60px) rotate(-15deg); }
        }
        
        /* Animation Classes */
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 6s ease-in-out 3s infinite;
        }
        
        .animate-glass-sheen {
          animation: glass-sheen 8s ease-in-out infinite;
        }
        
        .animate-light-beam {
          animation: light-beam 10s ease-in-out infinite;
        }
        
        .animate-light-beam-delay {
          animation: light-beam-delay 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Calendar