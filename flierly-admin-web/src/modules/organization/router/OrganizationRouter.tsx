import UnderConstructionPage from '@/modules/core/pages/UnderConstructionPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import pr from '@/modules/auth/utils/get-permission-regex.util'
import BranchesPage from '../pages/BranchesPage'

const OrganizationRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<ProtectedRoute element={<UnderConstructionPage />} requiredPermissionRegex={pr("*")} />} />
            <Route path="branches" element={<ProtectedRoute element={<BranchesPage />} requiredPermissionRegex={pr("branch.*")} />} />
        </Routes>
    )
}

export default OrganizationRouter