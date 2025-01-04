import ProtectedRoute from '@/features/ProtectedRoute/ProtectedRoute'
import PageUnderConstruction from '@/pages/PageUnderConstruction'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Products from '../pages/Products'
import Brands from '../pages/Brands'
import ProductCategories from '../pages/ProductCategories'
import ProductSubcategories from '../pages/ProductSubcategories'
import TagsMetadata from '../pages/TagsMetadata'

const ProductRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<ProtectedRoute element={<PageUnderConstruction />} requiredPermissionRegex={/^product\.[a-z]+$/} />} />
            <Route path="products" element={<ProtectedRoute element={<Products />} requiredPermissionRegex={/^product\.[a-z]+$/} />} />
            <Route path="brands" element={<ProtectedRoute element={<Brands />} requiredPermissionRegex={/^brand\.[a-z]+$/} />} />
            <Route path="categories" element={<ProtectedRoute element={<ProductCategories />} requiredPermissionRegex={/^product-category\.[a-z]+$/} />} />
            <Route path="sub-categories" element={<ProtectedRoute element={<ProductSubcategories />} requiredPermissionRegex={/^product-sub-category\.[a-z]+$/} />} />
            <Route path="tags-metadata" element={<ProtectedRoute element={<TagsMetadata />} requiredPermissionRegex={/^tag-metadata\.[a-z]+$/} />} />
        </Routes>
    )
}

export default ProductRouter