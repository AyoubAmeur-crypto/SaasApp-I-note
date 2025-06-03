import React from 'react'

import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
 
function ProtectedRoute({children}) {

    const token = localStorage.getItem('userData')

    if(!token){

        return <Navigate to='/login'/>
    }

     try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    if (isExpired) {
      localStorage.removeItem("userData");
      return <Navigate to="/login"  />;
    }

    return children;
  } catch (err) {
    // Invalid token
    localStorage.removeItem("userData");
    return <Navigate to="/login"  />;
  }
  
}

export default ProtectedRoute