import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import Dashboard from '@/modules/core/layouts/Dashboard'
import IamRoutes from '@/modules/iam/router/IamRoutes'
import ProductRouter from '@/modules/product/router/ProductRouter'
import UnderConstructionPage from '@/modules/core/pages/UnderConstructionPage'
import { Route, Routes } from 'react-router-dom'
import AppsPage from '@/modules/core/pages/AppsPage'
import InventoryRouter from '@/modules/inventory/router/InventoryRouter'
import NotFoundPage from '@/modules/core/pages/NotFoundPage'
import OrganizationRouter from '@/modules/organization/router/OrganizationRouter'
import UomRouter from '@/modules/uom/router/UomRouter'
import AuthRouter from '@/modules/auth/router/AuthRouter'
import AuthLayout from '@/modules/auth/layout/AuthLayout/AuthLayout'

const AppRouter = () => {
  return (
    <Routes>
      {/* Default route, page under construction */}
      <Route path="/" element={<AppsPage />} />

      <Route path="/erp" element={<ProtectedRoute element={<Dashboard />} />}>
        <Route path="" element={<UnderConstructionPage />} />
        <Route path="iam/*" element={<IamRoutes />} />
        <Route path="product/*" element={<ProductRouter />} />
        <Route path='inventory/*' element={<InventoryRouter />} />
        <Route path='organization/*' element={<OrganizationRouter />} />
        <Route path='uom/*' element={<UomRouter />} />
      </Route>
      {/* auth routes */}
      <Route path="auth/*" element={<AuthLayout />}>
        <Route path="*" element={<AuthRouter />} />
      </Route>
      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
