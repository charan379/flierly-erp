import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from '@/pages/PageNotFound'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

/**
 * AuthRouter component to define the routes for authentication-related pages.
 */
const AuthRouter: React.FC = () => {
  return (
    <Routes>
      {/* Route for the root path, rendering the Login component */}
      <Route path="/" element={<Login />} />
      {/* Route for the /login path, rendering the Login component */}
      <Route path="/login" element={<Login />} />
      {/* Route for the /logout path, redirecting to the /login path */}
      <Route path="/logout" element={<Navigate to="/login" replace />} />
      {/* Route for the /register path, rendering the SignUp component */}
      <Route path="/register" element={<SignUp />} />
      {/* Route for any undefined paths, rendering the PageNotFound component */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AuthRouter
