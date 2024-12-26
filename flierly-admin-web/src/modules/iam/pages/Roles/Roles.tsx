import CrudModule from '@/features/CrudModule'
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createRoleTableColumns from '../../config/role/create-role-table-columns'
import PageLoader from '@/components/PageLoader'
import { CrudTableProps } from '@/features/CrudTable/CrudTable'
import roleCreateFormFields from '../../config/role/role-create-form-fields'
import roleUpdateFormFields from '../../config/role/role-update-form-fields'
import roleQueryFormFields from '../../config/role/role-query-form-fields'
import useLocale from '@/features/Locale/hooks/useLocale'

// Lazy load CrudTable
const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Role>>> = React.lazy(() => import('@/features/CrudTable'))

const Roles: React.FC = () => {
  const { translate } = useLocale();

  return (
    <CrudModule header title={'roles'} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="role"
          columns={createRoleTableColumns(translate)}
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
          createFormFields={roleCreateFormFields}
          updateFormFields={roleUpdateFormFields}
          queryFormFields={roleQueryFormFields}
        />
      </Suspense>
    </CrudModule>
  )
}

export default Roles
