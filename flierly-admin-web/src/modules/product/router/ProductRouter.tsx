import UnderConstructionPage from '@/modules/core/pages/UnderConstructionPage'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'
import BrandsPage from '../pages/BrandsPage'
import ProductCategoriesPage from '../pages/ProductCategoriesPage'
import ProductSubcategoriesPage from '../pages/ProductSubcategoriesPage'
import TagsMetadataPage from '../pages/TagsMetadataPage'
import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import pr from '@/modules/auth/utils/get-permission-regex.util'
import ProductPricePage from '../pages/ProductPricePage'
import ProductLatestPricesViewPage from '../pages/ProductLatestPricesViewPage'

const ProductRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="" element={<ProtectedRoute element={<UnderConstructionPage />} requiredPermissionRegex={pr("product.*")} />} />
            <Route path="products" element={<ProtectedRoute element={<ProductsPage />} requiredPermissionRegex={pr("product.*")} />} />
            <Route path="brands" element={<ProtectedRoute element={<BrandsPage />} requiredPermissionRegex={pr("product.*")} />} />
            <Route path="categories" element={<ProtectedRoute element={<ProductCategoriesPage />} requiredPermissionRegex={pr("product.*")} />} />
            <Route path="sub-categories" element={<ProtectedRoute element={<ProductSubcategoriesPage />} requiredPermissionRegex={pr("product.*")} />} />
            <Route path="product-prices" element={<ProtectedRoute element={<ProductPricePage />} requiredPermissionRegex={pr("productPrice.*")} />} />
            <Route path="product-latest-prices" element={<ProtectedRoute element={<ProductLatestPricesViewPage />} requiredPermissionRegex={pr("productLatestPricesView")} />} />
            <Route path="tags-metadata" element={<ProtectedRoute element={<TagsMetadataPage />} requiredPermissionRegex={pr("product.*")} />} />
        </Routes>
    )
}

export default ProductRouter