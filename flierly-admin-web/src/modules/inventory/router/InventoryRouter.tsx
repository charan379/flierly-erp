import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import UnderConstructionPage from '@/modules/core/pages/UnderConstructionPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UomsPage from '../pages/UomsPage'
import { useAuth } from '@/modules/auth/hooks/useAuth'

const InventoryRouter: React.FC = () => {
    const { getPermissionRegex: pr } = useAuth();
    return (
        <Routes>
            <Route path="" element={<ProtectedRoute element={<UnderConstructionPage />} requiredPermissionRegex={pr("inventory.*")} />} />
            <Route path="uoms" element={<ProtectedRoute element={<UomsPage />} requiredPermissionRegex={pr('uom.*')} />} />
        </Routes>
    )
}

export default InventoryRouter