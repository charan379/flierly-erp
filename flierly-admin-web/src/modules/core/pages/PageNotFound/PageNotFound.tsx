import PageLoader from '@/modules/core/components/PageLoader'
import React, { Suspense } from 'react'

const NotFound = React.lazy(() => import('@/modules/core/components/NotFound'))
/**
 * PageNotFound component to render the 404 error page.
 * This serves as a simple wrapper for the NotFound component.
 */
const PageNotFound: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <NotFound />
    </Suspense>
  ) // Rendering the NotFound component
}

export default PageNotFound
