
import './App.css'
import {Routes,BrowserRouter,Route} from 'react-router-dom'
import Welcome from './Welcome'
import Login from './Login'
import Signup from './Singnup'
import Policies from './Policies'
import Notes from './Notes'
import Calendar from './Calendar'
import NavBar from './NavBar'
import ProtectedRoute from './ProtectedRoute'
import EditProfile from './EditProfile'
import ResetPassword from './ResetPassword'
import OtpCode from './OtpCode'
import Notfound from './Notfound'
import ChangePassword from './changePassword'
function App() {
  

  return (
    <>


<div className="flex flex-col items-center w-7xl">
    <BrowserRouter>

    
   
   
  
    
   
     <Routes>

      <Route path='/' element={<Welcome/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/resetPassword' element={<ResetPassword/>}/>
      <Route path="/otpCode/:email" element={<OtpCode/>}/>
      <Route path="/changePassword/:email" element={<ChangePassword/>}/>


      {/* protected routes */}

      <Route path='/policies' element={<ProtectedRoute><Policies/></ProtectedRoute>}/>
      <Route path='/Notes' element={<ProtectedRoute><Notes/></ProtectedRoute>}/>
      <Route path='/Calendar' element={<ProtectedRoute><Calendar/></ProtectedRoute>}/>
      <Route path='/EditProfile/:id' element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>

      

      <Route path='*' element={<Notfound/>}/>
     </Routes>
    
    </BrowserRouter></div>
     
    </>
  )
}

export default App
