import UnderConstructionPage from '@/modules/core/pages/UnderConstructionPage'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RolesPage from '../pages/RolesPage'
import PrivilegesPage from '../pages/PrivilegesPage'
import UsersPage from '../pages/UsersPage'
import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import { useAuth } from '@/modules/auth/hooks/useAuth'

const IamRoutes: React.FC = () => {

  const { getPermissionRegex: pr } = useAuth()
  return (
    <Routes>
      {/* Default route */}
      <Route path="" element={<ProtectedRoute element={<UnderConstructionPage />} requiredPermissionRegex={pr("iam")} />} />

      {/* Users route */}
      <Route path="users" element={<ProtectedRoute element={<UsersPage />} requiredPermissionRegex={pr("user.*")} />} />

      {/* Roles route */}
      <Route path="roles" element={<ProtectedRoute element={<RolesPage />} requiredPermissionRegex={pr("role.*")} />} />

      {/* Privileges route */}
      <Route path="privileges" element={<ProtectedRoute element={<PrivilegesPage />} requiredPermissionRegex={pr("privilege.*")} />} />
    </Routes>
  )
}

export default IamRoutes
