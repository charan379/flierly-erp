import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import Dashboard from '@/modules/core/layouts/Dashboard'
import LoginPage from '@/modules/auth/pages/LoginPage'
import SignUp from '@/modules/auth/pages/SignUpPage'
import IamRoutes from '@/modules/iam/router/IamRoutes'
import ProductRouter from '@/modules/product/router/ProductRouter'
import UnderConstructionPage from '@/modules/core/pages/UnderConstructionPage'
import { Route, Routes } from 'react-router-dom'
import AppsPage from '@/modules/core/pages/AppsPage'
import InventoryRouter from '@/modules/inventory/router/InventoryRouter'
import NotFoundPage from '@/modules/core/pages/NotFoundPage'
import OrganizationRouter from '@/modules/organization/router/OrganizationRouter'
import UomRouter from '@/modules/uom/router/UomRouter'

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
      {/* Login and Register routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUp />} />

      {/* Catch-all for 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter
