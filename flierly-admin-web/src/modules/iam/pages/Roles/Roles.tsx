import CrudModule from '@/features/CrudModule'
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import roleTableColumns from '../../config/role/tableColumns'
import PageLoader from '@/components/PageLoader'
import { CrudTableProps } from '@/features/CrudTable/CrudTable'
import roleCreateFields from '../../config/role/createFormFields'
import roleUpdateFields from '../../config/role/updateFormFields'
import roleQueryFields from '../../config/role/queryFormFields'

// Lazy load CrudTable
const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Role>>> = React.lazy(() => import('@/features/CrudTable'))

const Roles: React.FC = () => {
  return (
    <CrudModule header title={'roles'} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="role"
          columns={roleTableColumns}
          dataSource={[]}
          tableKey="role-table"
          rowKey="id"
          render={{
            activate: true,
            bin: true,
            clear: true,
            create: true,
            delete: true,
            menu: true,
            restore: true,
            search: true,
            update: true,
            view: true,
            builtIn: {
              options: {
                density: true,
                fullScreen: true,
                reload: true,
                search: false,
                setting: true,
              },
            },
          }}
          createFormFields={roleCreateFields}
          updateFormFields={roleUpdateFields}
          queryFormFields={roleQueryFields}
        />
      </Suspense>
    </CrudModule>
  )
}

export default Roles
