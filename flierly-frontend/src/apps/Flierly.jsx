import React, { Suspense } from 'react'
import ErpApp from './ErpApp';
import PageLoader from '@/components/PageLoader';
import AntdConfigProvider from '@/locale/AntdConfigProvider';

const DefaultApp = () => {
  return (
    <AntdConfigProvider>
      <Suspense fallback={<PageLoader />}>
        <ErpApp />
      </Suspense>
    </AntdConfigProvider>
  )
};

function Flierly() {

  return <DefaultApp />;

  return (
    <div>FlierlyApp</div>
  )
};

export default Flierly