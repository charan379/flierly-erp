import React, { Suspense } from 'react'
import ErpApp from './ErpApp';
import PageLoader from '@/components/PageLoader';

const DefaultApp = () => {
  return (

    <Suspense fallback={<PageLoader />}>
      <ErpApp />
    </Suspense>
  )
}

function Flierly() {

  return <DefaultApp />;

  return (
    <div>FlierlyApp</div>
  )
}

export default Flierly