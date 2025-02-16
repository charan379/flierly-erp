import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import UnderConstructionPage from '@/modules/core/pages/UnderConstructionPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UomsPage from '../pages/UomsPage'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import InventoriesPage from '../pages/InventoriesPage'

const InventoryRouter: React.FC = () => {
    const { getPermissionRegex: pr } = useAuth();
    return (
        <Routes>
            <Route path="" element={<ProtectedRoute element={<UnderConstructionPage />} requiredPermissionRegex={pr("inventory.*")} />} />
            <Route path="uoms" element={<ProtectedRoute element={<UomsPage />} requiredPermissionRegex={pr('uom.*')} />} />
            <Route path="inventories" element={<ProtectedRoute element={<InventoriesPage />} requiredPermissionRegex={pr('inventory.*')} />} />
        </Routes>
    )
}

export default InventoryRouter