import PageLoader from '@/modules/core/components/PageLoader'
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'

const UnderConstruction: LazyExoticComponent<ComponentType<any>> = React.lazy(() => import('@/modules/core/components/UnderConstruction'))

/**
 * PageUnderConstruction component to display an under construction page.
 */
const PageUnderConstruction: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <UnderConstruction />
    </Suspense>
  )
}

export default PageUnderConstruction
