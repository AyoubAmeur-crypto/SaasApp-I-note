import React, { useState, useEffect } from 'react'
import { FaClock, FaCalendarAlt, FaEdit, FaTrashAlt, FaGripVertical, FaCheckCircle, FaFeatherAlt } from 'react-icons/fa'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import axios from 'axios'
import './App.css'

function SortableItem({ id, children, handleDelete, handleEdit, note, handleDone }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging 
      ? 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1), opacity 0.2s ease' 
      : 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
    opacity: isDragging ? 0.3 : 1,
  }

  // Add local state to track this specific note's done status
  const [isDone, setIsDone] = useState(note.done);
  
  // Sync local state with prop when it changes
  useEffect(() => {
    setIsDone(note.done);
  }, [note.done]);
  
  // Handle done/undone button click
  const handleDoneClick = (e) => {
    e.stopPropagation();
    // Set optimistic update locally
    setIsDone(!isDone);
    // Call parent handler
    handleDone(note._id);
  };
  
  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className="relative group min-h-[220px] w-full dragging-transition"
    >
      <div 
        className={`backdrop-blur-lg rounded-xl overflow-hidden h-full flex flex-col shadow-lg transition-all duration-300 
          ${isDone 
            ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-green-500/20' 
            : 'bg-gradient-to-br from-primary-second/90 to-slate-900/90 border border-primary-yello/10 hover:shadow-primary-yello/20 hover:-translate-y-1'} 
          relative z-10`}
      >  
        {/* Premium Glass effect with shimmer */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-[200%] opacity-20 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
        </div>
        
        {/* Accent top line with glow effect */}
        <div className={`h-1 w-full ${isDone 
          ? 'bg-gradient-to-r from-green-400 to-green-600' 
          : 'bg-gradient-to-r from-primary-yello to-amber-600'}`}>
        </div>
        
        {/* Premium corner accents */}
        <div className={`absolute top-0 right-0 w-16 h-16 ${isDone 
          ? 'bg-green-500/5' 
          : 'bg-primary-yello/5'} rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-6 group-hover:-translate-y-6 transition-all duration-700`}>
        </div>
        <div className={`absolute bottom-0 left-0 w-16 h-16 ${isDone 
          ? 'bg-green-500/5' 
          : 'bg-primary-yello/5'} rounded-tr-full transform -translate-x-8 translate-y-8 group-hover:-translate-x-6 group-hover:translate-y-6 transition-all duration-700`}>
        </div>
        
        {/* Card content with better spacing and premium backdrop */}
        <div className="flex-1 p-5 relative z-10">
          {children}
        </div>
        
        {/* Bottom action bar with premium glass effect */}
        <div className="px-5 py-3 border-t border-gray-700/30 bg-black/20 backdrop-blur-lg flex justify-between items-center">
          {/* Left side - Premium drag handle with glow effect */}
          <div 
            className={`cursor-grab active:cursor-grabbing p-1.5 rounded-md transition-all ${isDone 
              ? 'hover:bg-green-500/20 hover:text-green-400' 
              : 'hover:bg-primary-yello/20 hover:text-primary-yello'}`} 
            {...attributes} 
            {...listeners}
          >
            <FaGripVertical className={`${isDone ? 'text-green-400' : 'text-primary-yello'} transition-colors`} />
          </div>
          
          {/* Right side - Premium action buttons with glow effects */}
          <div className="flex items-center gap-3">
            <button 
              className={`p-1.5 rounded-md transition-all z-10 ${isDone 
                ? 'hover:bg-green-500/20 text-slate-400 hover:text-green-400' 
                : 'hover:bg-primary-yello/20 text-slate-300 hover:text-primary-yello'}`}
              onClick={(e) => {
                e.stopPropagation()
                handleEdit(note._id)
              }}
              title="Edit Note"
            >
              <FaEdit />
            </button>
            
            <button 
              className="p-1.5 hover:bg-red-500/20 rounded-md transition-all text-slate-400 hover:text-red-400 z-10"
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(note._id)
              }}
              title="Delete Note"
            >
              <FaTrashAlt />
            </button>
                     <button 
  onClick={handleDoneClick}
  className={`p-1.5 rounded-md transition-all z-10 ${isDone 
    ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
    : 'bg-primary-yello/10 text-primary-yello hover:bg-primary-yello/20'}`}
  title={isDone ? "Mark as Incomplete" : "Mark as Complete"}
>
  {isDone ? (
    <svg viewBox="0 0 64 64" height="1.2em" width="1.2em" className="filter drop-shadow-md">
      <path 
        d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" 
        pathLength="575.0541381835938" 
        className="path completed"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
      ></path>
    </svg>
  ) : (
    <svg viewBox="0 0 64 64" height="1.2em" width="1.2em" className="filter drop-shadow-md">
      <rect 
        x="8" 
        y="8" 
        width="48" 
        height="48" 
        rx="8" 
        ry="8"
        fill="none"
        stroke="#FFD700"
        strokeWidth="4"
      />
      <path 
        d="M 16 32 L 28 44 L 48 20"
        fill="none"
        stroke="#FFD700"
        strokeWidth="4"
        strokeOpacity="0.3"
        strokeDasharray="80"
        strokeDashoffset="80"
      />
    </svg>
  )}
</button>
          </div>
        </div>
        
        {/* Premium status indicator for completed notes */}
        {isDone && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500/30 to-green-600/30 backdrop-blur-md text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/40 z-20 shadow-sm shadow-green-500/20">
            <span className="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Completed
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

function DragOverlayContent({ note }) {
  return (
    <div className="bg-primary-second/90 backdrop-blur-lg rounded-xl shadow-2xl border border-primary-yello/20 p-4 h-full min-h-[220px] w-full transform scale-105">
      {/* Enhanced placeholder structure */}
      <div className="mb-4 pl-4 border-l-2 border-primary-yello/50">
        <div className="h-6 bg-slate-700/60 rounded w-3/4 animate-pulse"></div>
      </div>
      <div className="space-y-2 mb-5">
        <div className="h-4 bg-slate-700/60 rounded w-full animate-pulse"></div>
        <div className="h-4 bg-slate-700/60 rounded w-11/12 animate-pulse"></div>
        <div className="h-4 bg-slate-700/60 rounded w-4/5 animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary-yello/50"></div>
          <div className="h-3 bg-slate-700/60 rounded w-1/2 animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary-yello/50"></div>
          <div className="h-3 bg-slate-700/60 rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
      
      {/* Premium visual enhancements */}
      <div className="absolute bottom-3 right-3 bg-primary-yello/10 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-primary-yello/50 rounded-sm"></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
    </div>
  )
}

function NoteContent({ note, formatDate }) {
  return (
    <>
      <div className="mb-3 pl-4 border-l-2 border-l-primary-yello/50">
        <h3 className={`text-white text-xl font-semibold mb-1 ${note.done ? 'text-opacity-70' : ''}`}>
          {note.name}
        </h3>
      </div>
      <p className={`text-gray-300 text-sm mb-4 px-2 line-clamp-4 ${note.done ? 'text-opacity-60' : ''}`}>
        {note.description}
      </p>
      <div className="flex flex-col gap-1.5 text-xs text-gray-400 px-2 mt-auto">
        <div className="flex items-center gap-2 p-1.5 rounded-md bg-black/20 backdrop-blur-sm">
          <FaCalendarAlt className={`${note.done ? 'text-green-400' : 'text-primary-yello'}`} />
          <span>Start: {formatDate(note.startDate)}</span>
        </div>
        <div className="flex items-center gap-2 p-1.5 rounded-md bg-black/20 backdrop-blur-sm">
          <FaClock className={`${note.done ? 'text-green-400' : 'text-primary-yello'}`} />
          <span>Due: {formatDate(note.estimatedDate)}</span>
        </div>
      </div>
    </>
  )
}

function PersonalNotes({ refreshNote, setRefreshNote }) {
  const [noteData, setNoteData] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [modalUpdate, setModalUpdate] = useState({ modal: false, id: null })
  const [notification, setNotification] = useState({ show: false, message: '', isClosing: false })
  const [NoteError, setNoteError] = useState(null)
  const [oldData, setOldData] = useState({ title: null, description: null, startDate: null, estimatedDate: null })
  const [data, setData] = useState({ title: null, description: null, startDate: null, endDate: null })
  const [items, setItems] = useState([])
  const [activeId, setActiveId] = useState(null)

  const handleNoteDone = async (id) => {
    try {
      const token = localStorage.getItem("userData");
      
      // Log which note is being updated
      console.log("Toggling done status for note ID:", id);
      
      // Make API request
      const response = await axios.put(`http://localhost:3000/doneNote/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update BOTH items and noteData to keep them in sync
      const updatedNotes = items.map(note => 
        note._id === id ? { ...note, done: !note.done } : note
      );
      
      setItems(updatedNotes);
      setNoteData(updatedNotes);
      
      // Add a notification for confirmation
      setNotification({
        show: true,
        message: 'Note status updated successfully',
        isClosing: false
      });
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isClosing: true }));
      }, 3700);
      
      setTimeout(() => {
        setNotification({ show: false, message: '', isClosing: false });
      }, 4000);
      
    } catch (error) {
      console.error("Error updating note status:", error);
      setNotification({
        show: true,
        message: 'Error updating note status',
        isClosing: false
      });
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (noteData) {
      // Create a map of existing items by ID
      const existingItemsMap = items.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
      }, {});
      
      // Map through noteData, preserving existing item properties where possible
      const updatedItems = noteData.map(note => {
        const existingItem = existingItemsMap[note._id];
        // Preserve drag state but use the latest done status from the server
        if (existingItem) {
          return {
            ...note,
            // Keep any DnD-related properties here if needed
          };
        }
        return note;
      });
      
      setItems(updatedItems);
    }
  }, [noteData])

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    // Check if over is null before trying to access its id
    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        // Find the actual note objects
        const activeNote = currentItems.find(item => item._id === active.id);
        const overNote = currentItems.find(item => item._id === over.id);
        
        if (!activeNote || !overNote) return currentItems;
        
        const oldIndex = currentItems.findIndex(item => item._id === active.id);
        const newIndex = currentItems.findIndex(item => item._id === over.id);
        
        // Only proceed if both indices are valid
        if (oldIndex !== -1 && newIndex !== -1) {
          // Use arrayMove to reorder, but ensure done status is preserved
          const reorderedItems = arrayMove(currentItems, oldIndex, newIndex);
          
          // IMPORTANT: Set both items and noteData to keep them in sync
          setNoteData(reorderedItems);
          return reorderedItems;
        }
        
        // Return unchanged items if indices are invalid
        return currentItems;
      });
    }
    
    setActiveId(null);
  };

  const token = localStorage.getItem("userData")

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }

  const openUpdateConfirmation = (id) => {
    setModalUpdate({ id: id, modal: true })
  }

  const HandleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:3000/UpdateNote/${modalUpdate.id}`, {
        title: data.title !== null ? data.title : oldData.title,
        description: data.description !== null ? data.description : oldData.description,
        startDate: data.startDate !== null ? data.startDate : oldData.startDate,
        endDate: data.endDate !== null ? data.endDate : oldData.estimatedDate
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setRefreshNote(prev => prev + 1)
      setModalUpdate(prev => ({ ...prev, modal: false }))
      setOldData({ title: null, description: null, startDate: null, estimatedDate: null })
      setData({ title: null, description: null, startDate: null, endDate: null })
      
      setNotification({ 
        show: true, 
        message: 'Note Updated successfully',
        isClosing: false 
      })
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isClosing: true }))
      }, 3700)
      
      setTimeout(() => {
        setNotification({ show: false, message: '', isClosing: false })
      }, 4000)

    } catch (error) {
      if (error.response && error.response.data) {
        setNoteError(error.response.data)
        setNotification({ 
          show: true, 
          message: error.response.data,
          isClosing: false 
        })
        setTimeout(() => {
          setNotification(prev => ({ ...prev, isClosing: true }))
        }, 3700)
        setTimeout(() => {
          setNotification({ show: false, message: '', isClosing: false })
        }, 4000)
      }
    }
  }

  const openDeleteConfirmation = (id) => {
    setDeleteId(id)
    setDeleteModal(true)
  }

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteItem/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      setRefreshNote(prev => prev - 1)
      setDeleteModal(false)
      
      setNotification({ 
        show: true, 
        message: 'Note deleted successfully',
        isClosing: false 
      })
      
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isClosing: true }))
      }, 3700)
      
      setTimeout(() => {
        setNotification({ show: false, message: '', isClosing: false })
      }, 4000)

    } catch (error) {
      setNotification({ 
        show: true, 
        message: 'Error deleting note',
        isClosing: false 
      })
      setTimeout(() => {
        setNotification(prev => ({ ...prev, isClosing: true }))
      }, 3700)
      setTimeout(() => {
        setNotification({ show: false, message: '', isClosing: false })
      }, 4000)
    }
  }

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axios.get("http://localhost:3000/getNotes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setNoteData(res.data)
      } catch (error) {
        console.error("Error fetching notes:", error)
      }
    }
    fetchNote()
  }, [token, refreshNote])

  return (
    <div className='flex flex-col w-full lg:w-[1080px] md:w-[720px] sm:w-[380px] items-center mt-[30px]'>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full">
            {items.map((note) => (
              <SortableItem
                key={note._id}
                id={note._id}
                note={note}
                handleDelete={openDeleteConfirmation}
                handleDone={handleNoteDone}
                handleEdit={(id) => {
                  const selectedNote = items.find((n) => n._id === id)
                  setOldData({
                    title: selectedNote.name,
                    description: selectedNote.description,
                    startDate: selectedNote.startDate,
                    estimatedDate: selectedNote.estimatedDate
                  })
                  openUpdateConfirmation(id)
                }}
              >
                <NoteContent note={note} formatDate={formatDate} />
              </SortableItem>
            ))}
          </div>
        </SortableContext>

        <DragOverlay adjustScale={false}>
          {activeId ? (
            <DragOverlayContent 
              note={items.find(note => note._id === activeId)} 
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Premium Update Modal */}
      {modalUpdate.modal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 flex items-center justify-center animate-fadeIn">
          <div className="bg-gradient-to-br from-primary-second/90 to-slate-900/90 backdrop-blur-xl w-[90%] max-w-md rounded-xl p-6 border border-primary-yello/20 shadow-2xl shadow-black/40 animate-popIn relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-yello to-transparent"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary-yello/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-primary-yello/10 rounded-tr-full"></div>
            
            {/* Glass sheen effect */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
            </div>
            
            <div className="flex justify-between items-center border-b border-gray-700/50 pb-3 mb-5 relative z-10">
              <h2 className="text-white text-xl font-bold flex items-center gap-2">
                <FaEdit className="text-primary-yello" />
                Update Note
              </h2>
              <button 
                className="text-primary-yello hover:text-white transition-all transform hover:rotate-90 duration-300 w-8 h-8 rounded-full hover:bg-red-500/20 flex items-center justify-center"
                onClick={() => setModalUpdate(prev => ({ ...prev, modal: false }))}
              >
                ✕
              </button>
            </div>
            
            <form className="flex flex-col gap-5 relative z-10" onSubmit={HandleUpdate}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Note Title"
                  defaultValue={oldData.title}
                  className="p-3 pl-10 bg-primary-main/80 text-white rounded-lg w-full border-l-4 border-primary-yello focus:outline-none focus:ring-2 focus:ring-primary-yello/50 transition-all duration-300"
                  onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                />
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
              </div>
              
              <div className="relative group">
                <textarea
                  placeholder="Note Description"
                  defaultValue={oldData.description}
                  onChange={(e) => setData(prev => ({ ...prev, description: e.target.value }))}
                  className="p-3 bg-primary-main/80 text-white rounded-lg w-full h-[180px] resize-none border-l-4 border-primary-yello focus:outline-none focus:ring-2 focus:ring-primary-yello/50 transition-all duration-300"
                ></textarea>
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="relative w-full group">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-yello/70">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    type="date"
                    defaultValue={formatDateForInput(oldData.startDate)}
                    onChange={(e) => setData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="p-3 pl-10 bg-primary-main/80 text-white rounded-lg w-full border-l-4 border-primary-yello focus:outline-none focus:ring-2 focus:ring-primary-yello/50 appearance-none transition-all duration-300"
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
                    defaultValue={formatDateForInput(oldData.estimatedDate)}
                    onChange={(e) => setData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="p-3 pl-10 bg-primary-main/80 text-white rounded-lg w-full border-l-4 border-primary-yello focus:outline-none focus:ring-2 focus:ring-primary-yello/50 appearance-none transition-all duration-300"
                  />
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-primary-yello/5 to-transparent border border-primary-yello/10"></div>
                  <label className="absolute -top-2 left-10 bg-primary-second px-2 text-xs text-primary-yello font-medium">Due Date</label>
                </div>
              </div>
              
              <button 
                type="submit"
                className="bg-gradient-to-r from-primary-yello to-amber-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-primary-yello/20 transition-all transform hover:-translate-y-1 relative overflow-hidden group mt-4"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Update Note
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-amber-500 to-primary-yello opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Premium Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-gradient-to-br from-primary-second/90 to-slate-900/90 backdrop-blur-xl w-[90%] max-w-sm rounded-xl p-6 border border-primary-yello/20 shadow-2xl shadow-black/40 animate-popIn relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-red-500/5 rounded-tr-full"></div>
            
            {/* Glass sheen effect */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              <div className="absolute -inset-[200%] opacity-30 bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-45deg] animate-glass-sheen"></div>
            </div>
            
            <div className="flex items-center gap-3 border-b border-gray-700/50 pb-4 mb-5 relative z-10">
              <div className="p-2 bg-red-500/20 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold">Delete Note</h2>
            </div>
            
            <div className="relative z-10">
              <p className="text-gray-300 text-sm mb-6 p-4 bg-black/20 rounded-lg border-l-4 border-red-500/50">
                Are you sure you want to delete this note? This action cannot be undone.
              </p>
              
              <div className="flex justify-end gap-3">
                <button 
                  className="px-4 py-2.5 bg-gray-700/50 backdrop-blur-sm text-white rounded-lg hover:bg-gray-600 transition-all transform hover:-translate-y-1 border border-gray-600/30"
                  onClick={() => setDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg hover:shadow-lg hover:shadow-red-500/20 transition-all transform hover:-translate-y-1 relative overflow-hidden group"
                  onClick={() => removeItem(deleteId)}
                >
                  <span className="relative z-10 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Notification */}
      {notification.show && (
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

      {/* Add CSS for premium animations */}
      <style jsx>{`
        @keyframes glass-sheen {
          0% { transform: translateX(-100%) skewX(-45deg); }
          100% { transform: translateX(200%) skewX(-45deg); }
        }
        
        @keyframes progress {
          0% { width: 100%; }
          100% { width: 0%; }
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
        
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideDown {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        
        .animate-glass-sheen {
          animation: glass-sheen 8s ease-in-out infinite;
        }
        
        .animate-progress {
          animation: progress 4s linear forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-popIn {
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.5s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-in forwards;
        }
        
        /* Checkbox animation */
        .path {
          stroke: currentColor;
          fill: none;
          stroke-dasharray: 575.0541381835938;
          stroke-dashoffset: 575.0541381835938;
          transition: stroke-dashoffset 0.5s ease-in-out;
        }
        
        .path.completed {
          stroke-dashoffset: 0;
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

export default PersonalNotes