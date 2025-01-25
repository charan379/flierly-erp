import ProtectedRoute from '@/modules/core/features/ProtectedRoute/ProtectedRoute'
import Dashboard from '@/modules/core/layouts/Dashboard'
import Login from '@/modules/auth/pages/Login'
import SignUp from '@/modules/auth/pages/SignUp'
import IamRoutes from '@/modules/iam/router/IamRoutes'
import ProductRouter from '@/modules/product/router/ProductRouter'
import PageNotFound from '@/modules/core/pages/PageNotFound'
import PageUnderConstruction from '@/modules/core/pages/PageUnderConstruction'
import { Route, Routes } from 'react-router-dom'

const AppRouter = () => {
  return (
    <Routes>
      {/* Default route, page under construction */}
      <Route path="/" element={<PageUnderConstruction />} />

      <Route path="/erp" element={<ProtectedRoute element={<Dashboard />} />}>
        <Route path="" element={<PageUnderConstruction />} />
        <Route path="iam/*" element={<IamRoutes />} />
        <Route path="product/*" element={<ProductRouter />} />
      </Route>
      {/* Login and Register routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />

      {/* Catch-all for 404 */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default AppRouter
