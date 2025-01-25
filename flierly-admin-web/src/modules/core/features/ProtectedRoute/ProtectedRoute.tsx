import UnAuthorized from '@/modules/core/components/UnAuthorized'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  element: JSX.Element
  requiredPermissionRegex?: RegExp
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, requiredPermissionRegex }) => {
  const { isLoggedIn, hasPermission, isTokenExpiryDatePast } = useAuth()
  const location = useLocation()

  const callback = {
    pathname: location.pathname,
    search: location.search,
  }

  // If the user is not logged in, redirect to login page
  if (!isLoggedIn || isTokenExpiryDatePast) {
    return <Navigate to={`/login?callback=${encodeURIComponent(JSON.stringify(callback))}`} replace />
  }

  // Check for required permissions
  if (requiredPermissionRegex && !hasPermission(requiredPermissionRegex)) {
    return <UnAuthorized />
  }

  // If everything is fine, render the protected content
  return element
}

export default ProtectedRoute
