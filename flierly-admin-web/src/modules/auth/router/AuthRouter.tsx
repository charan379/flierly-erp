import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import SignUp from '../pages/SignUpPage'
import NotFoundPage from '@/modules/core/pages/NotFoundPage'

/**
 * AuthRouter component to define the routes for authentication-related pages.
 */
const AuthRouter: React.FC = () => {
  return (
    <Routes>
      {/* Route for the root path, rendering the Login component */}
      <Route path="/" element={<LoginPage />} />
      {/* Route for the /login path, rendering the Login component */}
      <Route path="/login" element={<LoginPage />} />
      {/* Route for the /logout path, redirecting to the /login path */}
      <Route path="/logout" element={<Navigate to="/login" replace />} />
      {/* Route for the /register path, rendering the SignUp component */}
      <Route path="/register" element={<SignUp />} />
      {/* Route for any undefined paths, rendering the PageNotFound component */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AuthRouter
