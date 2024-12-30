import CrudModule from '@/features/CrudModule'
import React, { ComponentType, LazyExoticComponent, Suspense } from 'react'
import createRoleTableColumns from '../../config/role/create-role-tablecolumns'
import PageLoader from '@/components/PageLoader'
import { CrudTableProps } from '@/features/CrudTable/CrudTable'
import createRoleAddFormFields from '../../config/role/create-role-add-formfields'
import createRoleQueryFields from '../../config/role/create-role-queryfields'
import useLocale from '@/features/Locale/hooks/useLocale'
import { useAuth } from '@/modules/auth/hooks/useAuth'
import createRoleEditFormFields from '../../config/role/create-role-edit-formfields'

// Lazy load CrudTable
const CrudTable: LazyExoticComponent<ComponentType<CrudTableProps<Role>>> = React.lazy(() => import('@/features/CrudTable'))

const Roles: React.FC = () => {
  const { translate } = useLocale();
  const { hasPermission } = useAuth();

  return (
    <CrudModule header title={'roles'} menuKeys={['iam']}>
      <Suspense fallback={<PageLoader />}>
        <CrudTable
          entity="role"
          columns={createRoleTableColumns(translate, hasPermission)}
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
          createFormFields={createRoleAddFormFields()}
          updateFormFields={createRoleEditFormFields()}
          queryFormFields={createRoleQueryFields(translate)}
        />
      </Suspense>
    </CrudModule>
  )
}

export default Roles
