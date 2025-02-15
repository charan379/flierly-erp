import UnderConstructionPage from '@/modules/core/pages/UnderConstructionPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'
import BrandsPage from '../pages/BrandsPage'
import ProductCategoriesPage from '../pages/ProductCategoriesPage'
import ProductSubcategoriesPage from '../pages/ProductSubcategoriesPage'
import TagsMetadataPage from '../pages/TagsMetadataPage'
import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'

const ProductRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<ProtectedRoute element={<UnderConstructionPage />} requiredPermissionRegex={/^product\.[a-z]+$/} />} />
            <Route path="products" element={<ProtectedRoute element={<ProductsPage />} requiredPermissionRegex={/^product\.[a-z]+$/} />} />
            <Route path="brands" element={<ProtectedRoute element={<BrandsPage />} requiredPermissionRegex={/^brand\.[a-z]+$/} />} />
            <Route path="categories" element={<ProtectedRoute element={<ProductCategoriesPage />} requiredPermissionRegex={/^product-category\.[a-z]+$/} />} />
            <Route path="sub-categories" element={<ProtectedRoute element={<ProductSubcategoriesPage />} requiredPermissionRegex={/^product-sub-category\.[a-z]+$/} />} />
            <Route path="tags-metadata" element={<ProtectedRoute element={<TagsMetadataPage />} requiredPermissionRegex={/^tag-metadata\.[a-z]+$/} />} />
        </Routes>
    )
}

export default ProductRouter