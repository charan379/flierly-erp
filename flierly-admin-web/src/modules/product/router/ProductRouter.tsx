import ProtectedRoute from '@/features/ProtectedRoute/ProtectedRoute'
import PageUnderConstruction from '@/pages/PageUnderConstruction'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const ProductRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<ProtectedRoute element={<PageUnderConstruction />} requiredPermissionRegex={/^product\.[a-z]+$/} />} />
            <Route path="products" element={<ProtectedRoute element={<PageUnderConstruction />} requiredPermissionRegex={/^product\.[a-z]+$/} />} />
            <Route path="brands" element={<ProtectedRoute element={<PageUnderConstruction />} requiredPermissionRegex={/^brand\.[a-z]+$/} />} />
            <Route path="categories" element={<ProtectedRoute element={<PageUnderConstruction />} requiredPermissionRegex={/^product-category\.[a-z]+$/} />} />
            <Route path="sub-categories" element={<ProtectedRoute element={<PageUnderConstruction />} requiredPermissionRegex={/^product-sub-category\.[a-z]+$/} />} />
        </Routes>
    )
}

export default ProductRouter