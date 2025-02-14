import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import PageUnderConstruction from '@/modules/core/pages/PageUnderConstruction'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Uoms from '../pages/Uoms'

const InventoryRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<ProtectedRoute element={<PageUnderConstruction />} requiredPermissionRegex={/^inventory\.[a-z]+$/} />} />
            <Route path="uoms" element={<ProtectedRoute element={<Uoms />} requiredPermissionRegex={/^uom\.[a-z]+$/} />} />
        </Routes>
    )
}

export default InventoryRouter