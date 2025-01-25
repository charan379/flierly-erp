import PageUnderConstruction from '@/modules/core/pages/PageUnderConstruction'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Roles from '../pages/Roles'
import Privileges from '../pages/Privileges'
import Users from '../pages/Users'
import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'

const IamRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route */}
      <Route path="" element={<ProtectedRoute element={<PageUnderConstruction />} requiredPermissionRegex={/^user\.[a-z]+$/} />} />

      {/* Users route */}
      <Route path="users" element={<ProtectedRoute element={<Users />} requiredPermissionRegex={/^user\.[a-z]+$/} />} />

      {/* Roles route */}
      <Route path="roles" element={<ProtectedRoute element={<Roles />} requiredPermissionRegex={/^role\.[a-z]+$/} />} />

      {/* Privileges route */}
      <Route path="privileges" element={<ProtectedRoute element={<Privileges />} requiredPermissionRegex={/^privilege\.[a-z]+$/} />} />
    </Routes>
  )
}

export default IamRoutes
